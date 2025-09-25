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
        const { items, preferences } = await req.json();

        if (!items || !preferences || !preferences.occasion || !preferences.style || !preferences.colorPalette) {
             return new Response(JSON.stringify({ error: 'Missing required parameters.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }
        
        const itemNames = items.map((item: {name: string}) => item.name).join(', ');

        const prompt = `Act as a fashion stylist. Based on the following clothing items I already own (${itemNames}), and my preferences (Occasion: ${preferences.occasion}, Style: ${preferences.style}, Color Palette: ${preferences.colorPalette}), suggest a complete outfit for me. Describe the full outfit, suggest other items to pair with what I have, and explain why your suggestion works. Keep the response concise and well-formatted, using markdown for structure (like headings and bullet points).`;
        
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        const suggestion = response.text;
        
        if (!suggestion) {
            return new Response(JSON.stringify({ error: 'Could not generate an outfit suggestion. The model returned no response.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
        }
        
        return new Response(JSON.stringify({ suggestion }), { status: 200, headers: { 'Content-Type': 'application/json' } });

    } catch (error) {
        console.error("Error in generate-outfit endpoint:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown server error occurred.";
        return new Response(JSON.stringify({ error: errorMessage }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
