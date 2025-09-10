"use client";

import { useEffect, useState } from "react";
import { getRank, getNextRankXP } from "@/utils/rank.utils";
import toast from "react-hot-toast";
import { FaStar, FaChevronUp } from "react-icons/fa";

export function RankCard({ xp }) {
  const [rank, setRank] = useState(getRank(xp));

  useEffect(() => {
    const newRank = getRank(xp);
    if (newRank !== rank) {
      setRank(newRank);
      toast.success(`🏆 Rank Up! You are now ${newRank}!`);
    }
  }, [xp]);

  // Calculate progress towards next rank
  const nextRankXP = getNextRankXP(xp);
  const progress = nextRankXP ? Math.min((xp / nextRankXP) * 100, 100) : 100;

  return (
    <div className="relative w-full rounded-xl shadow-lg bg-gradient-to-r from-orange-500 to-orange-700 text-white p-6 overflow-hidden">
      {/* Decorative stars */}
      <div className="absolute top-2 right-3 text-yellow-300 opacity-50 text-2xl animate-pulse">
        <FaStar />
      </div>
      <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
        <FaChevronUp className="animate-bounce text-yellow-300" /> Your Rank
      </h3>
      <p className="text-3xl font-extrabold mb-1">{rank}</p>
      <p className="text-sm text-yellow-100 mb-4">XP: {xp}</p>

      {/* Progress bar */}
      <div className="w-full h-3 bg-orange-400/50 rounded-full overflow-hidden">
        <div
          className="h-full bg-yellow-400 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      {nextRankXP && (
        <p className="mt-2 text-xs text-yellow-100 text-right">
          {nextRankXP - xp} XP to next rank
        </p>
      )}
    </div>
  );
}
