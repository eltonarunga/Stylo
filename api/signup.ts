// This is a mock sign-up endpoint running as a serverless function.
// In a real application, this would involve creating a new user record in a database,
// after hashing and salting the password.

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req: Request): Promise<Response> {
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ message: 'Method Not Allowed' }), { 
            status: 405, 
            headers: { 'Content-Type': 'application/json', 'Allow': 'POST' } 
        });
    }

    try {
        const { name, email, password } = await req.json();

        // --- Input Validation ---
        if (!name || !email || !password) {
            return new Response(JSON.stringify({ message: 'Name, email, and password are required.' }), { 
                status: 400, 
                headers: { 'Content-Type': 'application/json' } 
            });
        }
        if (typeof name !== 'string' || name.length < 2 || name.length > 50) {
             return new Response(JSON.stringify({ message: 'Name must be between 2 and 50 characters.' }), { 
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
        if (typeof password !== 'string' || password.length < 8) {
             return new Response(JSON.stringify({ message: 'Password must be at least 8 characters long.' }), { 
                status: 400, 
                headers: { 'Content-Type': 'application/json' } 
            });
        }
        // --- End Validation ---

        // In a real application, you would check if the email is already in use
        // and then create the new user in your database.
        
        console.log(`Mock user created: Name - ${name}, Email - ${email}`);

        // Return a success response, simulating a successful user creation.
        return new Response(JSON.stringify({ 
            message: 'Account created successfully!',
        }), { 
            status: 201, // 201 Created is appropriate for a successful resource creation
            headers: { 'Content-Type': 'application/json' } 
        });

    } catch (error) {
        console.error("Sign-up error:", error);
        return new Response(JSON.stringify({ message: 'An internal server error occurred.' }), { 
            status: 500, 
            headers: { 'Content-Type': 'application/json' } 
        });
    }
}