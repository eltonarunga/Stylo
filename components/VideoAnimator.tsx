import React, { useState, useCallback, useEffect } from 'react';
import { ImageUploader } from './ImageUploader';
import { AspectRatioSelector } from './AspectRatioSelector';
import { ResultDisplay } from './ResultDisplay';
import { Loader } from './Loader';
import { SparklesIcon } from './icons/SparklesIcon';
import { animateVideo } from '../services/geminiService';
import { VIDEO_ASPECT_RATIOS } from '../constants';
import { resizeImage } from '../utils/imageUtils';

declare global {
    interface Window {
        // FIX: Made aistudio optional to resolve potential declaration conflicts.
        // The existing code already checks for its existence, so this is safe.
        aistudio?: {
            hasSelectedApiKey: () => Promise<boolean>;
            openSelectKey: () => Promise<void>;
        }
    }
}

const LOADING_MESSAGES = [
    "Warming up the video generator...",
    "This can take a few minutes, please wait.",
    "Processing initial frames...",
    "Animating the scene...",
    "Adding visual effects...",
    "Finalizing your video, almost there!",
];

export const VideoAnimator: React.FC = () => {
    const [originalFile, setOriginalFile] = useState<File | null>(null);
    const [resizedDataUrl, setResizedDataUrl] = useState<string | null>(null);
    const [prompt, setPrompt] = useState<string>('');
    const [selectedAspectRatio, setSelectedAspectRatio] = useState<string>(VIDEO_ASPECT_RATIOS[0].value);
    const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isProcessingImage, setIsProcessingImage] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [loadingMessage, setLoadingMessage] = useState<string>('');
    const [hasApiKey, setHasApiKey] = useState(false);

    useEffect(() => {
        const checkApiKey = async () => {
            if (window.aistudio) {
                const keyStatus = await window.aistudio.hasSelectedApiKey();
                setHasApiKey(keyStatus);
            }
        };
        checkApiKey();
    }, []);

    const handleSelectKey = async () => {
        if (window.aistudio) {
            await window.aistudio.openSelectKey();
            // Assume success to avoid race condition, enable generate button
            setHasApiKey(true);
        }
    };

    useEffect(() => {
        // FIX: Replaced NodeJS.Timeout with ReturnType<typeof setInterval> for browser compatibility.
        // NodeJS types are not available in the browser environment.
        let interval: ReturnType<typeof setInterval>;
        if (isLoading) {
            setLoadingMessage(LOADING_MESSAGES[0]);
            let messageIndex = 1;
            interval = setInterval(() => {
                setLoadingMessage(LOADING_MESSAGES[messageIndex % LOADING_MESSAGES.length]);
                messageIndex++;
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [isLoading]);

    const handleImageSelected = useCallback((file: File) => {
        setGeneratedVideoUrl(null);
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
                const dataUrl = await resizeImage(originalFile, 720, selectedAspectRatio);
                setResizedDataUrl(dataUrl);
                setError(null);
            } catch (err) {
                setError('Could not process image.');
                setResizedDataUrl(null);
                setOriginalFile(null);
            } finally {
                setIsProcessingImage(false);
            }
        };
        processImage();
    }, [originalFile, selectedAspectRatio]);

    const handleAnimate = useCallback(async () => {
        if (!resizedDataUrl || !prompt) {
            setError("Please upload an image and provide an animation prompt.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setGeneratedVideoUrl(null);

        try {
            const base64String = resizedDataUrl.split(',')[1];
            const mimeType = resizedDataUrl.match(/:(.*?);/)?.[1] ?? 'image/jpeg';
            const videoUrl = await animateVideo(base64String, mimeType, prompt, selectedAspectRatio);
            setGeneratedVideoUrl(videoUrl);
        } catch (err) {
            let friendlyMessage = err instanceof Error ? err.message : "An unknown error occurred.";
            if (friendlyMessage.includes("Requested entity was not found")) {
                friendlyMessage = "API Key error. Please try selecting your API key again.";
                setHasApiKey(false);
            }
            setError(friendlyMessage);
        } finally {
            setIsLoading(false);
        }
    }, [resizedDataUrl, prompt, selectedAspectRatio]);
    
    const currentIsLoading = isLoading || isProcessingImage;

    return (
        <div className="flex flex-col items-center p-4 sm:p-6 md:p-8">
            <main className="w-full max-w-4xl mx-auto mt-4 flex flex-col items-center gap-8">
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <div className="flex flex-col gap-8">
                        <ImageUploader onImageUpload={handleImageSelected} previewUrl={resizedDataUrl} disabled={currentIsLoading} />
                        <AspectRatioSelector ratios={VIDEO_ASPECT_RATIOS} selectedRatio={selectedAspectRatio} onSelectRatio={setSelectedAspectRatio} />
                        <div className="w-full flex flex-col gap-4">
                            <h2 className="text-lg font-semibold text-center text-[var(--foreground-color)]">3. Describe the Animation</h2>
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                disabled={currentIsLoading}
                                placeholder="e.g., 'the person slowly smiles', 'a gentle breeze blows through their hair'..."
                                className="w-full p-3 rounded-lg bg-[var(--card-background-color)] border border-[var(--border-color)] focus:ring-2 focus:ring-[var(--primary-color)] focus:outline-none transition-shadow"
                                rows={3}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 items-center justify-center h-full">
                        {currentIsLoading ? (
                            <Loader message={loadingMessage} />
                        ) : (
                            <ResultDisplay
                                generatedContentUrl={generatedVideoUrl}
                                contentType="video"
                                error={error}
                                isLoading={currentIsLoading}
                                placeholderText="Your generated video will appear here."
                            />
                        )}
                    </div>
                </div>

                <div className="mt-4 flex flex-col items-center gap-4">
                    {!hasApiKey && (
                         <div className="text-center p-4 border border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                            <p className="text-yellow-700 dark:text-yellow-300 font-semibold mb-2">API Key Required</p>
                            <p className="text-sm text-yellow-600 dark:text-yellow-200 mb-3">Video generation requires you to select your own API key. For more information, please see the <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="underline">billing documentation</a>.</p>
                            <button onClick={handleSelectKey} className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600">
                                Select API Key
                            </button>
                        </div>
                    )}
                    <button
                        onClick={handleAnimate}
                        disabled={!resizedDataUrl || !prompt || currentIsLoading || !hasApiKey}
                        className="flex items-center justify-center gap-2 px-8 py-4 bg-[var(--foreground-color)] text-[var(--background-color)] font-bold rounded-lg text-lg hover:brightness-125 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed glow-on-hover transform hover:scale-105 active:scale-100"
                        aria-label="Animate Video"
                    >
                        <SparklesIcon />
                        {isLoading ? 'Animating...' : 'Animate Video'}
                    </button>
                </div>
            </main>
        </div>
    );
};