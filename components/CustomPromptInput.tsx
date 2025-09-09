
import React from 'react';

interface CustomPromptInputProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
  disabled: boolean;
}

export const CustomPromptInput: React.FC<CustomPromptInputProps> = ({ prompt, onPromptChange, disabled }) => {
  return (
    <div className="w-full flex flex-col gap-4">
       <h2 className="text-lg font-semibold text-center text-[var(--foreground-color)]">5. (Optional) Add Custom Instructions</h2>
      <textarea
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        disabled={disabled}
        placeholder="e.g., 'add glasses', 'change hair color to red'..."
        className="w-full p-3 rounded-lg bg-[var(--card-background-color)] border border-[var(--border-color)] focus:ring-2 focus:ring-[var(--primary-color)] focus:outline-none transition-shadow"
        rows={3}
      />
    </div>
  );
};
