import React from 'react';

export const CityscapeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2 22h20" />
    <path d="M5 22V8h4v14" />
    <path d="M15 22V4h4v18" />
    <path d="M9 22V12h6v10" />
  </svg>
);
