
// Optionally use TailwindCSS, adjust classes as needed
export function Navbar({ currentTab, onTabChange, user, onProfileClick }) {
    const tabs = [
        { id: "activities", label: "Activities", icon: "🏃" },
        { id: "diet", label: "Diet", icon: "🍽️" },
        { id: "fasting", label: "Fasting", icon: "⏳" },
    ];

    return (
        <nav className="flex items-center justify-between px-8 py-4 bg-white shadow sticky top-0 z-50">
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
                            : "text-gray-600 hover:bg-gray-100"
                            } transition`}
                    >
                        <span>{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* User Profile Icon */}
            <div>
                {/* Use a button to open profile dropdown */}
                <button
                    onClick={onProfileClick}
                    aria-label="User Profile"
                    className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold uppercase shadow hover:ring-2 ring-orange-400 transition"
                >
                    {user?.name ? user.name.charAt(0) : "U"}
                </button>
            </div>
        </nav>
    );
}
