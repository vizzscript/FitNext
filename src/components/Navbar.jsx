"use client";

import { ThemeToggle } from "./ThemeToggle";


export function Navbar({ currentTab, onTabChange, user, onProfileClick }) {
    const tabs = [
        { id: "activities", label: "Activities", icon: "🏃" },
        { id: "diet", label: "Diet", icon: "🍽️" },
        { id: "fasting", label: "Fasting", icon: "⏳" },
    ];

    return (
        <nav className="flex items-center justify-between px-8 py-4 shadow top-0 z-50">
            {/* Branding */}
            <div className="font-bold text-2xl text-orange-600">FITNEXT</div>

            {/* Tabs */}
            <div className="flex space-x-8">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`flex items-center gap-2 font-semibold px-3 py-2 rounded-md ${currentTab === tab.id
                            ? "text-orange-600 border-b-2 border-orange-600"
                            : ""
                            } transition`}
                    >
                        <span>{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center gap-3">
                <ThemeToggle />
            </div>
        </nav>
    );
}
