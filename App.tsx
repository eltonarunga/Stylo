import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { StyleSelector } from './components/StyleSelector';
import { AspectRatioSelector } from './components/AspectRatioSelector';
import { BackgroundSelector } from './components/BackgroundSelector';
import { CustomPromptInput } from './components/CustomPromptInput';
import { ResultDisplay } from './components/ResultDisplay';
import { Loader } from './components/Loader';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { generateTransformedImage } from './services/geminiService';
import { CLOTHING_STYLES, ASPECT_RATIOS, BACKGROUND_STYLES } from './constants';
import { useSound } from './hooks/useSound';
import { TRANSFORM_SOUND } from './assets/transformSound';
import { resizeImage } from './utils/imageUtils';

const App: React.FC = () => {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [resizedDataUrl, setResizedDataUrl] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<string>(ASPECT_RATIOS[0].value);
  const [selectedBackground, setSelectedBackground] = useState<string>(BACKGROUND_STYLES[0].name);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isProcessingImage, setIsProcessingImage] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const playTransformSound = useSound(TRANSFORM_SOUND);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const handleImageSelected = useCallback((file: File) => {
    setGeneratedImage(null);
    setError(null);
    setOriginalFile(file);
  }, []);

  useEffect(() => {
    if (!originalFile) {
      return;
    }

    const processImage = async () => {
      setIsProcessingImage(true);
      setLoadingMessage('Optimizing your image...');
      try {
        const dataUrl = await resizeImage(originalFile, 1024, selectedAspectRatio);
        setResizedDataUrl(dataUrl);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Could not process the selected image. Please try a different one.');
        setResizedDataUrl(null);
        setOriginalFile(null);
      } finally {
        setIsProcessingImage(false);
        setLoadingMessage('');
      }
    };
    processImage();
  }, [originalFile, selectedAspectRatio]);


  const handleTransform = useCallback(async () => {
    if (!resizedDataUrl || !selectedStyle) {
      setError("Please upload a selfie and select a style.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);
    playTransformSound();

    try {
      setLoadingMessage("Generating your new headshot...");
      const base64String = resizedDataUrl.split(',')[1];
      const mimeType = resizedDataUrl.match(/:(.*?);/)?.[1] ?? 'image/jpeg';
      
      const newImageBase64 = await generateTransformedImage(
        base64String, 
        mimeType, 
        selectedStyle, 
        selectedAspectRatio,
        selectedBackground,
        customPrompt
      );
      
      setGeneratedImage(`data:image/jpeg;base64,${newImageBase64}`);
    } catch (err) {
      console.error(err);
      const friendlyMessage = err instanceof Error 
        ? err.message 
        : "An unknown error occurred during transformation. Please check your connection and try again.";
      setError(friendlyMessage);
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, [resizedDataUrl, selectedStyle, selectedAspectRatio, selectedBackground, customPrompt, playTransformSound]);

  const currentIsLoading = isLoading || isProcessingImage;

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 md:p-8">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="w-full max-w-4xl mx-auto mt-8 flex flex-col items-center gap-8">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col gap-8">
            <ImageUploader onImageUpload={handleImageSelected} previewUrl={resizedDataUrl} disabled={currentIsLoading} />
            <AspectRatioSelector ratios={ASPECT_RATIOS} selectedRatio={selectedAspectRatio} onSelectRatio={setSelectedAspectRatio} />
            <StyleSelector styles={CLOTHING_STYLES} onSelectStyle={setSelectedStyle} selectedStyle={selectedStyle} />
            <BackgroundSelector styles={BACKGROUND_STYLES} selectedStyle={selectedBackground} onSelectStyle={setSelectedBackground} />
            <CustomPromptInput prompt={customPrompt} onPromptChange={setCustomPrompt} disabled={currentIsLoading} />
          </div>

          <div className="flex flex-col gap-4 items-center justify-center h-full">
            {currentIsLoading && !generatedImage ? (
              <Loader message={loadingMessage} />
            ) : (
              <ResultDisplay generatedImage={generatedImage} error={error} isLoading={currentIsLoading} />
            )}
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={handleTransform}
            disabled={!resizedDataUrl || !selectedStyle || currentIsLoading}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white dark:bg-gray-100 dark:text-black font-bold rounded-lg text-lg hover:bg-gray-700 dark:hover:bg-gray-300 transition-all duration-300 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed glow-on-hover transform hover:scale-105 active:scale-100"
            aria-label="Stylize me"
          >
            <SparklesIcon />
            {isLoading ? 'Stylizing...' : 'Stylize Me'}
          </button>
        </div>
      </main>
    </div>
  );
};

export default App;