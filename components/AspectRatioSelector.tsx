import React from 'react';
import type { AspectRatio } from '../types';

interface AspectRatioSelectorProps {
  ratios: AspectRatio[];
  selectedRatio: string;
  onSelectRatio: (ratio: string) => void;
}

export const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({ ratios, selectedRatio, onSelectRatio }) => {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">2. Choose Aspect Ratio</h2>
      <div className="flex justify-center gap-4 bg-gray-100 dark:bg-gray-900 p-2 rounded-lg">
        {ratios.map((ratio) => (
          <button
            key={ratio.value}
            type="button"
            aria-pressed={selectedRatio === ratio.value}
            onClick={() => onSelectRatio(ratio.value)}
            className={`px-4 py-2 font-semibold rounded-md transition-all duration-300 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-black focus:ring-gray-400 ${
              selectedRatio === ratio.value
                ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-black'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {ratio.name}
          </button>
        ))}
      </div>
    </div>
  );
};