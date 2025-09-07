import React from 'react';

export const TurtleneckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 20V10a4 4 0 0 0-4-4s-4 1.8-4 4v10" />
    <path d="M6 20V10c0-2.2 1.8-4 4-4" />
    <path d="M12 2v4" />
    <path d="M8 6h8" />
  </svg>
);
