import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

if (!process.env.API_KEY) {
    console.error("CRITICAL: API_KEY environment variable not set on the server.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export default async function handler(req: Request): Promise<Response> {
    if (!process.env.API_KEY) {
        return new Response(JSON.stringify({ error: 'Server configuration error: API key not set.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405, headers: { 'Content-Type': 'application/json', 'Allow': 'POST' } });
    }

    try {
        const body = await req.json();
        
        // --- Enhanced Input Validation ---
        const { items, preferences } = body;

        if (!Array.isArray(items) || items.length === 0) {
            return new Response(JSON.stringify({ error: 'Invalid or empty items list.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }
        for (const item of items) {
            if (typeof item?.name !== 'string' || item.name.length === 0 || item.name.length > 100) {
                return new Response(JSON.stringify({ error: 'Invalid item format.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
            }
        }
        if (!preferences || typeof preferences.occasion !== 'string' || typeof preferences.style !== 'string' || typeof preferences.colorPalette !== 'string') {
             return new Response(JSON.stringify({ error: 'Missing or invalid preference parameters.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }
        if(preferences.occasion.length > 50 || preferences.style.length > 50 || preferences.colorPalette.length > 50) {
            return new Response(JSON.stringify({ error: 'Preference text is too long.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }
        // --- End Validation ---

        const itemNames = items.map((item: {name: string}) => item.name).join(', ');

        const prompt = `Act as a fashion stylist. Based on the following clothing items I already own (${itemNames}), and my preferences (Occasion: ${preferences.occasion}, Style: ${preferences.style}, Color Palette: ${preferences.colorPalette}), suggest a complete outfit for me. Describe the full outfit, suggest other items to pair with what I have, and explain why your suggestion works. Keep the response concise and well-formatted, using markdown for structure (like headings and bullet points).`;
        
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: {
                thinkingConfig: {
                    thinkingBudget: 32768,
                }
            }
        });

        const suggestion = response.text;
        
        if (!suggestion) {
            const blockReason = response.promptFeedback?.blockReason;
            const errorMessage = blockReason 
                ? `Request blocked for safety reasons (${blockReason}).`
                : "Could not generate an outfit suggestion. The model returned no response.";
            return new Response(JSON.stringify({ error: errorMessage }), { status: 500, headers: { 'Content-Type': 'application/json' } });
        }
        
        return new Response(JSON.stringify({ suggestion }), { status: 200, headers: { 'Content-Type': 'application/json' } });

    } catch (error) {
        console.error("Error in generate-outfit endpoint:", error);
        // Return a generic error to the client
        return new Response(JSON.stringify({ error: "An unexpected server error occurred. Please try again later." }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
