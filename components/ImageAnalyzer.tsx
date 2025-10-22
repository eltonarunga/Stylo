import React, { useState, useCallback, useEffect } from 'react';
import { ImageUploader } from './ImageUploader';
import { Loader } from './Loader';
import { SparklesIcon } from './icons/SparklesIcon';
import { analyzeImage } from '../services/geminiService';
import { resizeImage } from '../utils/imageUtils';

export const ImageAnalyzer: React.FC = () => {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [resizedDataUrl, setResizedDataUrl] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isProcessingImage, setIsProcessingImage] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelected = useCallback((file: File) => {
    setAnalysis(null);
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
      try {
        const dataUrl = await resizeImage(originalFile, 1024, '1:1');
        setResizedDataUrl(dataUrl);
        setError(null);
      } catch (err) {
        setError('Could not process the image.');
        setResizedDataUrl(null);
        setOriginalFile(null);
      } finally {
        setIsProcessingImage(false);
      }
    };
    processImage();
  }, [originalFile]);


  const handleAnalyze = useCallback(async () => {
    if (!resizedDataUrl) {
      setError("Please upload an image to analyze.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const base64String = resizedDataUrl.split(',')[1];
      const mimeType = resizedDataUrl.match(/:(.*?);/)?.[1] ?? 'image/jpeg';
      
      const result = await analyzeImage(base64String, mimeType);
      setAnalysis(result);

    } catch (err) {
      const friendlyMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(friendlyMessage);
    } finally {
      setIsLoading(false);
    }
  }, [resizedDataUrl]);

  const currentIsLoading = isLoading || isProcessingImage;

  return (
    <div className="flex flex-col items-center p-4 sm:p-6 md:p-8">
      <main className="w-full max-w-4xl mx-auto mt-4 flex flex-col items-center gap-8">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col gap-8">
            <ImageUploader onImageUpload={handleImageSelected} previewUrl={resizedDataUrl} disabled={currentIsLoading} />
          </div>

          <div className="flex flex-col gap-4 items-center justify-start h-full">
             <h2 className="text-lg font-semibold text-center text-[var(--foreground-color)]">AI Analysis Result</h2>
            {currentIsLoading ? (
              <Loader message="Analyzing image..." />
            ) : (
                <div className="w-full min-h-[300px] p-4 bg-[var(--card-background-color)] rounded-xl border border-[var(--border-color)]">
                    {error && (
                         <div className="p-4 text-center text-red-500">
                            <p className="font-semibold">Analysis Failed</p>
                            <p className="text-sm mt-2">{error}</p>
                        </div>
                    )}
                    {analysis ? (
                         <pre className="whitespace-pre-wrap font-sans text-sm text-[var(--foreground-color)]">{analysis}</pre>
                    ) : !error && (
                        <p className="text-center text-[var(--secondary-foreground-color)] p-4">Upload an image and click "Analyze" to see the AI-generated description here.</p>
                    )}
                </div>
            )}
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={handleAnalyze}
            disabled={!resizedDataUrl || currentIsLoading}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-[var(--foreground-color)] text-[var(--background-color)] font-bold rounded-lg text-lg hover:brightness-125 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed glow-on-hover transform hover:scale-105 active:scale-100"
            aria-label="Analyze Image"
          >
            <SparklesIcon />
            {isLoading ? 'Analyzing...' : 'Analyze Image'}
          </button>
        </div>
      </main>
    </div>
  );
};
