import React, { useRef, useEffect, useState, useCallback } from 'react';

interface CameraViewProps {
  onPhotoTaken: (dataUrl: string) => void;
  onCancel: () => void;
}

export const CameraView: React.FC<CameraViewProps> = ({ onPhotoTaken, onCancel }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mediaStream: MediaStream;

    const startCamera = async () => {
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setError("Could not access camera. Please check permissions.");
      }
    };

    startCamera();

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleTakePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (context) {
      // Flip the context horizontally to correct the mirror effect
      context.translate(canvas.width, 0);
      context.scale(-1, 1);
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      onPhotoTaken(dataUrl);
    }
  }, [onPhotoTaken]);

  return (
    <div className="w-full aspect-square bg-black rounded-lg flex flex-col items-center justify-center relative animate-fadeIn">
      {error ? (
        <div className="text-center text-red-400 p-4">
          <p className="font-bold">Camera Error</p>
          <p>{error}</p>
          <button onClick={onCancel} className="mt-4 px-4 py-2 bg-purple-600 rounded-lg">Go Back</button>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover rounded-lg transform scale-x-[-1]"
          />
          <canvas ref={canvasRef} className="hidden" />
          <div className="absolute inset-0 flex flex-col justify-between p-4">
             <div className="flex justify-end">
                <button
                    onClick={onCancel}
                    aria-label="Cancel and go back to uploader"
                    className="w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-75 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
             </div>
             <div className="flex justify-center">
                 <button
                    onClick={handleTakePhoto}
                    aria-label="Take picture"
                    className="w-16 h-16 bg-white rounded-full border-4 border-purple-500 hover:bg-purple-200 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black"
                 />
             </div>
          </div>
        </>
      )}
    </div>
  );
};