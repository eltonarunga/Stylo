import { GoogleGenAI, GenerateContentResponse, Modality } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a new headshot image based on an original image and a clothing style.
 * @param base64Image The base64 encoded image string.
 * @param mimeType The MIME type of the image.
 * @param style The desired clothing style.
 * @param aspectRatio The desired aspect ratio for the output image.
 * @param background The desired background style for the output image.
 * @param customPrompt Optional text for additional modifications.
 * @returns A promise that resolves to the base64 encoded string of the generated image.
 */
export const generateTransformedImage = async (
  base64Image: string, 
  mimeType: string, 
  style: string, 
  aspectRatio: string,
  background: string,
  customPrompt: string
): Promise<string> => {
  try {
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
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [imagePart, textPart],
      },
      // This config is required for the image editing model to return an image.
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    // Robustly check for a valid response candidate and parts
    if (!response.candidates?.length || !response.candidates[0].content?.parts?.length) {
      const blockReason = response.promptFeedback?.blockReason;
      if (blockReason) {
        throw new Error(`Request blocked for safety reasons (${blockReason}). Please try a different image or style.`);
      }
      throw new Error("The AI could not generate an image from this request. Please try a different photo or style, as the model may have refused the request.");
    }

    // Find and return the first image part in the response
    const imageResult = response.candidates[0].content.parts.find(part => part.inlineData);

    if (imageResult?.inlineData) {
      return imageResult.inlineData.data;
    }

    // If there's a response but no image, check for explanatory text.
    const textResult = response.candidates[0].content.parts.find(part => part.text);
    if (textResult?.text) {
        throw new Error(`Image generation failed. The AI responded: "${textResult.text}"`);
    }

    throw new Error("Image generation failed: No image was returned in the API response.");
    
  } catch (error) {
    console.error("Error generating transformed image:", error);
    if (error instanceof Error) {
        // Re-throw the original, more specific error
        throw error;
    }
    throw new Error("An unknown error occurred while communicating with the image generation API.");
  }
};