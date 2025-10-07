import { GoogleGenAI, GenerateContentResponse, Modality } from "@google/genai";

// This code runs on the server. The API_KEY is safe here.
if (!process.env.API_KEY) {
    console.error("CRITICAL: API_KEY environment variable not set on the server.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const ALLOWED_ASPECT_RATIOS = ['1:1', '3:4', '9:16'];
const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

/**
 * A serverless function that acts as a secure proxy to the Google Gemini API.
 * Optimized for Vercel deployment with enhanced security.
 * @param req The incoming request object.
 * @returns A response object with the generated image or an error.
 */
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
        const { base64Image, mimeType, style, aspectRatio, background, customPrompt } = body;

        if (!base64Image || !mimeType || !style || !aspectRatio || !background) {
             return new Response(JSON.stringify({ error: 'Missing required parameters.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }
        if (typeof base64Image !== 'string' || !base64Regex.test(base64Image)) {
            return new Response(JSON.stringify({ error: 'Invalid image data format.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }
        if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
            return new Response(JSON.stringify({ error: 'Unsupported image type.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }
        if (!ALLOWED_ASPECT_RATIOS.includes(aspectRatio)) {
            return new Response(JSON.stringify({ error: 'Invalid aspect ratio.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }
        if (style.length > 100 || background.length > 100 || (customPrompt && customPrompt.length > 500)) {
            return new Response(JSON.stringify({ error: 'Input text is too long.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }
        // --- End Validation ---
        
        let prompt = `A professional headshot of the person in the image, wearing a '${style}'. The background should be: '${background}'. The final image must have a ${aspectRatio} aspect ratio. It is critical to preserve the person's facial features and hair exactly as they are in the original photo.`;

        if (customPrompt) {
            prompt += ` Additionally, apply the following modifications: ${customPrompt}.`;
        }

        const imagePart = {
          inlineData: {
            data: base64Image,
            mimeType: mimeType,
          },
        };

        const textPart = {
          text: prompt,
        };

        const response: GenerateContentResponse = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [imagePart, textPart],
          },
          config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
          },
        });
        
        if (!response.candidates?.length || !response.candidates[0].content?.parts?.length) {
            const blockReason = response.promptFeedback?.blockReason;
            const errorMessage = blockReason 
                ? `Request blocked for safety reasons (${blockReason}). Please try a different image or style.`
                : "The AI could not generate an image from this request. Please try a different photo or style, as the model may have refused the request.";
            return new Response(JSON.stringify({ error: errorMessage }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }
    
        const imageResult = response.candidates[0].content.parts.find(part => part.inlineData);

        if (imageResult?.inlineData) {
            return new Response(JSON.stringify({ imageBase64: imageResult.inlineData.data }), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }
    
        const textResult = response.candidates[0].content.parts.find(part => part.text);
        if (textResult?.text) {
            return new Response(JSON.stringify({ error: `Image generation failed. The AI responded: "${textResult.text}"` }), { status: 500, headers: { 'Content-Type': 'application/json' } });
        }

        return new Response(JSON.stringify({ error: 'Image generation failed: No image was returned in the API response.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });

    } catch (error) {
        console.error("Error in backend proxy:", error);
        // Return a generic error to the client to avoid leaking implementation details
        return new Response(JSON.stringify({ error: "An unexpected server error occurred. Please try again later." }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}