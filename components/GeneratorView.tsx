import React, { useState } from 'react';
import { HeadshotStylizer } from './HeadshotStylizer';
import { OutfitGenerator } from './OutfitGenerator';

type ActiveGenerator = 'stylizer' | 'outfit';

export const GeneratorView: React.FC = () => {
    const [activeGenerator, setActiveGenerator] = useState<ActiveGenerator>('stylizer');

    return (
        <div className="flex flex-col items-center">
            <header className="sticky top-0 z-10 bg-[var(--background-color)]/80 backdrop-blur-sm w-full">
                <div className="flex items-center p-4 justify-between">
                    <div className="w-12"></div>
                    <h1 className="text-[var(--foreground-color)] text-xl font-bold leading-tight tracking-tighter flex-1 text-center">
                        {activeGenerator === 'stylizer' ? 'AI Headshot Stylizer' : 'AI Outfit Generator'}
                    </h1>
                    <div className="flex w-12 items-center justify-end"></div>
                </div>
                <div className="px-4 overflow-x-auto">
                    <div className="flex border-b border-[var(--border-color)] justify-center">
                        <a href="#" onClick={e => {e.preventDefault(); setActiveGenerator('stylizer')}} className={`flex-shrink-0 px-4 py-3 text-center border-b-2 transition-colors duration-200 ${activeGenerator === 'stylizer' ? 'border-[var(--primary-color)] text-[var(--primary-color)]' : 'border-transparent text-[var(--secondary-foreground-color)] hover:text-[var(--foreground-color)]'}`}>
                            <p className="text-sm font-semibold">Stylizer</p>
                        </a>
                        <a href="#" onClick={e => {e.preventDefault(); setActiveGenerator('outfit')}} className={`flex-shrink-0 px-4 py-3 text-center border-b-2 transition-colors duration-200 ${activeGenerator === 'outfit' ? 'border-[var(--primary-color)] text-[var(--primary-color)]' : 'border-transparent text-[var(--secondary-foreground-color)] hover:text-[var(--foreground-color)]'}`}>
                            <p className="text-sm font-semibold">Outfit</p>
                        </a>
                    </div>
                </div>
            </header>
            
            <div className="w-full">
                {activeGenerator === 'stylizer' ? <HeadshotStylizer /> : <OutfitGenerator />}
            </div>
        </div>
    );
};
