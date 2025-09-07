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
