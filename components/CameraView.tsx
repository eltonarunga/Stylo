
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { dataURLtoFile } from '../utils/imageUtils';

interface CameraViewProps {
  onPhotoTaken: (file: File) => void;
  onClose: () => void;
}

export const CameraView: React.FC<CameraViewProps> = ({ onPhotoTaken, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Could not access the camera. Please check permissions and try again.");
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);
  
  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, [startCamera, stopCamera]);


  const takePicture = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        const file = dataURLtoFile(dataUrl, `photo-${Date.now()}.jpg`);
        onPhotoTaken(file);
      }
      stopCamera();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50 p-4">
      {error ? (
        <div className="bg-white p-6 rounded-lg text-center text-red-600">
            <p>{error}</p>
            <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-200 rounded-md">Close</button>
        </div>
      ) : (
        <>
            <video ref={videoRef} autoPlay playsInline className="w-full max-w-lg h-auto rounded-lg" />
            <div className="mt-4 flex gap-4">
                <button onClick={takePicture} className="px-6 py-3 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600">
                    Take Picture
                </button>
                <button onClick={onClose} className="px-6 py-3 bg-gray-600 text-white font-bold rounded-full hover:bg-gray-700">
                    Cancel
                </button>
            </div>
        </>
      )}
    </div>
  );
};
