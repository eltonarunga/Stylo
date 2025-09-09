
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
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `stylo-headshot-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 items-center">
      <h2 className="text-lg font-semibold text-center text-[var(--foreground-color)]">Your New Headshot</h2>
      <div className="relative w-full aspect-square bg-[var(--card-background-color)] rounded-xl border-2 border-dashed border-[var(--border-color)] flex items-center justify-center overflow-hidden">
        {!generatedImage && !error && !isLoading && (
           <div className="text-center text-[var(--secondary-foreground-color)] p-4">
            <PortraitIcon />
            <p>Your new headshot will appear here after you click "Stylize Me".</p>
          </div>
        )}
        
        {generatedImage && (
          <img src={generatedImage} alt="Generated Headshot" className="w-full h-full object-cover" />
        )}

        {error && (
            <div className="p-4 text-center text-red-500">
                <p className="font-semibold">Oh no! Something went wrong.</p>
                <p className="text-sm mt-2">{error}</p>
            </div>
        )}

      </div>
      {generatedImage && (
        <button
          onClick={handleDownload}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white font-bold rounded-lg text-md hover:bg-green-600 transition-colors duration-300 transform hover:scale-105 active:scale-100"
        >
          <DownloadIcon />
          Download
        </button>
      )}
    </div>
  );
};
