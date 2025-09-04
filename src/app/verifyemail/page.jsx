import { Suspense } from "react";
import VerifyEmail from "../../components/VerifyEmail";

export default function VerifyEmailPage() {
    return (
        <Suspense
            fallback={
                <div className="flex items-center justify-center h-screen">
                    <p className="text-gray-700 dark:text-gray-300">Loading verification...</p>
                </div>
            }
        >
            <VerifyEmail />
        </Suspense>
    );
}
