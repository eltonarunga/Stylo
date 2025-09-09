import React from 'react';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGetStarted }) => {
  return (
    <div className="relative flex size-full min-h-screen flex-col justify-center items-center group/design-root overflow-x-hidden animate-fadeIn">
      <div className="flex flex-col">
        <header className="flex items-center justify-center p-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-3xl text-[var(--primary-color)]">styler</span>
            <h1 className="font-serif text-2xl font-bold text-[var(--primary-color)]">Stylo</h1>
          </div>
        </header>
        <main className="flex-grow flex flex-col items-center justify-center text-center px-6 pt-8 pb-12">
          <div className="w-40 h-40 bg-slate-200 rounded-full flex items-center justify-center mb-8 shadow-md">
            <img alt="App Logo" className="w-24 h-24" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDq5LxdaRI_sb3HsOOQzQXSDlCIN44kboMb6c-4NWtmAs8NOKJ4pvcvlDilmDkgCUUpiVZupPYx9z6CrSMv3GfAke4lfrGOyE9CP78SkuBSlVkGd0944dznPPAaKxY6qlFynKXyAq_hgg4X6bkf_-efipNT8anpkdgBWlSZ53HuZXs0xX1xg5BhzU8JigNgpvgZIuIPDF2oCQPgtzRCgPusYSjRbCD5llgTgJvwg6GShFm42MFl0SRacq29cL3q8Pgy_iOI6fGg7aM2" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground-color)] mb-3 font-serif">Reimagine Your Wardrobe with AI</h2>
          <p className="text-[var(--secondary-foreground-color)] max-w-sm mx-auto text-base">Effortlessly discover new outfits and curate your personal style. Your closet, reimagined.</p>
          <button onClick={onGetStarted} className="mt-10 w-full max-w-xs cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-8 bg-[var(--primary-color)] text-white text-lg font-semibold tracking-wide shadow-lg hover:brightness-90 transition-all duration-300">
            <span className="truncate">Get Started</span>
          </button>
        </main>
      </div>
    </div>
  );
};