
import React, { useRef, useState } from 'react';
import { CameraIcon } from './icons/CameraIcon';
import { PortraitIcon } from './icons/PortraitIcon';
import { CameraView } from './CameraView';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  previewUrl: string | null;
  disabled: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, previewUrl, disabled }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showCamera, setShowCamera] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onImageUpload(event.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoTaken = (file: File) => {
    onImageUpload(file);
    setShowCamera(false);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-center text-[var(--foreground-color)]">1. Upload Your Headshot</h2>
      <div className="relative w-full aspect-square bg-[var(--card-background-color)] rounded-xl border-2 border-dashed border-[var(--border-color)] flex items-center justify-center overflow-hidden">
        {previewUrl ? (
          <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <div className="text-center text-[var(--secondary-foreground-color)]">
            <PortraitIcon />
            <p>Your photo will appear here</p>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={handleButtonClick}
          disabled={disabled}
          className="w-full px-4 py-3 bg-[var(--secondary-background-color)] text-[var(--foreground-color)] font-semibold rounded-lg hover:bg-[var(--hover-background-color)] transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Upload Image
        </button>
        <button
          onClick={() => setShowCamera(true)}
          disabled={disabled}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[var(--secondary-background-color)] text-[var(--foreground-color)] font-semibold rounded-lg hover:bg-[var(--hover-background-color)] transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <CameraIcon />
          Take Photo
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>
      {showCamera && (
        <CameraView
          onPhotoTaken={handlePhotoTaken}
          onClose={() => setShowCamera(false)}
        />
      )}
    </div>
  );
};
