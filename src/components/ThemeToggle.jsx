"use client";

import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <button
            onClick={toggleTheme}
            className="px-3 py-2 rounded-md flex items-center justify-center text-xl"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? <FiSun /> : <FiMoon fill="" color="black" />}
        </button>
    );
}
