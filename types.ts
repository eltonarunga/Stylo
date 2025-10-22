import React from 'react';

export interface ClothingStyle {
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface AspectRatio {
  name: string;
  value: string; // e.g., '1:1'
}

export interface BackgroundStyle {
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface OutfitItem {
  name: string;
  imageUrl: string;
}

export interface OutfitPreferences {
  occasion: string;
  style: string;
  colorPalette: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}
