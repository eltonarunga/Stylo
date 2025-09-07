import React from 'react';
import type { BackgroundStyle } from '../types';

interface BackgroundSelectorProps {
  styles: BackgroundStyle[];
  selectedStyle: string;
  onSelectStyle: (styleName: string) => void;
}

export const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({ styles, selectedStyle, onSelectStyle }) => {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">4. Choose Your Background</h2>
      <div className="grid grid-cols-3 sm:grid-cols-3 gap-4">
        {styles.map((style) => {
          const Icon = style.icon;
          const isSelected = selectedStyle === style.name;
          return (
            <button
              key={style.name}
              type="button"
              aria-pressed={isSelected}
              aria-label={`Select background: ${style.name}`}
              onClick={() => onSelectStyle(style.name)}
              className={`relative group cursor-pointer rounded-lg p-2 flex flex-col items-center justify-center gap-2 aspect-square transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-black ${
                isSelected 
                  ? 'bg-gray-900 dark:bg-gray-100 focus:ring-gray-400' 
                  : 'bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 focus:ring-gray-400'
              }`}
            >
              <Icon className={`w-10 h-10 transition-colors duration-300 ${
                isSelected ? 'text-white dark:text-black' : 'text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-100'
              }`}/>
              <p className={`font-semibold text-center text-xs transition-colors duration-300 ${
                 isSelected ? 'text-white dark:text-black' : 'text-gray-600 dark:text-gray-300'
              }`}>{style.name}</p>
              
              {isSelected && (
                 <div className="absolute top-1 right-1 w-5 h-5 bg-white dark:bg-black rounded-full flex items-center justify-center border-2 border-gray-900 dark:border-gray-100" aria-hidden="true">
                   <svg className="w-3 h-3 text-gray-900 dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg>
                 </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  );
};