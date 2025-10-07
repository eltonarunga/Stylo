import React, { useState, useEffect } from 'react';

const galleryOutfits = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAzf2LAFO9KZfGzW30r5EqGgD85dna3d04dvPD5wVdy7nzFvNOF2d9Sa0hXvAm69jyZFbCTt3TTPcYpiZFCJsdiBk3d9yXwJfWSdErCXtHgyZwm6fKfs83EJvkiVoMIiNsq7h0AFO0-mTMM7EpcHLdDmXOeif-Ie7u2sD_TC6yLr_3A8f5cYSLoK1UJEIYTa8cosuUO-HNXWrn34FCQBCkxvhA837tPiv75UZkNwBn9h6Q3Ush-NdU0O-IzyH6u9RBMSG6olwpDuF3k",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCEPssdHGlshrrQ22yJpg_VJV9t-g4Lv-8tKWiMMde-Wn9bNdQA7vDbm3VSEO-vsx5HFmKk689WffeV_0pYKcpl2jqsvkovCXmWFfLEoAhwlb16USWiar-FvgWM9opslVYKEThAaz6uH3QFZ_7Y4DPcJLQv10DqSyf_wQzEz-DLNa7sNk6Rx0zFpZ9WNoNT7npxbSoFFqJq6DDk5t_jwjORXKGH--L0O5qVZdUkWG2JG7MatkInLeeiEPbgAIGNycSKCfKkHPsaRdGE",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAqv7pszycW4OqxAvIu4J6rHN3dbXNHtfcPNuzU5haTG01JUnOZXh7qxu2CyvGRpNI0BGvFhm6m6tf6YxP6K-QGTUTWxEsvAk7HHhDoIPwS6WJ5_b3E4Rzyr6P-hSd3Rl9ojXMXyUE3qyzjKJe1h4FKAiH9-rcIDi9oOedYUAlnEsJ65ZW5v_T_aDUbPUccMZhmnYE6Y8kQOaxnPex9Hp8-Uu0qvAj2QgPVZMCry-wdSvJhSkobS9Imfc6FhXlkA-ZCoUhQK5aFCot4",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDOk_ii54Z8ocBMWxbwIY5s3hLCVrfYn1uDTF_OKfJL6MkTzA5Z2ppp2yu5DXzNJd5YJJpHFU_lW6I5s0OJdG-SajfkBn3bmjRSbNM68FuBJIFBE4Ox4q9h1Kl0r4sfKMrDfusoKx7SZNHDbhDGqTBgiu3jm8z_TC_vGAJiPywU5RaLkFx9MPcC12it18uh22swmps-04pRSU_2MRDzldWKQ5hkBEQ7a1pZ_VtqXrIUjU5oM9wsp7htpAfEcA3OHx_He1-0FuKWyIUo",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDDinjgc3FBxJyYGbtriOFQkioVr6XfGeIpp2Q_nbc4BoFVR1TFeDV3E9Vx34WCag4LRXuRCPf_JjurYckxSd65MDlPzAXaJ-rZCyvDBtLbvpe--jPJgOYKy_no_icSDB6PQJHphAC4OKm2o0WT8FZXnwS-nGjfWUyXbL97pN4IR6AnGrIqTbrZbvzopNhUffJkEWL8I2DSYDapXiNd9u38QyLUzZsmPyqkPO9_Uo2ck3lS0f6kzNc65XdQIPDkMT_w8vOxLt94z7jQ",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCW9MA2AQjPqobOP6MmpbZEyPvPw1PvFL4-quDaTcKcBNUDIg_4CMc5QiehKNrSWqQ-HqN1xsEYQjprH_aedr5Akke2x-EtJelmZCyG-Tb33tuhmoIW11lUtK3Z9CEW5VKOxvbL-WqtMkxQ2r3cyvuhCAAPPhaQYzcoQsB1fsLsGcTVdzrWVmJEdaIf4riGKpxrvaXbFYIE9yFDp-euAfctrcS9SergZ0450s5ufMz-ScViuZLnz8PB9MQ9kVadTNQSTsMGmrgYMnYR"
];

