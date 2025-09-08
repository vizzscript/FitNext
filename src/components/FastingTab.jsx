"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function FastingTab({ user, dataLoading }) {
    const weightData = [
        { month: "Nov", weight: 100 },
        { month: "Dec", weight: 90 },
        { month: "Jan", weight: 88 },
        { month: "Feb", weight: 85 },
        { month: "Mar", weight: 82 },
        { month: "Apr", weight: 80 },
        { month: "May", weight: 78 },
        { month: "Jun", weight: 76 },
        { month: "Jul", weight: 74 },
        { month: "Aug", weight: 72 },
        { month: "Sep", weight: 70 },
    ];

    return (
        <div className="space-y-8">
            {/* Fasting Status */}
            <div className="p-6 rounded-xl shadow-md flex flex-col items-center">
                <h3 className="text-xl font-semibold">Fasting</h3>
                <div className="relative w-40 h-40 flex items-center justify-center mt-4">
                    <div className="absolute inset-0 rounded-full border-8 border-orange-400" />
                    <p className="text-lg font-bold text-orange-500">Completed</p>
                </div>
                <p className="mt-2 text-sm">Yesterday 6:00 PM → Today 10:00 AM</p>
                <button className="mt-4 px-4 py-2 rounded-lg">Start Fasting</button>
            </div>

            {/* Water Intake */}
            <div className="p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold mb-2">Water</h3>
                <div className="flex items-center gap-4">
                    <button className="px-3 py-1 rounded-lg">-</button>
                    <p className="text-lg font-bold">2 Glasses</p>
                    <button className="px-3 py-1 rounded-lg">+</button>
                </div>
                <p className="text-sm text-gray-500 mt-2">300 ml / 2400 ml</p>
            </div>

            {/* Weight Journey */}
            <div className="p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold mb-4">Weight Journey</h3>
                <div className="h-64">
                    <ResponsiveContainer>
                        <LineChart data={weightData}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="weight" stroke="#8884d8" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
