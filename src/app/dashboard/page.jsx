"use client";

import { DietPlans } from "@/components/DietPlans";
import { JournalList } from "@/components/JournalList";
import { Navbar } from "@/components/Navbar";
import { ProfileCard } from "@/components/ProfileCard";
import { RecentWorkoutTable } from "@/components/RecentWorkoutTable";
import { StatCard } from "@/components/StatsCard";
import { TrackingDashboard } from "@/components/TrackingDashboard";
import { UserProfileDropdown } from "@/components/UserProfileDropdown";
import { UserProfileForm } from "@/components/UserProfileForm";
import { WorkoutPlans } from "@/components/WorkoutPlans";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ActivityChart } from "../../components/ActivityChart";
import { account } from "../../lib/appwrite";

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [profileCompleted, setProfileCompleted] = useState(false);
    const [currentTab, setCurrentTab] = useState("activities");
    const [tracking, setTracking] = useState({ dietProgress: 40, workoutProgress: 55 });
    const [profileOpen, setProfileOpen] = useState(false);

    useEffect(() => {
        async function fetchUser() {
            setLoading(true);
            try {
                const userDetails = await account.get();
                const fullUser = {
                    ...userDetails,
                    ...userDetails.prefs,
                    email: userDetails.email,
                };
                setUser(fullUser);
                setProfileCompleted(!!fullUser.profileCompleted);
            } catch {
                setProfileCompleted(false);
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, []);

    const handleProfileComplete = async (profileData) => {
        try {
            await account.updateName(profileData.name);
            await account.updatePrefs({ ...profileData, profileCompleted: true });
            setUser(prev => ({ ...prev, ...profileData, profileCompleted: true }));
            setProfileCompleted(true);
            toast.success("User data has been submitted successfully.");
        } catch (error) {
            toast.error("Error while submitting form: " + error.message);
        }
    };

    const handleUserUpdate = async (updatedUser) => {
        try {
            await account.updateName(updatedUser.name);
            await account.updatePrefs(updatedUser);
            setUser(updatedUser);
            toast.success("User data has been updated successfully.");
        } catch (error) {
            toast.error("Error while updating details: " + error.message);
        }
    };

    if (loading) return null;

    if (!profileCompleted) {
        return <UserProfileForm onComplete={handleProfileComplete} />;
    }

    // Sample data for cards and chart (replace with real data)
    const stats = [
        { label: "Heart Rate", value: 96, unit: "bpm", gradientColors: "from-blue-400 to-blue-600" },
        { label: "Steps", value: 1868, goal: 6000, gradientColors: "from-pink-400 to-pink-600" },
        { label: "Calories", value: 1126, unit: "kcal", goal: 3000, gradientColors: "from-orange-400 to-orange-600" },
        { label: "Sleep", value: "5h 2m", goal: "8h", gradientColors: "from-cyan-400 to-cyan-600" },
    ];

    const chartData = [
        { date: "Aug 29", diet: 50, workout: 70 },
        { date: "Aug 30", diet: 70, workout: 65 },
        { date: "Aug 31", diet: 60, workout: 50 },
        { date: "Sep 01", diet: 80, workout: 70 },
        { date: "Sep 02", diet: 55, workout: 45 },
        { date: "Sep 03", diet: 90, workout: 50 },
        { date: "Sep 04", diet: 85, workout: 60 },
    ];

    const journals = [
        { id: 1, title: "Morning Walk", details: "30m | 1.68km | 36.65%", time: "7:00 AM" },
        { id: 2, title: "Water Taken", details: "3 Glasses | 18.75%", time: "7:40 AM" },
        { id: 3, title: "Breakfast", details: "Wheat Chapathi, Boiled Egg, Dosa | 12.20%", time: "9:00 AM" },
        // Add more...
    ];

    const workouts = [
        { id: 1, name: "Running", distance: "1.6 km", duration: "16 mins", datetime: "2025-09-04 02:30", completion: 20 },
        { id: 2, name: "Swimming", distance: "1.8 km", duration: "33 mins", datetime: "2025-09-04 01:30", completion: 27 },
        // Add more...
    ];

    return (
        <>
            <Navbar
                currentTab={currentTab}
                onTabChange={setCurrentTab}
                user={user}
                onProfileClick={() => setProfileOpen((prev) => !prev)}
            />
            <div className="p-6 bg-gray-100 min-h-screen relative max-w-7xl mx-auto">
                {user && <UserProfileDropdown user={user} onUpdate={handleUserUpdate} />}
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Welcome, {user.name}</h1>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, i) => (
                        <StatCard key={i} {...stat} />
                    ))}
                </div>

                {/* Main content grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left content - chart, journals */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
                        <h2 className="font-semibold text-xl mb-4">Activity Statistics</h2>
                        <ActivityChart data={chartData} />

                        <h2 className="font-semibold text-xl mt-8 mb-4">Journals</h2>
                        <JournalList journals={journals} />

                        <h2 className="font-semibold text-xl mt-8 mb-4">Recent Workout</h2>
                        <RecentWorkoutTable workouts={workouts} />
                    </div>

                    <div className="space-y-6">
                        {/* Profile Card */}
                        <ProfileCard user={user} />

                        {/* Custom Components */}
                        <DietPlans user={user} />
                        <WorkoutPlans user={user} />
                        <TrackingDashboard tracking={tracking} />
                    </div>

                </div>
            </div>
        </>
    );
}