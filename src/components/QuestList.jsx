"use client";
import { useEffect, useState } from "react";

export function QuestList({ quests, onComplete, profile }) {
    const [completedIds, setCompletedIds] = useState([]);

    useEffect(() => {
        if (profile?.completedQuests) {
            setCompletedIds(profile.completedQuests);
        }
    }, [profile]);

    const handleComplete = async (quest) => {
        if (completedIds.includes(quest.$id)) return;

        await onComplete(quest);
        setCompletedIds(prev => [...prev, quest.$id]);
    };

    // Separate quests
    const notCompletedQuests = quests.filter(q => !completedIds.includes(q.$id));
    const completedQuests = quests.filter(q => completedIds.includes(q.$id));


    const renderQuestCard = (q) => (
        <li
            key={q.$id}
            className={`p-4 rounded-xl shadow flex justify-between items-center
                ${completedIds.includes(q.$id) ? "bg-green-700" : "bg-gray-800"}`}
        >
            <div>
                <h3 className="text-lg font-bold text-white">{q.title}</h3>
                <p className="text-sm text-gray-400">{q.description}</p>
            </div>
            {!completedIds.includes(q.$id) && (
                <button
                    onClick={() => handleComplete(q)}
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded"
                >
                    Complete
                </button>
            )}
        </li>
    );

    return (
        <div className="space-y-6">
            {notCompletedQuests.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold text-orange-500 mb-2">Not Completed</h3>
                    <ul className="space-y-3">
                        {notCompletedQuests.map(renderQuestCard)}
                    </ul>
                </div>
            )}

            {completedQuests.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold text-green-400 mb-2">Completed</h3>
                    <ul className="space-y-3">
                        {completedQuests.map(renderQuestCard)}
                    </ul>
                </div>
            )}
        </div>
    );
}
