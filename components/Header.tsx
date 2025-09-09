import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center w-full max-w-4xl mx-auto relative">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-wider text-[var(--foreground-color)]">
        Stylo
      </h1>
      <p className="mt-2 text-lg text-[var(--secondary-foreground-color)]">
        Your personal AI stylist.
      </p>
    </header>
  );
};