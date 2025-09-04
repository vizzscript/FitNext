"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { account } from "../lib/appwrite";

export default function VerifyEmail() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const userId = searchParams.get("userId");
    const secret = searchParams.get("secret");
    const expire = searchParams.get("expire");

    const isVerifyingLink = userId && secret && expire;

    const [loading, setLoading] = useState(false);
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(null);
    const [promptLogout, setPromptLogout] = useState(false);

    const pollingInterval = useRef(null);

    async function checkVerification() {
        setLoading(true);
        setError(null);
        try {
            const user = await account.get();
            if (user.emailVerification) {
                setVerified(true);
                if (pollingInterval.current) clearInterval(pollingInterval.current);
                setPromptLogout(true);
            } else {
                setVerified(false);
            }
        } catch (e) {
            setError("Failed to fetch user info.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        checkVerification();

        pollingInterval.current = setInterval(() => {
            checkVerification();
        }, 5000);

        return () => {
            if (pollingInterval.current) clearInterval(pollingInterval.current);
        };
    }, []);

    async function handleLogoutLogin() {
        try {
            await account.deleteSession();
            router.push("/home");
        } catch (e) {
            console.error("Logout failed", e);
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 font-sans p-6">
            {isVerifyingLink && (
                <>
                    <h1 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                        Verifying your email...
                    </h1>
                    <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-md text-center">
                        Please wait while we verify your email. This may take a few moments.
                    </p>
                </>
            )}

            {loading && (
                <p className="text-gray-700 dark:text-gray-200">
                    Checking verification status...
                </p>
            )}

            {error && (
                <>
                    <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
                    <button
                        onClick={checkVerification}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                        Retry
                    </button>
                </>
            )}

            {promptLogout ? (
                <>
                    <h1 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                        Email Verified!
                    </h1>
                    <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-md text-center">
                        Your email has been verified. Please log out and log in again to continue.
                    </p>
                    <button
                        onClick={handleLogoutLogin}
                        className="px-6 py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                    >
                        Log Out & Log In
                    </button>
                </>
            ) : (
                !verified &&
                !loading &&
                !error && (
                    <>
                        <h1 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                            Verify Your Email
                        </h1>
                        <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-md text-center">
                            We have sent a verification link to your email address. Please check your inbox and click the link to verify your account.
                        </p>
                        <button
                            onClick={checkVerification}
                            className="px-6 py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                        >
                            Check Verification Status
                        </button>
                    </>
                )
            )}
        </div>
    );
}
