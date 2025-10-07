import React, { useState } from 'react';
import { sendPasswordResetEmail } from '../services/authService';

interface SignInScreenProps {
  onSignIn: (email: string, pass: string) => Promise<void>;
  onSwitchToSignUp: () => void;
  onGuestSignIn: () => void;
  error: string | null;
}

// Simple placeholder icons
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M21.999 12.215c0-.79-.07-1.55-.2-2.285h-9.799v4.36h5.62c-.24 1.48-1.06 2.75-2.4 3.66v2.8h3.59c2.1-1.92 3.31-4.78 3.31-8.54z"/>
    <path fill="#34A853" d="M12 22c2.7 0 4.96-.89 6.62-2.41l-3.59-2.8c-.9.6-2.07.97-3.43.97-2.64 0-4.88-1.77-5.68-4.15H2.9v2.89c1.7 3.36 5.17 5.7 9.1 5.7z"/>
    <path fill="#FBBC05" d="M6.32 13.74c-.2-.6-.32-1.25-.32-1.94s.12-1.34.32-1.94V7.05H2.9C2.32 8.24 2 9.57 2 11.8c0 2.23.32 3.56.9 4.75l3.42-2.81z"/>
    <path fill="#EA4335" d="M12 6.13c1.47 0 2.78.51 3.82 1.49l3.11-3.11C16.96 2.68 14.7 1.8 12 1.8c-3.93 0-7.4 2.34-9.1 5.7l3.42 2.81c.8-2.38 3.04-4.15 5.68-4.15z"/>
  </svg>
);
const AppleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path fill="currentColor" d="M15.22 6.09c.32-.42.6-.84.81-1.25a.4.4 0 00-.51-.51c-.42.21-.84.42-1.25.63-.84.42-1.68.63-2.52.63s-1.68-.21-2.52-.63a13.3 13.3 0 00-1.25-.63.4.4 0 00-.51.51c.21.42.5.84.81 1.25.63.84 1.25 1.68 1.25 2.72S11.13 10.5 10.5 11.33c-.63.84-.84 1.25-.84 2.1s.42 1.47.84 1.89c.42.42 1.05.84 1.89.84s1.47-.42 1.89-.84c.42-.42.84-1.05.84-1.89s-.21-1.25-.84-2.1c-.63-.84-1.25-1.68-1.25-2.72s.62-1.88 1.25-2.72m-3.35-4.19c.84 0 1.68.21 2.31.63a.4.4 0 01.1.51c-.21.42-.42.84-.63 1.25-.42.42-.84.84-1.25 1.05-.21.21-.63.21-.84 0-.42-.21-.84-.63-1.25-1.05-.21-.42-.42-.84-.63-1.25a.4.4 0 01.1-.51c.63-.42 1.47-.63 2.31-.63"/>
    </svg>
);


