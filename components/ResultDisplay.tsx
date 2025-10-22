import React from 'react';
import { PortraitIcon } from './icons/PortraitIcon';
import { DownloadIcon } from './icons/DownloadIcon';

interface ResultDisplayProps {
  generatedContentUrl: string | null;
  contentType: 'image' | 'video';
  error: string | null;
  isLoading: boolean;
  placeholderText: string;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({
  generatedContentUrl,
  contentType,
  error,
  isLoading,
  placeholderText,
}) => {
  const handleDownload = () => {
    if (generatedContentUrl) {
      const link = document.createElement('a');
      link.href = generatedContentUrl;
      const extension = contentType === 'image' ? 'jpg' : 'mp4';
      link.download = `stylo-creation-${Date.now()}.${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 items-center">
      <h2 className="text-lg font-semibold text-center text-[var(--foreground-color)]">Your New Creation</h2>
      <div className="relative w-full aspect-square bg-[var(--card-background-color)] rounded-xl border-2 border-dashed border-[var(--border-color)] flex items-center justify-center overflow-hidden">
        {!generatedContentUrl && !error && !isLoading && (
          <div className="text-center text-[var(--secondary-foreground-color)] p-4">
            <PortraitIcon />
            <p>{placeholderText}</p>
          </div>
        )}

        {generatedContentUrl && contentType === 'image' && (
          <img src={generatedContentUrl} alt="Generated Content" className="w-full h-full object-cover" />
        )}

        {generatedContentUrl && contentType === 'video' && (
          <video src={generatedContentUrl} controls autoPlay loop muted className="w-full h-full object-cover" />
        )}

        {error && (
          <div className="p-4 text-center text-red-500">
            <p className="font-semibold">Oh no! Something went wrong.</p>
            <p className="text-sm mt-2">{error}</p>
          </div>
        )}
      </div>
      {generatedContentUrl && (
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
