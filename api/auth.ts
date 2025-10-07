// This is a mock authentication endpoint running as a serverless function.
// In a real application, this would involve database lookups, password hashing (e.g., with bcrypt), and JWT generation.

// Simple email regex for basic validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req: Request): Promise<Response> {
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ message: 'Method Not Allowed' }), { 
            status: 405, 
            headers: { 'Content-Type': 'application/json', 'Allow': 'POST' } 
        });
    }

    try {
        const { email, password } = await req.json();

        // --- Input Validation ---
        if (!email || !password) {
            return new Response(JSON.stringify({ message: 'Email and password are required.' }), { 
                status: 400, 
                headers: { 'Content-Type': 'application/json' } 
            });
        }
        if (typeof email !== 'string' || !emailRegex.test(email)) {
             return new Response(JSON.stringify({ message: 'Invalid email format.' }), { 
                status: 400, 
                headers: { 'Content-Type': 'application/json' } 
            });
        }
        if (typeof password !== 'string' || password.length < 8) { // Example: enforce min password length
             return new Response(JSON.stringify({ message: 'Password must be at least 8 characters long.' }), { 
                status: 400, 
                headers: { 'Content-Type': 'application/json' } 
            });
        }
        // --- End Validation ---

        // ===================================================================
        // DANGER: MOCK AUTHENTICATION - DO NOT USE IN PRODUCTION
        // This is for demonstration purposes only. A real implementation MUST:
        // 1. Hash and salt passwords using a strong algorithm (e.g., bcrypt).
        // 2. Look up the user in a secure database.
        // 3. Compare the hashed password.
        // 4. Generate a secure, signed, and expiring JWT upon success.
        // ===================================================================
        const MOCK_EMAIL = 'user@stylo.com';
        const MOCK_PASSWORD = 'password123';

        if (email.toLowerCase() === MOCK_EMAIL && password === MOCK_PASSWORD) {
            // In a real app, you would generate and return a JWT here.
            // For this mock, we'll just return success.
            return new Response(JSON.stringify({ 
                message: 'Sign in successful!',
                // token: 'mock-jwt-token-for-client-to-store' 
            }), { 
                status: 200, 
                headers: { 'Content-Type': 'application/json' } 
            });
        } else {
            return new Response(JSON.stringify({ message: 'Invalid email or password.' }), { 
                status: 401, 
                headers: { 'Content-Type': 'application/json' } 
            });
        }

    } catch (error) {
        console.error("Auth error:", error);
        return new Response(JSON.stringify({ message: 'An internal server error occurred.' }), { 
            status: 500, 
            headers: { 'Content-Type': 'application/json' } 
        });
    }
}