const OutfitCard: React.FC<{ 
    imageUrl: string; 
    isFavorited: boolean;
    onToggleFavorite: (imageUrl: string) => void;
}> = ({ imageUrl, isFavorited, onToggleFavorite }) => (
    <div className="group relative">
        <div 
            className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl" 
            style={{ backgroundImage: `url("${imageUrl}")` }}
        />
        <button 
            onClick={() => onToggleFavorite(imageUrl)} 
            className="absolute top-2 right-2 flex items-center justify-center w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full text-white transition-colors duration-300 transform active:scale-90"
            aria-label={isFavorited ? "Unsave outfit" : "Save outfit"}
        >
            <span 
                className="material-symbols-outlined text-2xl"
                style={{ 
                    fontVariationSettings: isFavorited ? "'FILL' 1" : "'FILL' 0",
                    color: isFavorited ? '#ef4444' /* red-500 */ : 'white'
                }}
            >
                favorite
            </span>
        </button>
    </div>
);


export const SavedOutfits: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'Discover' | 'Saved'>('Discover');
    const [favoritedOutfits, setFavoritedOutfits] = useState<string[]>([]);

    useEffect(() => {
        try {
            const saved = localStorage.getItem('stylo-saved-outfits');
            if (saved) {
                setFavoritedOutfits(JSON.parse(saved));
            }
        } catch (error) {
            console.error("Failed to parse saved outfits from localStorage", error);
            setFavoritedOutfits([]);
        }
    }, []);

    const handleToggleFavorite = (imageUrl: string) => {
        setFavoritedOutfits(prev => {
            const isFavorited = prev.includes(imageUrl);
            let newFavorites;
            if (isFavorited) {
                newFavorites = prev.filter(url => url !== imageUrl);
            } else {
                newFavorites = [...prev, imageUrl];
            }
            localStorage.setItem('stylo-saved-outfits', JSON.stringify(newFavorites));
            return newFavorites;
        });
    };

    const outfitsToDisplay = activeTab === 'Discover' ? galleryOutfits : favoritedOutfits;
    
    return (
        <div className="flex flex-col flex-1">
            <header className="sticky top-0 z-10 bg-[var(--background-color)]/80 backdrop-blur-sm w-full">
                <div className="flex items-center p-4 justify-between">
                    <div className="w-12"></div>
                    <h1 className="text-[var(--foreground-color)] text-xl font-bold leading-tight tracking-tighter flex-1 text-center">
                        My Outfits
                    </h1>
                    <div className="flex w-12 items-center justify-end"></div>
                </div>
                <div className="px-4 overflow-x-auto">
                    <div className="flex border-b border-[var(--border-color)] justify-center">
                        <a href="#" onClick={e => {e.preventDefault(); setActiveTab('Discover')}} className={`flex-shrink-0 px-4 py-3 text-center border-b-2 transition-colors duration-200 ${activeTab === 'Discover' ? 'border-[var(--primary-color)] text-[var(--primary-color)]' : 'border-transparent text-[var(--secondary-foreground-color)] hover:text-[var(--foreground-color)]'}`}>
                            <p className="text-sm font-semibold">Discover</p>
                        </a>
                        <a href="#" onClick={e => {e.preventDefault(); setActiveTab('Saved')}} className={`flex-shrink-0 px-4 py-3 text-center border-b-2 transition-colors duration-200 ${activeTab === 'Saved' ? 'border-[var(--primary-color)] text-[var(--primary-color)]' : 'border-transparent text-[var(--secondary-foreground-color)] hover:text-[var(--foreground-color)]'}`}>
                            <p className="text-sm font-semibold">Saved ({favoritedOutfits.length})</p>
                        </a>
                    </div>
                </div>
            </header>
            <main className="flex-1">
                 {outfitsToDisplay.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 p-4 animate-fadeIn">
                        {outfitsToDisplay.map((url, index) => (
                            <OutfitCard 
                                key={index} 
                                imageUrl={url} 
                                isFavorited={favoritedOutfits.includes(url)}
                                onToggleFavorite={handleToggleFavorite}
                            />
                        ))}
                    </div>
                ) : (
                     <div className="flex flex-col items-center justify-center text-center h-full p-8 text-[var(--secondary-foreground-color)]">
                         <span className="material-symbols-outlined text-6xl mb-4" style={{fontVariationSettings: "'FILL' 1"}}>favorite</span>
                         <h3 className="text-xl font-semibold text-[var(--foreground-color)]">No Saved Outfits Yet</h3>
                         <p className="mt-2 max-w-xs">Go to the 'Discover' tab and tap the heart icon on outfits you like to save them here.</p>
                     </div>
                )}
            </main>
        </div>
    );
};