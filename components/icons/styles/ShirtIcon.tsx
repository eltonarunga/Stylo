import React from 'react';

export const ShirtIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 3l-7 4v12h14V7l-7-4z" />
    <path d="M12 3v5" />
    <path d="M12 12l-7 4" />
    <path d="M12 12l7 4" />
  </svg>
);
