import React, { useState } from 'react';
import { HeadshotStylizer } from './HeadshotStylizer';
import { OutfitGenerator } from './OutfitGenerator';
import { ImageEditor } from './ImageEditor';
import { ImageCreator } from './ImageCreator';
import { VideoAnimator } from './VideoAnimator';
import { ImageAnalyzer } from './ImageAnalyzer';

const GENERATORS = [
    { key: 'stylizer', name: 'Stylizer', icon: 'auto_awesome', component: HeadshotStylizer },
    { key: 'outfit', name: 'Outfit', icon: 'styler', component: OutfitGenerator },
    { key: 'editor', name: 'Editor', icon: 'edit', component: ImageEditor },
    { key: 'creator', name: 'Creator', icon: 'brush', component: ImageCreator },
    { key: 'animator', name: 'Animator', icon: 'movie', component: VideoAnimator },
    { key: 'analyzer', name: 'Analyzer', icon: 'visibility', component: ImageAnalyzer },
];

export const GeneratorView: React.FC = () => {
    const [activeGeneratorKey, setActiveGeneratorKey] = useState<string>(GENERATORS[0].key);

    const activeGenerator = GENERATORS.find(g => g.key === activeGeneratorKey) || GENERATORS[0];
    const ActiveComponent = activeGenerator.component;

    return (
        <div className="flex flex-col items-center">
            <header className="sticky top-0 z-10 bg-[var(--background-color)]/80 backdrop-blur-sm w-full">
                <div className="flex items-center p-4 justify-between">
                    <div className="w-12"></div>
                    <h1 className="text-[var(--foreground-color)] text-xl font-bold leading-tight tracking-tighter flex-1 text-center">
                        AI Generator Studio
                    </h1>
                    <div className="flex w-12 items-center justify-end"></div>
                </div>
                <div className="px-4 overflow-x-auto">
                    <div className="flex border-b border-[var(--border-color)] justify-start">
                        {GENERATORS.map(gen => (
                             <a 
                                href="#" 
                                key={gen.key}
                                onClick={e => {e.preventDefault(); setActiveGeneratorKey(gen.key)}} 
                                className={`flex-shrink-0 px-4 py-3 text-center border-b-2 transition-colors duration-200 flex items-center gap-2 ${activeGeneratorKey === gen.key ? 'border-[var(--primary-color)] text-[var(--primary-color)]' : 'border-transparent text-[var(--secondary-foreground-color)] hover:text-[var(--foreground-color)]'}`}
                            >
                                <span className="material-symbols-outlined text-xl">{gen.icon}</span>
                                <p className="text-sm font-semibold">{gen.name}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </header>
            
            <div className="w-full">
                <ActiveComponent />
            </div>
        </div>
    );
};
