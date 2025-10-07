// This is a mock 'forgot password' endpoint.
// In a real application, this would generate a secure, single-use token,
// store it in the database with an expiry date, and send a reset link to the user's email.

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req: Request): Promise<Response> {
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ message: 'Method Not Allowed' }), { 
            status: 405, 
            headers: { 'Content-Type': 'application/json', 'Allow': 'POST' } 
        });
    }

    try {
        const { email } = await req.json();

        // --- Input Validation ---
        if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
             return new Response(JSON.stringify({ message: 'A valid email is required.' }), { 
                status: 400, 
                headers: { 'Content-Type': 'application/json' } 
            });
        }
        
        // --- Mock Logic ---
        // In a real app, you would look up the user by email and send them a reset link.
        // For security, we ALWAYS return a success message, even if the email doesn't exist.
        // This prevents attackers from figuring out which emails are registered.
        console.log(`Password reset requested for: ${email}. If this user exists, a reset email would be sent.`);

        return new Response(JSON.stringify({ 
            message: 'If an account with that email exists, a password reset link has been sent.',
        }), { 
            status: 200, 
            headers: { 'Content-Type': 'application/json' } 
        });

    } catch (error) {
        console.error("Forgot password error:", error);
        return new Response(JSON.stringify({ message: 'An internal server error occurred.' }), { 
            status: 500, 
            headers: { 'Content-Type': 'application/json' } 
        });
    }
}