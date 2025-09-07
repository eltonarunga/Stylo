import React from 'react';

interface CustomPromptInputProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
  disabled: boolean;
}

export const CustomPromptInput: React.FC<CustomPromptInputProps> = ({ prompt, onPromptChange, disabled }) => {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">5. Add Custom Modifications <span className="text-base font-normal text-gray-500 dark:text-gray-400">(Optional)</span></h2>
      <textarea
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        disabled={disabled}
        placeholder="e.g., add glasses, change hair color to red, smile more..."
        rows={3}
        className="w-full p-3 bg-gray-100 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors duration-300 disabled:bg-gray-200 dark:disabled:bg-gray-800 disabled:cursor-not-allowed"
        aria-label="Add custom modifications to your headshot"
      />
    </div>
  );
};