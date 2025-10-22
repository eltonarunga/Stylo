import React, { useState, useCallback } from 'react';
import { AspectRatioSelector } from './AspectRatioSelector';
import { ResultDisplay } from './ResultDisplay';
import { Loader } from './Loader';
import { SparklesIcon } from './icons/SparklesIcon';
import { createImage } from '../services/geminiService';
import { ASPECT_RATIOS } from '../constants';
import { useSound } from '../hooks/useSound';
import { TRANSFORM_SOUND } from '../assets/transformSound';

export const ImageCreator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<string>(ASPECT_RATIOS[0].value);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const playTransformSound = useSound(TRANSFORM_SOUND);

  const handleCreate = useCallback(async () => {
    if (!prompt) {
      setError("Please enter a prompt to create an image.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);
    playTransformSound();

    try {
      const newImageBase64 = await createImage(prompt, selectedAspectRatio);
      setGeneratedImage(`data:image/jpeg;base64,${newImageBase64}`);
    } catch (err) {
      const friendlyMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(friendlyMessage);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, selectedAspectRatio, playTransformSound]);

  return (
    <div className="flex flex-col items-center p-4 sm:p-6 md:p-8">
      <main className="w-full max-w-4xl mx-auto mt-4 flex flex-col items-center gap-8">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col gap-8">
            <div className="w-full flex flex-col gap-4">
              <h2 className="text-lg font-semibold text-center text-[var(--foreground-color)]">1. Describe Your Vision</h2>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isLoading}
                placeholder="e.g., 'a photorealistic image of a cat wearing a tiny wizard hat'..."
                className="w-full p-3 rounded-lg bg-[var(--card-background-color)] border border-[var(--border-color)] focus:ring-2 focus:ring-[var(--primary-color)] focus:outline-none transition-shadow"
                rows={5}
              />
            </div>
            <AspectRatioSelector ratios={ASPECT_RATIOS} selectedRatio={selectedAspectRatio} onSelectRatio={setSelectedAspectRatio} />
          </div>

          <div className="flex flex-col gap-4 items-center justify-center h-full">
            {isLoading ? (
              <Loader message="Creating your image..." />
            ) : (
              <ResultDisplay
                generatedContentUrl={generatedImage}
                contentType="image"
                error={error}
                isLoading={isLoading}
                placeholderText="Your generated image will appear here."
              />
            )}
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={handleCreate}
            disabled={!prompt || isLoading}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-[var(--foreground-color)] text-[var(--background-color)] font-bold rounded-lg text-lg hover:brightness-125 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed glow-on-hover transform hover:scale-105 active:scale-100"
            aria-label="Create Image"
          >
            <SparklesIcon />
            {isLoading ? 'Creating...' : 'Create Image'}
          </button>
        </div>
      </main>
    </div>
  );
};
