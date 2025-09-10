// utils/rank.utils.js
export function getRank(xp) {
    if (xp < 500) return "Bronze";
    if (xp < 1500) return "Silver";
    if (xp < 3000) return "Gold";
    if (xp < 5000) return "Platinum";
    return "Diamond";
}

// Returns the XP required to reach the next rank
export function getNextRankXP(xp) {
    if (xp < 500) return 500;
    if (xp < 1500) return 1500;
    if (xp < 3000) return 3000;
    if (xp < 5000) return 5000;
    return null; // Diamond is max rank
}
