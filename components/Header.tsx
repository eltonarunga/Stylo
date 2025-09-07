import React from 'react';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="text-center w-full max-w-4xl mx-auto relative">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-wider text-gray-800 dark:text-gray-200">
        Stylo
      </h1>
      <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
        Your personal AI stylist.
      </p>
      <div className="absolute top-0 right-0">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
    </header>
  );
};