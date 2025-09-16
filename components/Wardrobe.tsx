import React, { useState, useRef } from 'react';

const initialWardrobeImages = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA5lLdPcbh1ZoUx3VeqrP4Us_3RwzuBmCdjb7pI3O2RMUCTsjnhpP1lvshZeqrAUyb0Cd1GgBGuUYlswIuyNRSH6wWnkqDqOQLH5zrDJUs3q9Y_lBepPsN-4sxoxUeDlXjOIA5XuRL_F5XBe2bwj-6udkTs8JouDkni1zb6PTDJuuBMGXGMK7QLNH3usnyjnIncgtkUvBAvxVxrXM2cffw5lbMqSQkiHcjKynct5Eh863pLQK14hmjzU8E0F5K_p4jtHohH2uQs3TRp",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDPWRbDBbuhOQdbov3fpK8DPa1mgfNA9d4gYoma7bncTNKZOQg_PaaSrID_lCyv_BunZ20K-TQcKC9m6DqF2KWHrctzLLx2n20uJiGa6tul9Z115jAknjIkrcEd9DLnd7aU3CSqX_5w9CtRoETVZfn7y80t27W9gHtfCCtry_NKuJFZAlNE8qkt_LXxPw8-ODpgg7nDCjKY3AW8azsXAhSMIv1aHQIzsW2LLG9UNFzcirRQAhRQIiZhWIqbaPFHTQfX5_J0E3cAluwp",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDOeBg6lA7UmltheNc5w4KpwugVnXRrDVRfLfy3E8nI85ROhM1ofoqp22ExpR1iGOgjWGtcx0kjaRNY3mQWla9CugKw-4v1W2s3UGe37cbVawngaz7U5HYZnBW5RrU5ev7fgjatVzidOIzMxAerEe433RhWo-R7DZ-1OUG73FhtlXXS9zb5JSjjbZSz4PrGeqvzpm6JxHrN_NmBr8eoDD4twXYBdLqddANIsnWoXyrHg2N0aw0mQl8ID6gxVaALJYzBNvVpDcBPucWb",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAfOMXWaxzwaG4ivYl49Kst-Lxu9c8bGmHUavl8SjsiJV5Oz1ldO00vKSrb3U5KW4920GXLRUdGBM19gxUuk9UI5p8UFNhOxZWfCpdv8NsGkeq3hKsMe-sqPMlbJc0LQ5fvSuJRwB-XqWAfGUfUMlqEkLuK4gBmlfhMqJ9lmxxxM0RfWLfOqZgavEbXexyQxDM2dJoVUA5GLzlLpjCuI_1AIgKOdBY9Gw7oLOfjJRuCa1Htdp3f8knlIll9DUzJmOsUrhn_EgcELDVR",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA6L_ZyWnkuzYPQ_ckEYuBA4KLvByjJtk42b7V462oXfxROLBSXSbrJnRC1WnoHi221TjMsmrvHy-ys69-oRYexD59qyJwaBvzDrh83Dnxq-k0kBgAmFZbgKhqMi7Xvz4eM7iRziEKuxQvkTsjWB8guU32-5vsN4uUyKoFfpejTJUSxk26xDZ_76TG7OnB0oHckiVEISjx-VTEFlFExcdt5MysmuN5l-FofFXLl_gSj83KBcicojD0s1XnkoPOmeTrHBOc98ztSyBmT",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBfr1JgtIlXSqkipBSP3-ZYL95CfHetzkHe6rGpH7jxDoZvUx6qOfjSwyEsMcDTegcBMmdPa-9la0W0XFIXMoxuIv0b6wuhiHA9z_Vc2ZWjpj5WaE2DpwXOqy1P8svfCqX5f2WTlRbz7rpqdrOxMaZbnXS3TWIfN--3qWHDM_UoPAZn7IgwpFKAJ9kMNMZk3wA2XSPXrntzaj971Acnembg0jrdVoInT_ZE9C9vhBhVpjZ3q2YyfRytkADEn2XzXfsuJvsym9uYkzu_"
];

export const Wardrobe: React.FC = () => {
    const [activeTab, setActiveTab] = useState('All');
    const [wardrobeImages, setWardrobeImages] = useState(initialWardrobeImages);
    const tabs = ['All', 'Tops', 'Bottoms', 'Dresses', 'Accessories', 'Shoes'];
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAddClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result;
                if (typeof result === 'string') {
                    setWardrobeImages(prevImages => [result, ...prevImages]);
                }
            };
            reader.readAsDataURL(file);
        }
        // Reset file input value to allow uploading the same file again
        if(event.target) {
            event.target.value = '';
        }
    };

    return (
        <div className="flex-grow">
            <header className="sticky top-0 z-10 bg-[var(--background-color)]/80 backdrop-blur-sm">
                <div className="flex items-center p-4 pb-2 justify-between">
                    <div className="w-12"></div>
                    <h1 className="text-[var(--foreground-color)] text-xl font-bold leading-tight tracking-tighter flex-1 text-center">Wardrobe</h1>
                    <div className="flex w-12 items-center justify-end">
                        <button onClick={handleAddClick} className="flex items-center justify-center rounded-full h-10 w-10 bg-transparent text-[var(--foreground-color)] hover:bg-gray-100 active:bg-gray-200">
                            <span className="material-symbols-outlined">add</span>
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                            aria-hidden="true"
                        />
                    </div>
                </div>
                <div className="px-4 overflow-x-auto">
                    <div className="flex border-b border-[var(--border-color)]">
                        {tabs.map(tab => (
                            <a
                                key={tab}
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveTab(tab);
                                }}
                                className={`flex-shrink-0 px-4 py-3 text-center border-b-2 ${
                                    activeTab === tab 
                                    ? 'border-[var(--primary-color)] text-[var(--primary-color)]' 
                                    : 'border-transparent text-[var(--secondary-foreground-color)] hover:text-[var(--foreground-color)]'
                                }`}
                            >
                                <p className="text-sm font-semibold">{tab}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </header>
            <main className="p-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {wardrobeImages.map((imageUrl, index) => (
                        <div key={index} className="group relative aspect-square overflow-hidden rounded-xl">
                            <div className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-300 group-hover:scale-105" style={{ backgroundImage: `url("${imageUrl}")` }}></div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};
