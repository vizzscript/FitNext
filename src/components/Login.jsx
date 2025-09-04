import { useState } from 'react';
import toast from 'react-hot-toast';
import { account } from '../lib/appwrite';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showVerificationPrompt, setShowVerificationPrompt] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Send a verification email to the user
  async function sendVerificationEmail() {
    try {
      // Make sure this URL matches your frontend verification route
      await account.createVerification({
        url: 'http://localhost:3002/verifyemail'
      });

      toast.success('Verification email sent! Please check your inbox.');
    } catch (error) {
      toast.error(error.message);
    }
  }

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

      // Check if user's email is verified
      if (!user.emailVerification) {
        setShowVerificationPrompt(true);
        setCurrentUser(user);
        // Do NOT proceed to dashboard yet
      } else {
        toast.success("Login successful!");
        onLogin(user); // Trigger redirect or further action from parent
      }
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
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 py-2 px-4 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
          />
        </div>
        <div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 py-2 px-4 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
          />
        </div>

        {/* Verification prompt appears if email not verified */}
        {showVerificationPrompt && (
          <div className="text-center p-4">
            <p className="mb-2">
              Your email is not verified. Please verify to continue.
            </p>
            <button
              type="button"
              onClick={sendVerificationEmail}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Send Verification Email
            </button>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              After verifying, log in again to proceed.
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-md font-semibold text-white transition ${loading
            ? 'bg-blue-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
            }`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