export const SignInScreen: React.FC<SignInScreenProps> = ({ onSignIn, onSwitchToSignUp, onGuestSignIn, error }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [view, setView] = useState<'signIn' | 'forgotPassword'>('signIn');
    const [resetEmail, setResetEmail] = useState('');
    const [resetMessage, setResetMessage] = useState<string | null>(null);


    const handleSignInSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await onSignIn(email, password);
        setIsLoading(false);
    };

    const handlePasswordResetSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setResetMessage(null);
        const result = await sendPasswordResetEmail(resetEmail);
        setResetMessage(result.message);
        setIsLoading(false);
    };

    return (
        <div className="flex size-full min-h-screen flex-col justify-center items-center p-4 bg-[var(--background-color)] animate-fadeIn">
            <div className="w-full max-w-sm">
                <header className="flex items-center justify-center p-4 mb-6">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-4xl text-[var(--primary-color)]">styler</span>
                        <h1 className="font-serif text-3xl font-bold text-[var(--primary-color)]">Stylo</h1>
                    </div>
                </header>

                {view === 'signIn' ? (
                    <>
                        <h2 className="text-2xl font-bold text-center text-[var(--foreground-color)] mb-2">Welcome Back</h2>
                        <p className="text-center text-[var(--secondary-foreground-color)] mb-8">Sign in to continue to your AI stylist.</p>

                        <form onSubmit={handleSignInSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="email" className="sr-only">Email</label>
                                <input 
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email address"
                                    required
                                    className="w-full p-3 rounded-lg bg-[var(--card-background-color)] border border-[var(--border-color)] focus:ring-2 focus:ring-[var(--primary-color)] focus:outline-none transition-shadow"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input
                                    id="password" 
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    required
                                    className="w-full p-3 rounded-lg bg-[var(--card-background-color)] border border-[var(--border-color)] focus:ring-2 focus:ring-[var(--primary-color)] focus:outline-none transition-shadow"
                                />
                            </div>

                            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                            <div className="flex items-center justify-end">
                                <button type="button" onClick={() => setView('forgotPassword')} className="text-sm font-medium text-[var(--primary-color)] hover:underline">Forgot password?</button>
                            </div>
                            
                            <button 
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex items-center justify-center h-12 px-6 bg-[var(--primary-color)] text-white text-lg font-semibold rounded-lg shadow-lg hover:brightness-90 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed">
                                {isLoading ? (
                                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
                                ) : (
                                'Sign In'
                                )}
                            </button>
                        </form>

                        <div className="mt-4">
                            <button
                                onClick={onGuestSignIn}
                                className="w-full flex items-center justify-center h-12 px-6 bg-transparent text-[var(--primary-color)] font-medium rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                                Continue as Guest
                            </button>
                        </div>
                        

                        <div className="my-6 flex items-center">
                            <div className="flex-grow border-t border-[var(--border-color)]"></div>
                            <span className="flex-shrink mx-4 text-sm text-[var(--secondary-foreground-color)]">OR</span>
                            <div className="flex-grow border-t border-[var(--border-color)]"></div>
                        </div>

                        <div className="space-y-3">
                            <button className="w-full flex items-center justify-center gap-3 h-12 px-6 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                                <GoogleIcon />
                                Continue with Google
                            </button>
                            <button className="w-full flex items-center justify-center gap-3 h-12 px-6 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors">
                                <AppleIcon />
                                Continue with Apple
                            </button>
                        </div>
                        
                        <p className="mt-8 text-center text-sm text-[var(--secondary-foreground-color)]">
                            Don't have an account? <button onClick={onSwitchToSignUp} className="font-medium text-[var(--primary-color)] hover:underline">Sign up</button>
                        </p>
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold text-center text-[var(--foreground-color)] mb-2">Reset Password</h2>
                        <p className="text-center text-[var(--secondary-foreground-color)] mb-8">Enter your email to receive a password reset link.</p>

                        {resetMessage ? (
                             <div className="p-4 text-center text-green-700 bg-green-100 rounded-lg">
                                <p>{resetMessage}</p>
                             </div>
                        ) : (
                            <form onSubmit={handlePasswordResetSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="reset-email" className="sr-only">Email</label>
                                    <input 
                                        id="reset-email"
                                        type="email"
                                        value={resetEmail}
                                        onChange={(e) => setResetEmail(e.target.value)}
                                        placeholder="Email address"
                                        required
                                        className="w-full p-3 rounded-lg bg-[var(--card-background-color)] border border-[var(--border-color)] focus:ring-2 focus:ring-[var(--primary-color)] focus:outline-none transition-shadow"
                                    />
                                </div>
                                <button 
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full flex items-center justify-center h-12 px-6 bg-[var(--primary-color)] text-white text-lg font-semibold rounded-lg shadow-lg hover:brightness-90 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed">
                                    {isLoading ? (
                                        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
                                    ) : (
                                    'Send Reset Link'
                                    )}
                                </button>
                            </form>
                        )}
                        
                        <p className="mt-8 text-center text-sm">
                           <button onClick={() => { setView('signIn'); setResetMessage(null); }} className="font-medium text-[var(--primary-color)] hover:underline">Back to Sign In</button>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};