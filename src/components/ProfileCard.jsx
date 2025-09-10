// ProfileCard.jsx
"use client";

import { MoreVertical } from "lucide-react";
import { useState } from "react";
import ProfileModal from "./ProfileModal";

export function ProfileCard({ user, onSave }) {
    const [isOpen, setIsOpen] = useState(false);

    const avatar = user.avatar && user.avatar.trim() !== ""
        ? user.avatar
        : `https://api.dicebear.com/6.x/identicon/svg?seed=${encodeURIComponent(user.name)}`;

    return (
        <div className="relative rounded-xl p-6 pt-12 mt-5 shadow-lg w-full mx-auto">
            <button
                onClick={() => setIsOpen(true)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
                <MoreVertical size={20} />
            </button>

            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                <img
                    className="rounded-full w-24 h-24 border-4 border-white shadow-lg object-cover"
                    src={avatar}
                    alt={user.name}
                />
            </div>

            <h2 className="text-center mt-14 text-xl font-semibold">{user.name || "User"}</h2>
            <p className="text-center">{user.age || "-"} Years</p>
            <div className="grid grid-cols-3 gap-4 mt-4 text-center">
                <div>
                    <div className="text-orange-500 font-bold">{user.weight || "-"} kg</div>
                    <div className="text-gray-500 text-sm">Weight</div>
                </div>
                <div>
                    <div className="text-teal-500 font-bold">{user.height || "-"} cm</div>
                    <div className="text-sm">Height</div>
                </div>
                <div>
                    <div className="text-pink-500 font-bold">{user.goal || "-"} kg</div>
                    <div className="text-sm">Goal</div>
                </div>
            </div>


            {isOpen && <ProfileModal user={user} onClose={() => setIsOpen(false)} onSave={onSave} />}
        </div>
    );
}
