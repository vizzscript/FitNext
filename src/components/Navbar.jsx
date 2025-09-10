"use client";

import { ThemeToggle } from "./ThemeToggle";


export function Navbar() {


    return (
        <nav className="flex items-center justify-between px-8 py-4 shadow top-0 z-50">
            {/* Branding */}
            <div className="font-bold text-2xl text-orange-600">FITNEXT</div>

            {/* Tabs */}
            <div className="flex space-x-8">

            </div>

            {/* Right Side Controls */}
            <div className="flex items-center gap-3">
                <ThemeToggle />
            </div>
        </nav>
    );
}
