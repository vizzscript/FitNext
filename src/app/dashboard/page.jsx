"use client";

import { JournalList } from "@/components/JournalList";
import { Navbar } from "@/components/Navbar";
import { RecentWorkoutTable } from "@/components/RecentWorkoutTable";
import { Sidebar } from "@/components/Sidebar";
import { StatCard } from "@/components/StatsCard";
import { UserProfileForm } from "@/components/UserProfileForm";
import { account, databases } from "@services/appwrite.client";
import { Query } from "appwrite";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ActivityChart } from "../../components/ActivityChart";

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [profileCompleted, setProfileCompleted] = useState(false);
    const [currentTab, setCurrentTab] = useState("activities");
    const [tracking, setTracking] = useState({ dietProgress: 40, workoutProgress: 55 });
    const [profileOpen, setProfileOpen] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);
    const [journals, setJournals] = useState([]);
    const [workouts, setWorkouts] = useState([]);
    const [chartData, setChartData] = useState([]);

    const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
    const JOURNALS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_JOURNALS_COLLECTION_ID;
    const WORKOUTS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_WORKOUTS_COLLECTION_ID;
    const ACTIVITIES_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_ACTIVITIES_COLLECTION_ID;

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
                if (!fullUser.emailVerification) {
                    router.replace('/verifyemail');
                    return;
                }
            } catch {
                // Not logged in → redirect to login/home
                setUser(null);
                try {
                    router.replace("/home");
                } catch { }
                return;
            } finally {
                setLoading(false);
            }
        }
        // Optimistically use local flag to avoid showing the form on refreshes
        try {
            const localCompleted = typeof window !== "undefined" && window.localStorage.getItem("profileCompleted") === "true";
            if (localCompleted) setProfileCompleted(true);
        } catch { }

        fetchUser();
    }, []);

    useEffect(() => {
        if (loading || !profileCompleted || !user?.$id) return;

        let isCancelled = false;
        async function fetchDashboardData() {
            setDataLoading(true);
            try {
                const commonQueries = [
                    Query.equal("userId", user.$id),
                    Query.orderDesc("$createdAt"),
                    Query.limit(10),
                ];

                const requests = [
                    JOURNALS_COLLECTION_ID
                        ? databases.listDocuments(DATABASE_ID, JOURNALS_COLLECTION_ID, commonQueries)
                        : Promise.resolve(null),
                    WORKOUTS_COLLECTION_ID
                        ? databases.listDocuments(DATABASE_ID, WORKOUTS_COLLECTION_ID, commonQueries)
                        : Promise.resolve(null),
                    ACTIVITIES_COLLECTION_ID
                        ? databases.listDocuments(DATABASE_ID, ACTIVITIES_COLLECTION_ID, [
                            Query.equal("userId", user.$id),
                            Query.orderAsc("date"),
                            Query.limit(30),
                        ])
                        : Promise.resolve(null),
                ];

                const [journalsRes, workoutsRes, activitiesRes] = await Promise.allSettled(requests);

                if (!isCancelled) {
                    if (journalsRes.status === "fulfilled" && journalsRes.value) {
                        const mapped = (journalsRes.value.documents || []).map((d) => ({
                            id: d.$id,
                            title: d.title || d.name || "Entry",
                            details: d.details || d.description || "",
                            time: d.time || new Date(d.$createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                        }));
                        setJournals(mapped);
                    }

                    if (workoutsRes.status === "fulfilled" && workoutsRes.value) {
                        const mapped = (workoutsRes.value.documents || []).map((d) => ({
                            id: d.$id,
                            name: d.name || d.type || "Workout",
                            distance: d.distance ? `${d.distance} km` : d.distance_label || "-",
                            duration: d.duration ? `${d.duration} mins` : d.duration_label || "-",
                            datetime: d.datetime || new Date(d.$createdAt).toISOString().slice(0, 16).replace("T", " "),
                            completion: typeof d.completion === "number" ? d.completion : d.progress || 0,
                        }));
                        setWorkouts(mapped);
                    }

                    if (activitiesRes.status === "fulfilled" && activitiesRes.value) {
                        const mapped = (activitiesRes.value.documents || []).map((d) => ({
                            date: d.date || new Date(d.$createdAt).toLocaleDateString(undefined, { month: "short", day: "2-digit" }),
                            diet: typeof d.diet === "number" ? d.diet : 0,
                            workout: typeof d.workout === "number" ? d.workout : 0,
                        }));
                        setChartData(mapped);
                    }
                }
            } catch (error) {
                toast.error("Failed loading dashboard data: " + error.message);
            } finally {
                if (!isCancelled) setDataLoading(false);
            }
        }

        fetchDashboardData();
        return () => {
            isCancelled = true;
        };
    }, [loading, profileCompleted, user?.$id]);

    const handleProfileComplete = async (profileData) => {
        try {
            await account.updateName(profileData.name);
            await account.updatePrefs({ ...profileData, profileCompleted: true });
            setUser((prev) => ({ ...prev, ...profileData, profileCompleted: true }));
            setProfileCompleted(true);
            try {
                if (typeof window !== "undefined") {
                    window.localStorage.setItem("profileCompleted", "true");
                }
            } catch { }
            toast.success("User data has been submitted successfully.");
        } catch (error) {
            toast.error("Error while submitting form: " + error.message);
        }
    };

    const handleUserUpdate = async (updatedUser) => {
        try {
            // Update account name if changed
            if (updatedUser.name !== user.name) {
                await account.updateName(updatedUser.name);
            }

            // Update prefs including avatar
            await account.updatePrefs({
                ...user.prefs,       // preserve existing prefs
                ...updatedUser
            });

            setUser(prev => ({ ...prev, ...updatedUser }));
            toast.success("User data has been updated successfully!");
        } catch (error) {
            toast.error("Error while updating details: " + error.message);
        }
    };


    if (loading || !user) return null;

    if (!profileCompleted) {
        return <UserProfileForm onComplete={handleProfileComplete} />;
    }

    // Sample data
    const stats = [
        { label: "Heart Rate", value: 96, unit: "bpm", gradientColors: "from-blue-400 to-blue-600" },
        { label: "Steps", value: 1868, goal: 6000, gradientColors: "from-pink-400 to-pink-600" },
        { label: "Calories", value: 1126, unit: "kcal", goal: 3000, gradientColors: "from-orange-400 to-orange-600" },
        { label: "Sleep", value: "5h 2m", goal: "8h", gradientColors: "from-cyan-400 to-cyan-600" },
    ];

    const fallbackChartData = [
        { date: "Aug 29", diet: 50, workout: 70 },
        { date: "Aug 30", diet: 70, workout: 65 },
        { date: "Aug 31", diet: 60, workout: 50 },
        { date: "Sep 01", diet: 80, workout: 70 },
        { date: "Sep 02", diet: 55, workout: 45 },
        { date: "Sep 03", diet: 90, workout: 50 },
        { date: "Sep 04", diet: 85, workout: 60 },
    ];

    const effectiveChartData = chartData && chartData.length > 0 ? chartData : fallbackChartData;
    const effectiveJournals = journals && journals.length > 0 ? journals : [
        { id: 1, title: "Morning Walk", details: "30m | 1.68km | 36.65%", time: "7:00 AM" },
        { id: 2, title: "Water Taken", details: "3 Glasses | 18.75%", time: "7:40 AM" },
        { id: 3, title: "Breakfast", details: "Wheat Chapathi, Boiled Egg, Dosa | 12.20%", time: "9:00 AM" },
    ];
    const effectiveWorkouts = workouts && workouts.length > 0 ? workouts : [
        { id: 1, name: "Running", distance: "1.6 km", duration: "16 mins", datetime: "2025-09-04 02:30", completion: 20 },
        { id: 2, name: "Swimming", distance: "1.8 km", duration: "33 mins", datetime: "2025-09-04 01:30", completion: 27 },
    ];

    return (
        <>
            <Navbar
                currentTab={currentTab}
                onTabChange={setCurrentTab}
                user={user}
                onProfileClick={() => setProfileOpen((prev) => !prev)}
            />
            <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen relative w-full mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
                    Welcome, {user?.name || "User"}
                </h1>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Section */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Stats Cards inside main content */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {stats.map((stat, i) => (
                                <div key={i} className="h-40 max-w-xs mx-auto w-full">
                                    <StatCard {...stat} className="h-full" />
                                </div>
                            ))}
                        </div>


                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                            <h2 className="font-semibold text-xl mb-4">Activity Statistics</h2>
                            <ActivityChart data={effectiveChartData} />
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                            <h2 className="font-semibold text-xl mb-4">Journals</h2>
                            {dataLoading ? (
                                <div className="animate-pulse h-24 bg-gray-100 rounded" />
                            ) : (
                                <JournalList journals={effectiveJournals} />
                            )}
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                            <h2 className="font-semibold text-xl mb-4">Recent Workout</h2>
                            {dataLoading ? (
                                <div className="animate-pulse h-24 bg-gray-100 rounded" />
                            ) : (
                                <RecentWorkoutTable workouts={effectiveWorkouts} />
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <Sidebar user={user} tracking={tracking} onUserUpdate={handleUserUpdate} />
                </div>
            </div>
        </>
    );
}
