"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const COLORS = ["#FF8042", "#FFBB28", "#00C49F", "#0088FE"];

export function DietTab({ user, journals, dataLoading }) {
    // Sample meals (replace with DB data later)
    const meals = [
        { title: "Breakfast", details: "Bread, Wheat Chapathi, Tea", calories: 202 },
        { title: "Snack", details: "Banana, Coffee, Samosa", calories: 369 },
        { title: "Lunch", details: "Moong Dal, Roti, Plain Rice", calories: 561 },
        { title: "Snack", details: "Recommended", calories: 165, add: true },
        { title: "Dinner", details: "Recommended", calories: 440, add: true },
    ];

    const chartData = [
        { name: "Proteins", value: 34.3 },
        { name: "Fat", value: 28.4 },
        { name: "Carbs", value: 188.4 },
        { name: "Others", value: 10 },
    ];

    return (
        <div className="space-y-8">
            {/* Meals */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {meals.map((meal, i) => (
                    <div
                        key={i}
                        className="p-4 rounded-xl shadow-md flex flex-col justify-between"
                    >
                        <h3 className="font-semibold text-lg">{meal.title}</h3>
                        <p className="text-sm">{meal.details}</p>
                        <p className="text-lg font-bold">{meal.calories} kcal</p>
                        {meal.add && (
                            <button className="mt-2 px-3 py-1 text-sm rounded-lg">
                                Add Menu
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* Calories & Macro Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                <div className="h-64">
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={90}
                                paddingAngle={3}
                                dataKey="value"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                    <p><span className="font-bold">Consumed Calories:</span> 1132 / 3000 kcal</p>
                    <p><span className="font-bold">Burned Calories:</span> 554 kcal</p>
                    <p><span className="font-bold">Proteins:</span> 34.3 gm</p>
                    <p><span className="font-bold">Fat:</span> 28.4 gm</p>
                    <p><span className="font-bold">Carbs:</span> 188.4 gm</p>
                    <p><span className="font-bold">Calcium:</span> 430 mg</p>
                    <p><span className="font-bold">Sodium:</span> 1.32 gm</p>
                    <p><span className="font-bold">Iron:</span> 10 mg</p>
                </div>
            </div>
        </div>
    );
}
