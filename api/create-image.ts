import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    console.error("CRITICAL: API_KEY environment variable not set on the server.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

const ALLOWED_ASPECT_RATIOS = ['1:1', '3:4', '4:3', '9:16', '16:9'];

export default async function handler(req: Request): Promise<Response> {
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405, headers: { 'Content-Type': 'application/json', 'Allow': 'POST' } });
    }

    try {
        const body = await req.json();
        const { prompt, aspectRatio } = body;

        if (!prompt || !aspectRatio) {
             return new Response(JSON.stringify({ error: 'Missing required parameters.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }
        if (prompt.length > 1000) {
            return new Response(JSON.stringify({ error: 'Prompt is too long.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }
        if (!ALLOWED_ASPECT_RATIOS.includes(aspectRatio)) {
            return new Response(JSON.stringify({ error: 'Invalid aspect ratio.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }
        
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: aspectRatio as '1:1' | '3:4' | '4:3' | '9:16' | '16:9',
            },
        });
        
        const imageBase64 = response.generatedImages?.[0]?.image?.imageBytes;

        if (imageBase64) {
            return new Response(JSON.stringify({ imageBase64 }), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }
        
        const blockReason = response.promptFeedback?.blockReason;
        const errorMessage = blockReason 
            ? `Request blocked for safety reasons (${blockReason}).`
            : "The AI could not generate an image from this request.";
        return new Response(JSON.stringify({ error: errorMessage }), { status: 400, headers: { 'Content-Type': 'application/json' } });

    } catch (error) {
        console.error("Error in create-image proxy:", error);
        return new Response(JSON.stringify({ error: "An unexpected server error occurred." }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
