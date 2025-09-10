"use client";
import { Navbar } from "@/components/Navbar";
import { QuestList } from "@/components/QuestList";
import { Sidebar } from "@/components/Sidebar";
import { UserProfileForm } from "@/components/UserProfileForm";
import { createProfile, getProfileByUser, updateProfile } from "@/services/profile.service";
import { completeQuest, listQuests } from "@/services/quest.service";
import { account } from "@services/appwrite.client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [profileCompleted, setProfileCompleted] = useState(false);
    const [profile, setProfile] = useState(null);
    const [quests, setQuests] = useState([]);
    const [tracking, setTracking] = useState("");

    useEffect(() => {
        async function init() {
            setLoading(true);
            try {
                const acc = await account.get();
                let prof = await getProfileByUser(acc.$id);
                if (!prof) {
                    prof = await createProfile(acc.$id, {
                        xp: 0,
                        level: 1,
                        steps: 0,
                        calories: 0,
                        completedQuests: []
                    });
                    toast.success("Profile created!");
                }

                const mergedUser = { ...acc, ...acc.prefs, ...prof, profileCompleted: !!acc.prefs?.profileCompleted };

                setUser(mergedUser);
                setProfile(prof);
                setProfileCompleted(!!mergedUser.profileCompleted);

                const allQuests = await listQuests();
                setQuests(allQuests);

                if (!acc.emailVerification) {
                    router.replace('/verifyemail');
                    return;
                }
            } catch (err) {
                console.error(err);
                toast.error("Dashboard failed to load.");
            } finally {
                setLoading(false);
            }
        }
        init();
    }, []);

    const handleProfileComplete = async (profileData) => {
        try {
            await account.updateName(profileData.name);
            await account.updatePrefs({ ...profileData, profileCompleted: true });
            setUser(prev => ({ ...prev, ...profileData, profileCompleted: true }));
            setProfileCompleted(true);

            if (typeof window !== "undefined") {
                window.localStorage.setItem("profileCompleted", "true");
            }

            toast.success("User data has been submitted successfully.");
        } catch (error) {
            toast.error("Error while submitting form: " + error.message);
        }
    };

    const handleUserUpdate = async (updatedData) => {
        try {
            if (updatedData.name && updatedData.name !== user.name) {
                await account.updateName(updatedData.name);
            }

            await account.updatePrefs({
                ...user.prefs,
                ...updatedData
            });

            setUser(prev => ({ ...prev, ...updatedData, prefs: { ...prev.prefs, ...updatedData } }));
            toast.success("Profile updated successfully!");
        } catch (err) {
            toast.error("Failed to update profile: " + err.message);
        }
    };

    if (loading || !user || !profile) return <div className="text-center py-16">Loading...</div>;

    if (!profileCompleted) {
        return <UserProfileForm onComplete={handleProfileComplete} />;
    }

    async function handleCompleteQuest(quest) {
        try {
            if (!profile || !profile.$id) {
                toast.error("Profile not loaded yet. Please wait...");
                return;
            }
            const xpGained = Number(quest?.xpRewards || 100);
            const completed = Array.isArray(profile.completedQuests)
                ? [...profile.completedQuests, quest.$id]
                : [quest.$id];
            await completeQuest(quest.$id, profile.$id);
            const updatedProfile = await updateProfile(profile.$id, {
                xp: (profile?.xp || 0) + xpGained,
                completedQuests: completed,
            });
            setProfile(updatedProfile);
            toast.success(`+${xpGained} XP earned! Quest completed 🎉`);
        } catch (err) {
            console.error("Error completing quest", err);
            toast.error("Failed to complete quest");
        }
    }

    return (
        <>
            <Navbar />
            <div className="px-4 sm:px-6 lg:px-8 py-6 min-h-screen w-full mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
                    Welcome, {user?.name || "User"}
                </h1>

                {/* Responsive Layout */}
                <div className="flex flex-col-reverse lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* Quests Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <QuestList quests={quests} onComplete={handleCompleteQuest} profile={profile} />
                    </div>

                    {/* Sidebar / User Profile */}
                    <div className="lg:col-span-1 mb-6 lg:mb-0">
                        <Sidebar
                            user={user}
                            tracking={tracking}
                            onUserUpdate={handleUserUpdate}
                            profile={profile}
                        />
                    </div>
                </div>

            </div>
        </>
    );
}
