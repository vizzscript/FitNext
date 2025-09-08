import { MoreVertical } from "lucide-react";
import { useState } from "react";
import ProfileModal from "./ProfileModal";

export function ProfileCard({ user, onSave }) {
    const [isOpen, setIsOpen] = useState(false);

    // Use avatar if present, otherwise fallback
    const avatar = user.avatar || `https://api.dicebear.com/6.x/identicon/svg?seed=${encodeURIComponent(user.name)}`;

    return (
        <div className="relative bg-white dark:bg-gray-800 rounded-xl p-6 pt-12 mt-5 shadow-md w-full mx-auto">
            {/* Three dots menu */}
            <button
                onClick={() => setIsOpen(true)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
                <MoreVertical size={20} />
            </button>

            {/* Floating profile image */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                <img
                    className="rounded-full w-24 h-24 border-4 border-white shadow-lg object-cover"
                    src={avatar}
                    alt={user.name}
                />
            </div>

            {/* Content */}
            <h2 className="text-center mt-14 text-xl font-semibold text-gray-900 dark:text-gray-100">{user.name}</h2>
            <p className="text-center text-gray-500 dark:text-gray-400">
                {user.age} Years
            </p>

            <div className="grid grid-cols-3 gap-4 mt-4 text-center">
                <div>
                    <div className="text-orange-500 font-bold">{user.weight} kg</div>
                    <div className="text-gray-400 dark:text-gray-500 text-sm">Weight</div>
                </div>
                <div>
                    <div className="text-teal-500 font-bold">{user.height} cm</div>
                    <div className="text-gray-400 dark:text-gray-500 text-sm">Height</div>
                </div>
                <div>
                    <div className="text-pink-500 font-bold">{user.goal} kg</div>
                    <div className="text-gray-400 dark:text-gray-500 text-sm">Goal</div>
                </div>
            </div>

            {/* Modal */}
            {isOpen && (
                <ProfileModal
                    user={user}
                    onClose={() => setIsOpen(false)}
                    onSave={onSave} // bubble updated user to parent
                />
            )}
        </div>
    );
}
