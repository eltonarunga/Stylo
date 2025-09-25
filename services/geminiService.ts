import type { OutfitItem, OutfitPreferences } from '../types';

/**
 * Generates a new headshot image by calling our backend proxy.
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
    const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            base64Image,
            mimeType,
            style,
            aspectRatio,
            background,
            customPrompt
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || `Server responded with status: ${response.status}`);
    }
    
    if (data.error) {
        throw new Error(data.error);
    }

    if (data.imageBase64) {
        return data.imageBase64;
    }

    throw new Error("Proxy did not return a valid image.");
    
  } catch (error) {
    console.error("Error calling backend proxy:", error);
    if (error instanceof Error) {
        // Re-throw the original, more specific error
        throw error;
    }
    throw new Error("An unknown error occurred while communicating with the backend.");
  }
};

/**
 * Generates an outfit suggestion by calling our backend proxy.
 * @param items The items the user has selected.
 * @param preferences The user's style preferences.
 * @returns A promise that resolves to the string of the outfit suggestion.
 */
export const generateOutfitSuggestion = async (
  items: OutfitItem[],
  preferences: OutfitPreferences,
): Promise<string> => {
  try {
    const response = await fetch('/api/generate-outfit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items, preferences }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || `Server responded with status: ${response.status}`);
    }

    if (data.error) {
        throw new Error(data.error);
    }

    if (data.suggestion) {
        return data.suggestion;
    }
    
    throw new Error("Proxy did not return a valid suggestion.");

  } catch (error) {
    console.error("Error calling outfit generation proxy:", error);
    if (error instanceof Error) {
        throw error;
    }
    throw new Error("An unknown error occurred while communicating with the backend.");
  }
};
