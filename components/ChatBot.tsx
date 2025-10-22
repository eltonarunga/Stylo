import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import { getChatResponse } from '../services/geminiService';

export const ChatBot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'model', content: "Hi! I'm Stylo, your AI assistant. How can I help you with fashion or anything else today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (input.trim() === '' || isLoading) return;

        const newMessages: ChatMessage[] = [...messages, { role: 'user', content: input }];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {
            const response = await getChatResponse(newMessages);
            setMessages(prev => [...prev, { role: 'model', content: response }]);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Sorry, something went wrong.";
            setMessages(prev => [...prev, { role: 'model', content: errorMessage }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-20 right-4 z-20 w-16 h-16 bg-[var(--primary-color)] text-white rounded-full shadow-lg flex items-center justify-center transform transition-transform hover:scale-110"
                aria-label="Toggle Chatbot"
            >
                <span className="material-symbols-outlined text-3xl">{isOpen ? 'close' : 'chat'}</span>
            </button>
            {isOpen && (
                <div className="fixed bottom-40 right-4 z-20 w-full max-w-sm h-[60vh] bg-[var(--background-color)] rounded-xl shadow-2xl flex flex-col animate-fadeIn">
                    <header className="p-4 border-b border-[var(--border-color)]">
                        <h2 className="font-bold text-lg text-center text-[var(--foreground-color)]">Stylo AI Assistant</h2>
                    </header>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${msg.role === 'user' ? 'bg-[var(--primary-color)] text-white rounded-br-none' : 'bg-[var(--card-background-color)] text-[var(--foreground-color)] rounded-bl-none'}`}>
                                    <p className="text-sm">{msg.content}</p>
                                </div>
                            </div>
                        ))}
                         {isLoading && (
                            <div className="flex justify-start">
                                <div className="p-3 rounded-2xl bg-[var(--card-background-color)] rounded-bl-none">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="p-4 border-t border-[var(--border-color)] flex items-center gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask me anything..."
                            className="flex-1 p-2 rounded-lg bg-white border border-[var(--border-color)] focus:ring-2 focus:ring-[var(--primary-color)] focus:outline-none"
                            disabled={isLoading}
                        />
                        <button onClick={handleSend} disabled={isLoading || input.trim() === ''} className="p-2 bg-[var(--primary-color)] text-white rounded-lg disabled:bg-gray-400">
                            <span className="material-symbols-outlined">send</span>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
