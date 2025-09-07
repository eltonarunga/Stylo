import React, { useRef, useCallback, useState } from 'react';
import { CameraIcon } from './icons/CameraIcon';
import { CameraView } from './CameraView';
import { dataURLtoFile } from '../utils/imageUtils';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  previewUrl: string | null;
  disabled: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, previewUrl, disabled }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showCamera, setShowCamera] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleClick = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (disabled) return;
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
       onImageUpload(file);
    }
  }, [onImageUpload, disabled]);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  const handlePhotoTaken = (dataUrl: string) => {
    const file = dataURLtoFile(dataUrl, 'selfie.jpg');
    onImageUpload(file);
    setShowCamera(false);
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">1. Upload Your Selfie</h2>
      
      {showCamera ? (
        <CameraView onPhotoTaken={handlePhotoTaken} onCancel={() => setShowCamera(false)} />
      ) : (
        <div className="flex flex-col gap-4">
          <div
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-label="Upload your selfie image"
            aria-disabled={disabled}
            className={`w-full aspect-square bg-gray-100 dark:bg-gray-900 rounded-lg border-2 border-dashed flex items-center justify-center transition-all duration-300 ${
              disabled
                ? 'border-gray-400 dark:border-gray-700 cursor-not-allowed'
                : 'border-gray-400 dark:border-gray-600 cursor-pointer hover:border-gray-500 dark:hover:border-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'
            }`}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/png, image/jpeg, image/webp"
              className="hidden"
              disabled={disabled}
            />
            {previewUrl ? (
              <img src={previewUrl} alt="Selfie preview" className="w-full h-full object-cover rounded-lg" />
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400">
                <p className="text-lg">Click or drag & drop to upload</p>
                <p className="text-sm">PNG, JPG, or WEBP</p>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <hr className="flex-grow border-gray-300 dark:border-gray-700" />
            <span className="text-gray-500 dark:text-gray-400">OR</span>
            <hr className="flex-grow border-gray-300 dark:border-gray-700" />
          </div>

          <button
            onClick={() => setShowCamera(true)}
            disabled={disabled}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-semibold rounded-lg text-md hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed border border-gray-300 dark:border-gray-600"
            aria-label="Use camera to take a selfie"
          >
            <CameraIcon />
            Use Camera
          </button>
        </div>
      )}
    </div>
  );
};