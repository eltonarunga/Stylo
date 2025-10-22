import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";

if (!process.env.API_KEY) {
    console.error("CRITICAL: API_KEY environment variable not set on the server.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export default async function handler(req: Request): Promise<Response> {
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405, headers: { 'Content-Type': 'application/json', 'Allow': 'POST' } });
    }

    try {
        const body = await req.json();
        const { history } = body;

        if (!Array.isArray(history) || history.length === 0) {
            return new Response(JSON.stringify({ error: 'Invalid or empty chat history.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }

        const lastMessage = history[history.length - 1];
        if (lastMessage.role !== 'user') {
            return new Response(JSON.stringify({ error: 'Last message must be from the user.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }

        const chat: Chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            history: history.slice(0, -1).map((msg: ChatMessage) => ({
                role: msg.role,
                parts: [{ text: msg.content }],
            })),
            config: {
                systemInstruction: 'You are Stylo, a friendly and helpful AI fashion and style assistant. Keep your answers concise and helpful.',
            },
        });

        const response: GenerateContentResponse = await chat.sendMessage({ message: lastMessage.content });
        const chatResponse = response.text;

        if (chatResponse) {
            return new Response(JSON.stringify({ response: chatResponse }), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }

        const blockReason = response.promptFeedback?.blockReason;
        const errorMessage = blockReason 
            ? `Request blocked for safety reasons (${blockReason}).`
            : "The AI did not return a response.";
        return new Response(JSON.stringify({ error: errorMessage }), { status: 500, headers: { 'Content-Type': 'application/json' } });

    } catch (error) {
        console.error("Error in chat proxy:", error);
        return new Response(JSON.stringify({ error: "An unexpected server error occurred." }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
