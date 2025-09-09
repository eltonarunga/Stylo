
import React, { useState, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Wardrobe } from './components/Wardrobe';
import { GeneratorView } from './components/GeneratorView';
import { SavedOutfits } from './components/SavedOutfits';
import { Profile } from './components/Profile';

type View = 'welcome' | 'wardrobe' | 'generator' | 'saved' | 'profile';

const App: React.FC = () => {
    const [view, setView] = useState<View>('welcome');
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (storedTheme === 'dark' || (!storedTheme && systemPrefersDark)) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }, []);
    
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [theme]);

    const handleGetStarted = () => {
        setView('generator');
    };

    const renderView = () => {
        switch (view) {
            case 'wardrobe':
                return <Wardrobe />;
            case 'generator':
                return <GeneratorView />;
            case 'saved':
                return <SavedOutfits />;
            case 'profile':
                return <Profile />;
            default:
                return <WelcomeScreen onGetStarted={handleGetStarted} />;
        }
    };

    if (view === 'welcome') {
        return <WelcomeScreen onGetStarted={handleGetStarted} />;
    }

    return (
        <div className="flex flex-col h-screen bg-[var(--background-color)] text-[var(--foreground-color)]">
            <div className="flex-grow overflow-y-auto">
                {renderView()}
            </div>
            <nav className="sticky bottom-0 z-10 bg-[var(--background-color)]/80 backdrop-blur-sm border-t border-[var(--border-color)]">
                <div className="flex justify-around items-center h-16">
                    <button onClick={() => setView('wardrobe')} className={`flex flex-col items-center justify-center w-full h-full ${view === 'wardrobe' ? 'text-[var(--primary-color)]' : 'text-[var(--secondary-foreground-color)]'}`}>
                        <span className="material-symbols-outlined">checkroom</span>
                        <span className="text-xs font-medium">Wardrobe</span>
                    </button>
                    <button onClick={() => setView('generator')} className={`flex flex-col items-center justify-center w-full h-full ${view === 'generator' ? 'text-[var(--primary-color)]' : 'text-[var(--secondary-foreground-color)]'}`}>
                        <span className="material-symbols-outlined">auto_awesome</span>
                        <span className="text-xs font-medium">Generator</span>
                    </button>
                    <button onClick={() => setView('saved')} className={`flex flex-col items-center justify-center w-full h-full ${view === 'saved' ? 'text-[var(--primary-color)]' : 'text-[var(--secondary-foreground-color)]'}`}>
                        <span className="material-symbols-outlined">favorite</span>
                        <span className="text-xs font-medium">Saved</span>
                    </button>
                    <button onClick={() => setView('profile')} className={`flex flex-col items-center justify-center w-full h-full ${view === 'profile' ? 'text-[var(--primary-color)]' : 'text-[var(--secondary-foreground-color)]'}`}>
                        <span className="material-symbols-outlined">person</span>
                        <span className="text-xs font-medium">Profile</span>
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default App;
