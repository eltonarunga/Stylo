import { GoogleGenAI } from '@google/genai';
import type { OutfitItem, OutfitPreferences, ChatMessage } from '../types';

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

// FIX: Added a missing opening brace for the catch block.
  } catch (error) {
    console.error("Error calling outfit generation proxy:", error);
    if (error instanceof Error) {
        throw error;
    }
    throw new Error("An unknown error occurred while communicating with the backend.");
  }
};

export const editImage = async (base64Image: string, mimeType: string, prompt: string): Promise<string> => {
  const response = await fetch('/api/edit-image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ base64Image, mimeType, prompt }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Image editing failed.');
  return data.imageBase64;
};

export const createImage = async (prompt: string, aspectRatio: string): Promise<string> => {
  const response = await fetch('/api/create-image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, aspectRatio }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Image creation failed.');
  return data.imageBase64;
};

export const analyzeImage = async (base64Image: string, mimeType: string): Promise<string> => {
  const response = await fetch('/api/analyze-image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ base64Image, mimeType }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Image analysis failed.');
  return data.analysis;
};

export const getChatResponse = async (history: ChatMessage[]): Promise<string> => {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ history }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Chat request failed.');
  return data.response;
};

// This function now runs entirely on the client-side to handle the dynamic API key for Veo.
export const animateVideo = async (
  base64Image: string,
  mimeType: string,
  prompt: string,
  aspectRatio: string
): Promise<string> => {
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  
  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: prompt,
    image: {
      imageBytes: base64Image,
      mimeType: mimeType,
    },
    config: {
      numberOfVideos: 1,
      resolution: '720p',
      aspectRatio: aspectRatio as '16:9' | '9:16',
    }
  });

  while (!operation.done) {
    // Wait for 10 seconds before checking the status again
    await new Promise(resolve => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({ operation: operation });
  }

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;

  if (!downloadLink) {
    throw new Error("Video generation failed to produce a valid download link.");
  }
  
  // The response.body contains the MP4 bytes. You must append an API key when fetching from the download link.
  const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
  if (!response.ok) {
    throw new Error(`Failed to download video file. Status: ${response.status}`);
  }
  
  const videoBlob = await response.blob();
  return URL.createObjectURL(videoBlob);
};