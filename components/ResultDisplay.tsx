import React from 'react';
import { PortraitIcon } from './icons/PortraitIcon';
import { DownloadIcon } from './icons/DownloadIcon';


interface ResultDisplayProps {
  generatedImage: string | null;
  error: string | null;
  isLoading: boolean;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ generatedImage, error, isLoading }) => {
  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = 'stylo-transformation.jpeg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-900 rounded-lg border-2 border-gray-200 dark:border-gray-800 min-h-[300px] md:min-h-full">
       <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">Your New Look</h2>
       <div role="status" className="w-full flex flex-col items-center justify-center flex-grow">
          {error && (
            <div className="text-center text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900 dark:bg-opacity-30 p-4 rounded-lg animate-fadeIn">
              <p className="font-bold">Transformation Failed</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          )}
          {generatedImage && !error && (
            <div className="text-center animate-fadeIn">
              <img src={generatedImage} alt="Generated headshot" className="w-full max-w-sm object-contain rounded-lg" />
              <button
                onClick={handleDownload}
                className="mt-4 flex items-center justify-center gap-2 px-6 py-2 bg-gray-800 text-white dark:bg-gray-200 dark:text-black font-semibold rounded-lg text-md hover:bg-gray-600 dark:hover:bg-gray-400 transition-all duration-300 glow-on-hover transform hover:scale-105 active:scale-100"
                aria-label="Download generated image"
              >
                <DownloadIcon />
                Download Image
              </button>
            </div>
          )}
          {!generatedImage && !error && !isLoading && (
            <div className="text-center text-gray-500 dark:text-gray-400 flex flex-col items-center gap-4">
              <PortraitIcon />
              <p>Your transformed headshot will appear here.</p>
            </div>
          )}
        </div>
    </div>
  );
};