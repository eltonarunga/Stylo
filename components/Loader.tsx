
import React from 'react';

interface LoaderProps {
  message?: string;
}

export const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full aspect-square bg-[var(--card-background-color)] rounded-xl">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[var(--primary-color)]"></div>
      {message && <p className="mt-4 text-lg font-semibold text-[var(--foreground-color)] text-center">{message}</p>}
    </div>
  );
};
