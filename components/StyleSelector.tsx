
import React from 'react';
import type { ClothingStyle } from '../types';

interface StyleSelectorProps {
  styles: ClothingStyle[];
  onSelectStyle: (styleName: string) => void;
  selectedStyle: string | null;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ styles, onSelectStyle, selectedStyle }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-center text-[var(--foreground-color)]">3. Choose Your Style</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
        {styles.map((style) => (
          <button
            key={style.name}
            onClick={() => onSelectStyle(style.name)}
            className={`flex flex-col items-center justify-center gap-2 p-2 rounded-lg aspect-square transition-all duration-200 ${
              selectedStyle === style.name
                ? 'bg-[var(--primary-color)] text-white ring-2 ring-offset-2 ring-offset-[var(--background-color)] ring-[var(--primary-color)]'
                : 'bg-[var(--card-background-color)] text-[var(--secondary-foreground-color)] hover:bg-[var(--hover-background-color)]'
            }`}
          >
            <style.icon className="w-8 h-8" />
            <span className="text-xs text-center font-medium">{style.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
