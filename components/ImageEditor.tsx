import React, { useState, useCallback, useEffect } from 'react';
import { ImageUploader } from './ImageUploader';
import { ResultDisplay } from './ResultDisplay';
import { Loader } from './Loader';
import { SparklesIcon } from './icons/SparklesIcon';
import { editImage } from '../services/geminiService';
import { useSound } from '../hooks/useSound';
import { TRANSFORM_SOUND } from '../assets/transformSound';
import { resizeImage } from '../utils/imageUtils';

export const ImageEditor: React.FC = () => {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [resizedDataUrl, setResizedDataUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isProcessingImage, setIsProcessingImage] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState<string>('');

  const playTransformSound = useSound(TRANSFORM_SOUND);

  const handleImageSelected = useCallback((file: File) => {
    setGeneratedImage(null);
    setError(null);
    setOriginalFile(file);
  }, []);

  useEffect(() => {
    if (!originalFile) {
      setResizedDataUrl(null);
      return;
    }

    const processImage = async () => {
      setIsProcessingImage(true);
      setLoadingMessage('Preparing your image...');
      try {
        const dataUrl = await resizeImage(originalFile, 1024, '1:1'); // Edit works best on squares
        setResizedDataUrl(dataUrl);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Could not process the image. Please try another.');
        setResizedDataUrl(null);
        setOriginalFile(null);
      } finally {
        setIsProcessingImage(false);
        setLoadingMessage('');
      }
    };
    processImage();
  }, [originalFile]);


  const handleTransform = useCallback(async () => {
    if (!resizedDataUrl || !prompt) {
      setError("Please upload an image and provide an editing instruction.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);
    playTransformSound();

    try {
      setLoadingMessage("Applying your edits...");
      const base64String = resizedDataUrl.split(',')[1];
      const mimeType = resizedDataUrl.match(/:(.*?);/)?.[1] ?? 'image/jpeg';
      
      const newImageBase64 = await editImage(base64String, mimeType, prompt);
      
      setGeneratedImage(`data:image/jpeg;base64,${newImageBase64}`);
    } catch (err) {
      const friendlyMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(friendlyMessage);
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, [resizedDataUrl, prompt, playTransformSound]);

  const currentIsLoading = isLoading || isProcessingImage;

  return (
    <div className="flex flex-col items-center p-4 sm:p-6 md:p-8">
      <main className="w-full max-w-4xl mx-auto mt-4 flex flex-col items-center gap-8">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col gap-8">
            <ImageUploader onImageUpload={handleImageSelected} previewUrl={resizedDataUrl} disabled={currentIsLoading} />
             <div className="w-full flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-center text-[var(--foreground-color)]">2. Describe Your Edit</h2>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={currentIsLoading}
                    placeholder="e.g., 'make it black and white', 'add sunglasses to the person'..."
                    className="w-full p-3 rounded-lg bg-[var(--card-background-color)] border border-[var(--border-color)] focus:ring-2 focus:ring-[var(--primary-color)] focus:outline-none transition-shadow"
                    rows={3}
                />
            </div>
          </div>

          <div className="flex flex-col gap-4 items-center justify-center h-full">
            {currentIsLoading && !generatedImage ? (
              <Loader message={loadingMessage} />
            ) : (
              <ResultDisplay
                generatedContentUrl={generatedImage}
                contentType="image"
                error={error}
                isLoading={currentIsLoading}
                placeholderText="Your edited image will appear here."
              />
            )}
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={handleTransform}
            disabled={!resizedDataUrl || !prompt || currentIsLoading}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-[var(--foreground-color)] text-[var(--background-color)] font-bold rounded-lg text-lg hover:brightness-125 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed glow-on-hover transform hover:scale-105 active:scale-100"
            aria-label="Edit Image"
          >
            <SparklesIcon />
            {isLoading ? 'Editing...' : 'Edit Image'}
          </button>
        </div>
      </main>
    </div>
  );
};
