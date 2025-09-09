import React from 'react';

const savedOutfits = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAzf2LAFO9KZfGzW30r5EqGgD85dna3d04dvPD5wVdy7nzFvNOF2d9Sa0hXvAm69jyZFbCTt3TTPcYpiZFCJsdiBk3d9yXwJfWSdErCXtHgyZwm6fKfs83EJvkiVoMIiNsq7h0AFO0-mTMM7EpcHLdDmXOeif-Ie7u2sD_TC6yLr_3A8f5cYSLoK1UJEIYTa8cosuUO-HNXWrn34FCQBCkxvhA837tPiv75UZkNwBn9h6Q3Ush-NdU0O-IzyH6u9RBMSG6olwpDuF3k",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCEPssdHGlshrrQ22yJpg_VJV9t-g4Lv-8tKWiMMde-Wn9bNdQA7vDbm3VSEO-vsx5HFmKk689WffeV_0pYKcpl2jqsvkovCXmWFfLEoAhwlb16USWiar-FvgWM9opslVYKEThAaz6uH3QFZ_7Y4DPcJLQv10DqSyf_wQzEz-DLNa7sNk6Rx0zFpZ9WNoNT7npxbSoFFqJq6DDk5t_jwjORXKGH--L0O5qVZdUkWG2JG7MatkInLeeiEPbgAIGNycSKCfKkHPsaRdGE",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAqv7pszycW4OqxAvIu4J6rHN3dbXNHtfcPNuzU5haTG01JUnOZXh7qxu2CyvGRpNI0BGvFhm6m6tf6YxP6K-QGTUTWxEsvAk7HHhDoIPwS6WJ5_b3E4Rzyr6P-hSd3Rl9ojXMXyUE3qyzjKJe1h4FKAiH9-rcIDi9oOedYUAlnEsJ65ZW5v_T_aDUbPUccMZhmnYE6Y8kQOaxnPex9Hp8-Uu0qvAj2QgPVZMCry-wdSvJhSkobS9Imfc6FhXlkA-ZCoUhQK5aFCot4",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDOk_ii54Z8ocBMWxbwIY5s3hLCVrfYn1uDTF_OKfJL6MkTzA5Z2ppp2yu5DXzNJd5YJJpHFU_lW6I5s0OJdG-SajfkBn3bmjRSbNM68FuBJIFBE4Ox4q9h1Kl0r4sfKMrDfusoKx7SZNHDbhDGqTBgiu3jm8z_TC_vGAJiPywU5RaLkFx9MPcC12it18uh22swmps-04pRSU_2MRDzldWKQ5hkBEQ7a1pZ_VtqXrIUjU5oM9wsp7htpAfEcA3OHx_He1-0FuKWyIUo",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDDinjgc3FBxJyYGbtriOFQkioVr6XfGeIpp2Q_nbc4BoFVR1TFeDV3E9Vx34WCag4LRXuRCPf_JjurYckxSd65MDlPzAXaJ-rZCyvDBtLbvpe--jPJgOYKy_no_icSDB6PQJHphAC4OKm2o0WT8FZXnwS-nGjfWUyXbL97pN4IR6AnGrIqTbrZbvzopNhUffJkEWL8I2DSYDapXiNd9u38QyLUzZsmPyqkPO9_Uo2ck3lS0f6kzNc65XdQIPDkMT_w8vOxLt94z7jQ",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCW9MA2AQjPqobOP6MmpbZEyPvPw1PvFL4-quDaTcKcBNUDIg_4CMc5QiehKNrSWqQ-HqN1xsEYQjprH_aedr5Akke2x-EtJelmZCyG-Tb33tuhmoIW11lUtK3Z9CEW5VKOxvbL-WqtMkxQ2r3cyvuhCAAPPhaQYzcoQsB1fsLsGcTVdzrWVmJEdaIf4riGKpxrvaXbFYIE9yFDp-euAfctrcS9SergZ0450s5ufMz-ScViuZLnz8PB9MQ9kVadTNQSTsMGmrgYMnYR"
];

const OutfitCard: React.FC<{ imageUrl: string }> = ({ imageUrl }) => (
    <div className="group relative">
        <div 
            className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl" 
            style={{ backgroundImage: `url("${imageUrl}")` }}
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-end p-2">
            <div className="flex items-center justify-between w-full">
                <button className="text-white">
                    <span className="material-symbols-outlined text-2xl">favorite</span>
                </button>
                <button className="text-white">
                    <span className="material-symbols-outlined text-2xl">more_horiz</span>
                </button>
            </div>
        </div>
    </div>
);


export const SavedOutfits: React.FC = () => {
    return (
        <div className="flex flex-col flex-1">
            <header className="sticky top-0 z-10 flex items-center bg-[var(--background-color)]/80 backdrop-blur-sm px-4 py-3 justify-between">
                <button className="flex size-10 shrink-0 items-center justify-center rounded-full text-[var(--foreground-color)]">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="text-[var(--foreground-color)] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Saved Outfits</h1>
                <button className="flex size-10 shrink-0 items-center justify-center rounded-full text-[var(--foreground-color)]">
                    <span className="material-symbols-outlined">search</span>
                </button>
            </header>
            <main className="flex-1">
                <div className="grid grid-cols-2 gap-4 p-4">
                    {savedOutfits.map((url, index) => (
                        <OutfitCard key={index} imageUrl={url} />
                    ))}
                </div>
            </main>
        </div>
    );
};