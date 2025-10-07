import React, { useState } from 'react';

interface SignUpScreenProps {
  onSignUp: (name: string, email: string, pass: string) => Promise<void>;
  onSwitchToSignIn: () => void;
  error: string | null;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({ onSignUp, onSwitchToSignIn, error }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await onSignUp(name, email, password);
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
                
                <h2 className="text-2xl font-bold text-center text-[var(--foreground-color)] mb-2">Create an Account</h2>
                <p className="text-center text-[var(--secondary-foreground-color)] mb-8">Start your AI style journey today.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="sr-only">Full Name</label>
                        <input 
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Full Name"
                            required
                            className="w-full p-3 rounded-lg bg-[var(--card-background-color)] border border-[var(--border-color)] focus:ring-2 focus:ring-[var(--primary-color)] focus:outline-none transition-shadow"
                        />
                    </div>
                    <div>
                        <label htmlFor="email-signup" className="sr-only">Email</label>
                        <input 
                            id="email-signup"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email address"
                            required
                            className="w-full p-3 rounded-lg bg-[var(--card-background-color)] border border-[var(--border-color)] focus:ring-2 focus:ring-[var(--primary-color)] focus:outline-none transition-shadow"
                        />
                    </div>
                    <div>
                        <label htmlFor="password-signup" className="sr-only">Password</label>
                        <input
                            id="password-signup" 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            minLength={8}
                            className="w-full p-3 rounded-lg bg-[var(--card-background-color)] border border-[var(--border-color)] focus:ring-2 focus:ring-[var(--primary-color)] focus:outline-none transition-shadow"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex items-center justify-center h-12 px-6 bg-[var(--primary-color)] text-white text-lg font-semibold rounded-lg shadow-lg hover:brightness-90 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed">
                        {isLoading ? (
                            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
                        ) : (
                           'Sign Up'
                        )}
                    </button>
                </form>
                
                <p className="mt-8 text-center text-sm text-[var(--secondary-foreground-color)]">
                    Already have an account? <button onClick={onSwitchToSignIn} className="font-medium text-[var(--primary-color)] hover:underline">Sign in</button>
                </p>
            </div>
        </div>
    );
};