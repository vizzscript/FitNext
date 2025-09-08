import { account } from '@services/appwrite.client';
import { ID } from 'appwrite';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from "react-hot-toast";

export default function SignUp({ onSignUpSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSignUp() {
        setLoading(true);
        try {
            if (password !== confirmPassword) {
                toast.error("Passwords do not match!");
                setLoading(false);
                return;
            }
            await account.create({ userId: ID.unique(), email, password });
            // Create a session to allow verification page access
            await account.createEmailPasswordSession({ email, password });
            // Send email verification and redirect to verify page
            await account.createVerification({ url: window.location.origin + '/verifyemail' });
            toast.success('Account created! Verification email sent.');
            if (onSignUpSuccess) onSignUpSuccess();
            router.push('/verifyemail');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }



    return (
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-blue-500 text-center">Sign Up</h2>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    if (!loading) handleSignUp();
                }}
                className="space-y-5"
            >
                <div>
                    <input
                        id="signup-email"
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
                        id="signup-password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        autoComplete="new-password"
                        className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 py-2 px-4 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
                    />
                </div>
                <div>
                    <input
                        id="signup-confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        required
                        autoComplete="new-password"
                        className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 py-2 px-4 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded-md font-semibold text-white transition ${loading
                        ? 'bg-blue-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                        }`}
                    aria-busy={loading}
                >
                    {loading ? 'Signing up...' : 'Sign Up'}
                </button>
            </form>
        </div>
    );
}
