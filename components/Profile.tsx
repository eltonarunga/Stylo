import React, { useState, useEffect } from 'react';
import { ThemeToggle } from './ThemeToggle';

interface ProfileProps {
    user: {
        name: string;
        email: string;
        isGuest: boolean;
    };
    onSignOut: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, onSignOut }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        setTheme(storedTheme as 'light' | 'dark');
    }, []);

    const toggleTheme = () => {
        setTheme(prevTheme => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            if (newTheme === 'dark') {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
            return newTheme;
        });
    };
  
    return (
        <div className="p-4 sm:p-6 md:p-8">
            <header className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-[var(--foreground-color)]">Profile</h1>
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </header>
            <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-gray-300 dark:bg-gray-700 mb-4 flex items-center justify-center overflow-hidden">
                    {user.isGuest ? (
                        <span className="material-symbols-outlined text-6xl text-gray-500">person</span>
                    ) : (
                        <img src="https://lh3.googleusercontent.com/a/ACg8ocL8H-wS92C2v4gZ2ymw8zBEPBR4682EIe2i_50t4_vE=s96-c" alt="User Avatar" className="w-full h-full object-cover" />
                    )}
                </div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-[var(--secondary-foreground-color)]">{user.email}</p>

                <div className="w-full max-w-md mt-10 space-y-4">
                    {!user.isGuest && (
                        <>
                            <button className="w-full text-left p-4 bg-[var(--card-background-color)] rounded-lg hover:bg-[var(--hover-background-color)] transition-colors">
                                Account Settings
                            </button>
                            <button className="w-full text-left p-4 bg-[var(--card-background-color)] rounded-lg hover:bg-[var(--hover-background-color)] transition-colors">
                                Subscription
                            </button>
                        </>
                    )}
                    <button className="w-full text-left p-4 bg-[var(--card-background-color)] rounded-lg hover:bg-[var(--hover-background-color)] transition-colors">
                        Help & Support
                    </button>
                    <button onClick={onSignOut} className="w-full text-left p-4 text-red-500 bg-[var(--card-background-color)] rounded-lg hover:bg-[var(--hover-background-color)] transition-colors font-medium">
                        {user.isGuest ? 'End Guest Session' : 'Log Out'}
                    </button>
                </div>
            </div>
        </div>
    );
};