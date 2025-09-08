
// Optionally use TailwindCSS, adjust classes as needed
import { useTheme } from "next-themes";

export function Navbar({ currentTab, onTabChange, user, onProfileClick }) {
    const { theme, setTheme } = useTheme();
    const tabs = [
        { id: "activities", label: "Activities", icon: "🏃" },
        { id: "diet", label: "Diet", icon: "🍽️" },
        { id: "fasting", label: "Fasting", icon: "⏳" },
    ];

    return (
        <nav className="flex items-center justify-between px-8 py-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow sticky top-0 z-50">
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
                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                            } transition`}
                    >
                        <span>{tab.icon}</span>
                        {tab.label}

                    </button>
                ))}
            </div>

            {/* Theme Toggle */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="px-3 py-2 rounded-md border border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                    aria-label="Toggle theme"
                >
                    {theme === 'dark' ? '🌙' : '☀️'}
                </button>
            </div>
        </nav>
    );
}
