import { account } from '@services/appwrite.client';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Handle user login with email-password
    async function handleLogin() {
        setLoading(true);
        try {
            let user = null;

            // Check if session exists
            try {
                user = await account.get();
            } catch {
                // No session exists; user not logged in
            }

            // If no session, create one
            if (!user) {
                await account.createEmailPasswordSession({ email, password });
                user = await account.get();
            }

            // Enforce email verification: if not verified, do not proceed
            if (!user.emailVerification) {
                toast.error("Please verify your email to continue.");
                return;
            }
            toast.success("Login successful!");
            onLogin(user);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-blue-500 text-center">Login</h2>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    if (!loading) handleLogin();
                }}
                className="space-y-5"
            >
                <div>
                    <input
                        id="login-email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        autoComplete="email"
                        className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 py-2 px-4 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
                    />
                </div>
                <div>
                    <input
                        id="login-password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        autoComplete="current-password"
                        className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 py-2 px-4 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
                    />
                </div>

                {/* Email verification prompt removed to allow seamless login */}

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded-md font-semibold text-white transition ${loading
                        ? 'bg-blue-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                        }`}
                    aria-busy={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
}
