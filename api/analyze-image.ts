import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

if (!process.env.API_KEY) {
    console.error("CRITICAL: API_KEY environment variable not set on the server.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

export default async function handler(req: Request): Promise<Response> {
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405, headers: { 'Content-Type': 'application/json', 'Allow': 'POST' } });
    }

    try {
        const body = await req.json();
        const { base64Image, mimeType } = body;

        if (!base64Image || !mimeType) {
             return new Response(JSON.stringify({ error: 'Missing required parameters.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }
        if (typeof base64Image !== 'string' || !base64Regex.test(base64Image)) {
            return new Response(JSON.stringify({ error: 'Invalid image data format.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }
        if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
            return new Response(JSON.stringify({ error: 'Unsupported image type.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }
        
        const imagePart = { inlineData: { data: base64Image, mimeType: mimeType } };
        const textPart = { text: "Describe this image in detail. What is the subject, what are they wearing, what is the background, and what is the overall mood or style?" };

        const response: GenerateContentResponse = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: { parts: [imagePart, textPart] },
        });
        
        const analysis = response.text;

        if (analysis) {
            return new Response(JSON.stringify({ analysis }), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }
        
        const blockReason = response.promptFeedback?.blockReason;
        const errorMessage = blockReason 
            ? `Request blocked for safety reasons (${blockReason}).`
            : "The AI could not analyze this image.";
        return new Response(JSON.stringify({ error: errorMessage }), { status: 400, headers: { 'Content-Type': 'application/json' } });

    } catch (error) {
        console.error("Error in analyze-image proxy:", error);
        return new Response(JSON.stringify({ error: "An unexpected server error occurred." }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
