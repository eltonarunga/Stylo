
import React from 'react';
import { AspectRatio } from '../types';

interface AspectRatioSelectorProps {
  ratios: AspectRatio[];
  selectedRatio: string;
  onSelectRatio: (ratio: string) => void;
}

export const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({ ratios, selectedRatio, onSelectRatio }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-center text-[var(--foreground-color)]">2. Pick an Aspect Ratio</h2>
      <div className="flex justify-center gap-4">
        {ratios.map(ratio => (
          <button
            key={ratio.value}
            onClick={() => onSelectRatio(ratio.value)}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
              selectedRatio === ratio.value
                ? 'bg-[var(--primary-color)] text-white'
                : 'bg-[var(--card-background-color)] text-[var(--secondary-foreground-color)] hover:bg-[var(--hover-background-color)]'
            }`}
          >
            {ratio.name}
          </button>
        ))}
      </div>
    </div>
  );
};
