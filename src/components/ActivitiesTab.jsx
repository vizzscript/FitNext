"use client";

import { ActivityChart } from "@/components/ActivityChart";
import { JournalList } from "@/components/JournalList";
import { RecentWorkoutTable } from "@/components/RecentWorkoutTable";
import { StatCard } from "@/components/StatsCard";

export function ActivitiesTab({ stats, chartData, journals, workouts, dataLoading }) {
    return (
        <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="h-40 max-w-xs mx-auto w-full">
                        <StatCard {...stat} className="h-full" />
                    </div>
                ))}
            </div>

            {/* Chart */}
            <div className="p-6 rounded-xl shadow-md">
                <h2 className="font-semibold text-xl mb-4">Activity Statistics</h2>
                <ActivityChart data={chartData} />
            </div>

            {/* Journals */}
            <div className="p-6 rounded-xl shadow-md">
                <h2 className="font-semibold text-xl mb-4">Journals</h2>
                {dataLoading ? (
                    <div className="animate-pulse h-24 rounded" />
                ) : (
                    <JournalList journals={journals} />
                )}
            </div>

            {/* Workouts */}
            <div className="p-6 rounded-xl shadow-md">
                <h2 className="font-semibold text-xl mb-4">Recent Workout</h2>
                {dataLoading ? (
                    <div className="animate-pulse h-24 rounded" />
                ) : (
                    <RecentWorkoutTable workouts={workouts} />
                )}
            </div>
        </>
    );
}
