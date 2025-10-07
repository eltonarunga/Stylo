import React, { useState, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Wardrobe } from './components/Wardrobe';
import { GeneratorView } from './components/GeneratorView';
import { SavedOutfits } from './components/SavedOutfits';
import { Profile } from './components/Profile';
import { SignInScreen } from './components/SignInScreen';
import { SignUpScreen } from './components/SignUpScreen';
import { signIn, signUp } from './services/authService';

type View = 'welcome' | 'wardrobe' | 'generator' | 'saved' | 'profile';
type AuthView = 'signIn' | 'signUp';
type User = { name: string; email: string; isGuest: boolean; };

const App: React.FC = () => {
    const [view, setView] = useState<View>('welcome');
    const [authView, setAuthView] = useState<AuthView>('signIn');
    const [user, setUser] = useState<User | null>(null);
    const [authError, setAuthError] = useState<string | null>(null);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const token = localStorage.getItem('stylo-auth-token');
        const sessionType = localStorage.getItem('stylo-session-type');

        if (token && sessionType === 'user') {
            // In a real app, you'd verify the token and fetch user details
            setUser({ name: 'Alex Doe', email: 'user@stylo.com', isGuest: false });
            setView('generator'); 
        } else if (sessionType === 'guest') {
            setUser({ name: 'Guest User', email: 'Explore the app', isGuest: true });
            setView('generator');
        }

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

    const handleSignIn = async (email: string, pass: string) => {
        setAuthError(null);
        const result = await signIn(email, pass);
        if (result.success) {
            localStorage.setItem('stylo-auth-token', 'mock-jwt-token');
            localStorage.setItem('stylo-session-type', 'user');
            setUser({ name: 'Alex Doe', email, isGuest: false });
            setView('welcome');
        } else {
            setAuthError(result.message);
        }
    };

    const handleSignUp = async (name: string, email: string, pass: string) => {
        setAuthError(null);
        const result = await signUp(name, email, pass);
        if (result.success) {
            localStorage.setItem('stylo-auth-token', 'mock-jwt-token');
            localStorage.setItem('stylo-session-type', 'user');
            setUser({ name, email, isGuest: false });
            setView('welcome');
        } else {
            setAuthError(result.message);
        }
    };

    const handleGuestSignIn = () => {
        setAuthError(null);
        localStorage.setItem('stylo-session-type', 'guest');
        setUser({ name: 'Guest User', email: 'Explore the app', isGuest: true });
        setView('generator');
    };
    
    const handleSignOut = () => {
        localStorage.removeItem('stylo-auth-token');
        localStorage.removeItem('stylo-session-type');
        setUser(null);
        setAuthError(null);
        setAuthView('signIn');
    };

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
                return user ? <Profile user={user} onSignOut={handleSignOut} /> : null;
            default:
                return <GeneratorView />;
        }
    };

    if (!user) {
        if (authView === 'signUp') {
            return <SignUpScreen onSignUp={handleSignUp} onSwitchToSignIn={() => setAuthView('signIn')} error={authError} />;
        }
        return <SignInScreen onSignIn={handleSignIn} onSwitchToSignUp={() => setAuthView('signUp')} onGuestSignIn={handleGuestSignIn} error={authError} />;
    }

    if (view === 'welcome' && !user.isGuest) {
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