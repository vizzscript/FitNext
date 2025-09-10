// Sidebar.jsx
"use client";

import { ProfileCard } from "./ProfileCard";
import { RankCard } from "./RankCard";

export function Sidebar({ user, profile, onUserUpdate }) {
    return (
        <div className="flex flex-col rounded-xl items-center space-y-6 p-4 pt-10">
            <ProfileCard user={user} onSave={onUserUpdate} />
            <RankCard xp={profile?.xp || 0} />
        </div>
    );
}
