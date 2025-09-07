import React from 'react';

export const GradientIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 6c6 0 6 12 12 12" />
    <path d="M21 18c-6 0-6-12-12-12" />
    <path d="M12 3v18" />
  </svg>
);
