import React from 'react';

const selectedItems = [
    { name: 'White Shirt', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiGK5jBBfw5ZxWuWB44lTgPn6Lpw69Gykv6ohvOZLVpodFAf-zqJtBSGup8vpn-XltUteRARJBBGENxcx3BRM45VqA5OdmGtOeCidO9EQy3EIa8673kHb3KK1dpamqbyiCb0XEdcn8xo8yiT3z9hi4lS9f7c_kUaHOM-wPs4CVmZTaBosJuW-siumGrE-Wz5ta9fx_Tx0a1kBAAbprlwHzBI672_V23K67VSNVFLuUIYO7THUS1oOjEHBSQ7lkL9uxwm79vey2uHTe' },
    { name: 'Black Pants', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqByhNpo2p9SWpnpma3fkeJw4hvm3_qs6VCPlreGwlR124aEtOTxkzpyenB3XmBMekZCs1tc2Tte9KZrNqUm1JB73q_hC9R2phnKTp8WXo1qKYCYHuEw7yweFVqpKzDu27YbF2Ij9A-3Rrn3EJWVhuKWAxXnfBsXQo7dUvJniqyvbszUdlJSeV7F4u9iMbJG0iOQZqD39mwxwhoaCbco0Z9WMBhPDNSf2gdTQlPOY2y4qQsDP6nlMEbiQwi5X9FIC3-ICVZ_9HIRyL' },
    { name: 'Black Shoes', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVojpFcQoWQJxlNY48q8zaCfeG0XbgCv7hEnTBqHka5sVsMd7d_H0fDTeh2buiN1K8bxddksTj_GLS3Ae5NuSgLgzAHXYysJItuPATszZXZelzjC6k1FZ4J-pMnTh8cuqDcOn0OgZSCplcoTRsvYuiOUih1VqD8Oz4vKks4xG-2Bk6oTxlY0qMZN84Km2rG2NV2R0C9Nl5QP2XeI2khTVZ82k41kWQDA7gXrQ8DTy08j1nRid9AOcQ7wTk1uUJXVo9768S_QillHxe' }
];

const SelectInput: React.FC<{ id: string, label: string, options: string[] }> = ({ id, label, options }) => (
    <div>
        <label className="block text-sm font-medium text-[var(--secondary-foreground-color)] mb-1" htmlFor={id}>{label}</label>
        <div className="relative">
            <select className="form-select w-full rounded-xl border-[var(--border-color)] bg-white py-3 pl-3 pr-10 text-base focus:border-[var(--primary-color)] focus:outline-none focus:ring-[var(--primary-color)]" id={id}>
                {options.map(opt => <option key={opt}>{opt}</option>)}
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">expand_more</span>
        </div>
    </div>
);

export const OutfitGenerator: React.FC = () => {
    return (
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
            <section className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Select Items</h2>
                    <button className="flex items-center gap-1 text-[var(--primary-color)] font-semibold">
                        <span>Add New</span>
                        <span className="material-symbols-outlined text-xl">add_circle_outline</span>
                    </button>
                </div>
                <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4">
                    {selectedItems.map(item => (
                        <div key={item.name} className="flex flex-col gap-2 rounded-lg w-40 flex-shrink-0 relative">
                            <div className="absolute top-2 right-2 bg-white/50 backdrop-blur-sm rounded-full p-1">
                                <span className="material-symbols-outlined text-[var(--primary-color)] text-2xl">check_circle</span>
                            </div>
                            <img alt={item.name} className="w-full h-40 object-cover rounded-xl" src={item.imageUrl} />
                            <p className="font-medium text-center">{item.name}</p>
                        </div>
                    ))}
                </div>
            </section>
            <section className="p-4">
                <h2 className="text-xl font-bold mb-4">Preferences</h2>
                <div className="space-y-4">
                    <SelectInput id="occasion" label="Occasion" options={['Casual', 'Formal', 'Sporty']} />
                    <SelectInput id="style" label="Style" options={['Modern', 'Vintage', 'Bohemian']} />
                    <SelectInput id="color" label="Color Palette" options={['Neutral', 'Colorful', 'Monochrome']} />
                </div>
            </section>
            <div className="p-4 mt-4">
                <button className="w-full h-14 px-5 bg-[var(--primary-color)] text-white text-lg font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-200 hover:brightness-95 active:brightness-90 transition-all">
                    <span className="material-symbols-outlined">auto_awesome</span>
                    <span>Generate Outfit</span>
                </button>
            </div>
        </main>
    );
};