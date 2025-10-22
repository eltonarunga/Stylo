import { GoogleGenAI, GenerateContentResponse, Modality } from "@google/genai";

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
        const { base64Image, mimeType, prompt } = body;

        if (!base64Image || !mimeType || !prompt) {
             return new Response(JSON.stringify({ error: 'Missing required parameters.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }
        if (typeof base64Image !== 'string' || !base64Regex.test(base64Image)) {
            return new Response(JSON.stringify({ error: 'Invalid image data format.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }
        if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
            return new Response(JSON.stringify({ error: 'Unsupported image type.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }
        if (prompt.length > 500) {
            return new Response(JSON.stringify({ error: 'Prompt is too long.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }
        
        const imagePart = { inlineData: { data: base64Image, mimeType: mimeType } };
        const textPart = { text: `Edit the image based on this instruction: "${prompt}". Preserve the original subject and quality where possible.` };

        const response: GenerateContentResponse = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: { parts: [imagePart, textPart] },
          config: { responseModalities: [Modality.IMAGE] },
        });
        
        const imageResult = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);

        if (imageResult?.inlineData) {
            return new Response(JSON.stringify({ imageBase64: imageResult.inlineData.data }), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }
        
        const blockReason = response.promptFeedback?.blockReason;
        const errorMessage = blockReason 
            ? `Request blocked for safety reasons (${blockReason}).`
            : "The AI could not generate an image from this request.";
        return new Response(JSON.stringify({ error: errorMessage }), { status: 400, headers: { 'Content-Type': 'application/json' } });

    } catch (error) {
        console.error("Error in edit-image proxy:", error);
        return new Response(JSON.stringify({ error: "An unexpected server error occurred." }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
