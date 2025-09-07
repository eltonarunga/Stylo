
import { useCallback, useRef, useEffect } from 'react';

export const useSound = (soundUrl: string) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);

  useEffect(() => {
    // Decode audio data when the component mounts
    const setupAudio = async () => {
        try {
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            }
            const response = await fetch(soundUrl);
            const arrayBuffer = await response.arrayBuffer();
            audioBufferRef.current = await audioContextRef.current.decodeAudioData(arrayBuffer);
        } catch (error) {
            console.error('Failed to load sound:', error);
        }
    };
    setupAudio();
    
    return () => {
        // Clean up AudioContext on unmount
        if(audioContextRef.current && audioContextRef.current.state !== 'closed') {
            audioContextRef.current.close();
        }
    }
  }, [soundUrl]);

  const playSound = useCallback(() => {
    if (!audioContextRef.current || !audioBufferRef.current) return;
    
    // Resume context if it's suspended (e.g., due to browser autoplay policies)
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    
    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBufferRef.current;
    source.connect(audioContextRef.current.destination);
    source.start(0);
  }, []);

  return playSound;
};
