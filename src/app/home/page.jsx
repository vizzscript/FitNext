"use client";

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Login from "../../components/Login";
import SignUp from "../../components/Signup";
import { account } from "../../lib/appwrite";

export default function Home() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      try {
        const currentUser = await account.get();

        if (currentUser) {
          // Check email verification status
          if (currentUser.emailVerification) {
            // Email verified — redirect to dashboard
            router.push("/dashboard");
          } else {
            // Email NOT verified — stay on home page and show login
            setUser(currentUser);
            setShowLogin(true);
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
      }
    }
    getUser();
  }, [router]);


  if (user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (user && user.emailVerification) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Redirecting to dashboard...</p>
      </div>
    );
  }


  return (
    <motion.div
      className="min-h-screen bg-gradient-to-tr from-green-400 via-blue-500 to-purple-600 flex flex-col items-center text-white font-sans p-6 relative"
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
        <p className="text-lg max-w-xl mx-auto text-gray-100/90">
          Track your workouts, set achievable goals, and unlock badges on the way to a healthier,
          stronger you. Join the FitNext community to stay motivated and gamify your fitness goals!
        </p>
      </motion.header>

      <motion.div
        className="w-full max-w-lg mx-auto bg-white bg-opacity-90 rounded-xl p-8 shadow-md backdrop-blur-xs relative z-10"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        {showLogin ? (
          <>
            <Login onLogin={(user) => router.push("/dashboard")} />
            <p className="mt-6 text-center text-gray-800">
              New to FitNext?{" "}
              <button
                onClick={() => setShowLogin(false)}
                className="dark:text-blue-500 dark:hover:text-blue-600 font-semibold hover:underline"
              >
                Sign up →
              </button>
            </p>
          </>
        ) : (
          <>
            <SignUp onSignUpSuccess={() => setShowLogin(true)} />
            <p className="mt-6 text-center text-gray-800">
              Already have an account?{" "}
              <button
                onClick={() => setShowLogin(true)}
                className="dark:text-blue-500 dark:hover:text-blue-600 font-semibold hover:underline"
              >
                Log in →
              </button>
            </p>
          </>
        )}
      </motion.div>

      <motion.footer
        className="mt-20 text-sm text-gray-200 opacity-70 relative z-10"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 0.7 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        © {new Date().getFullYear()} FitNext — Stay Active, Stay Healthy
      </motion.footer>
    </motion.div>
  );
}
