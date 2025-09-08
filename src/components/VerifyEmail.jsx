"use client";

import { account } from "@services/appwrite.client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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
    const [info, setInfo] = useState(null);

    // If link params are present, verify directly with Appwrite
    useEffect(() => {
        async function verifyWithLink() {
            if (!isVerifyingLink) return;
            setLoading(true);
            setError(null);
            try {
                await account.updateVerification({ userId, secret });
                setVerified(true);
                // Redirect to home (login) after a brief pause
                setTimeout(() => router.push("/home"), 1500);
            } catch (e) {
                setError("Verification link is invalid or expired.");
            } finally {
                setLoading(false);
            }
        }
        verifyWithLink();
    }, [isVerifyingLink, userId, secret, router]);

    // Manual check for users who open this page without link
    async function checkVerification() {
        setLoading(true);
        setError(null);
        setInfo(null);
        try {
            const user = await account.get();
            setVerified(Boolean(user.emailVerification));
            if (user.emailVerification) {
                setTimeout(() => router.push("/home"), 1000);
            }
        } catch (e) {
            setError("You are not logged in. Please log in to check status.");
        } finally {
            setLoading(false);
        }
    }

    async function resendVerification() {
        setLoading(true);
        setError(null);
        setInfo(null);
        try {
            await account.createVerification({ url: window.location.origin + "/verifyemail" });
            setInfo("Verification email resent. Please check your inbox.");
        } catch (e) {
            // Most common cause: user is not logged in
            setError("Unable to resend. Please log in first, then try again.");
        } finally {
            setLoading(false);
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

            {info && !loading && (
                <p className="text-green-700 dark:text-green-400 mb-4">{info}</p>
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
                    <button
                        onClick={resendVerification}
                        className="mt-3 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition"
                    >
                        Resend Verification Email
                    </button>
                </>
            )}

            {verified && !loading && (
                <>
                    <h1 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                        Email Verified!
                    </h1>
                    <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-md text-center">
                        Redirecting you to login…
                    </p>
                </>
            )}

            {!verified && !loading && !error && (
                <>
                    <h1 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                        Verify Your Email
                    </h1>
                    <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-md text-center">
                        We have sent a verification link to your email address. After clicking the link, return here to continue.
                    </p>
                    <button
                        onClick={checkVerification}
                        className="px-6 py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                    >
                        Check Verification Status
                    </button>
                    <button
                        onClick={resendVerification}
                        className="mt-3 px-6 py-3 rounded-md bg-gray-700 text-white font-semibold hover:bg-gray-800 transition"
                    >
                        Resend Verification Email
                    </button>
                </>
            )}
        </div>
    );
}
