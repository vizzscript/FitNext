"use client";

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { account } from "@services/appwrite.client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Login from "../../components/Login";
import SignUp from "../../components/Signup";

export default function Home() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      try {
        const currentUser = await account.get();

        if (currentUser) {
          // Only allow verified users to proceed to dashboard
          if (currentUser.emailVerification) {
            router.push("/dashboard");
          } else {
            router.push("/verifyemail");
          }
        } else {
          // No user logged in — show login
          setUser(null);
          setShowLogin(true);
        }
      } catch (error) {
        if (error.code === 401) {
          // Not authenticated — show login
          setUser(null);
          setShowLogin(true);
        } else {
          console.error("Error fetching user:", error);
        }
      } finally {
        setIsLoading(false);
      }
    }
    getUser();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-base">Loading…</p>
      </div>
    );
  }


  return (
    <motion.div
      className="min-h-screen flex flex-col items-center font-sans p-6 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >



      {/* Background Lottie animation */}
      <div className="pointer-events-none absolute top-0 left-0 w-screen h-full opacity-20 select-none">
        <DotLottieReact
          src="https://lottie.host/3655aa9e-ffd9-41ad-96a7-ae1d5964e362/TAnlJcd9vi.lottie"
          loop
          autoplay
        />
      </div>

      <motion.header
        className="max-w-4xl text-center mb-20 mt-10 relative z-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <h1 className="text-5xl font-extrabold tracking-tight mb-4 drop-shadow-lg">
          FitNext: Your Fitness Journey Starts Here
        </h1>
        <p className="text-lg max-w-xl mx-auto">
          Track your workouts, set achievable goals, and unlock badges on the way to a healthier,
          stronger you. Join the FitNext community to stay motivated and gamify your fitness goals!
        </p>
      </motion.header>

      <motion.div
        className="w-full max-w-lg mx-auto bg-gray-800 rounded-xl p-8 shadow-md relative z-10"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        {showLogin ? (
          <>
            <Login onLogin={(user) => router.push("/dashboard")} />
            <p className="mt-6 text-center text-gray-300">
              New to FitNext?{" "}
              <button
                onClick={() => setShowLogin(false)}
                className="text-blue-400 hover:text-blue-300 font-semibold hover:underline"
              >
                Sign up →
              </button>
            </p>
          </>
        ) : (
          <>
            <SignUp onSignUpSuccess={() => setShowLogin(true)} />
            <p className="mt-6 text-center text-gray-300">
              Already have an account?{" "}
              <button
                onClick={() => setShowLogin(true)}
                className="text-blue-400 hover:text-blue-300 font-semibold hover:underline"
              >
                Log in →
              </button>
            </p>
          </>
        )}
      </motion.div>

      <motion.footer
        className="mt-20 text-sm text-gray-400 opacity-70 relative z-10"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 0.7 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        © {new Date().getFullYear()} FitNext — Stay Active, Stay Healthy
      </motion.footer>
    </motion.div>
  );
}
