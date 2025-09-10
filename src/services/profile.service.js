"use client";

import { databases } from "@/services/appwrite.client";

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const PROFILES_COLLECTION = "profiles";

export async function createProfile(userId, data) {
    return await databases.createDocument(
        DB_ID,
        PROFILES_COLLECTION,
        userId, // use userId as document ID
        {
            xp: 0,
            level: 1,
            steps: 0,
            calories: 0,
            completedQuests: []  // ensure this default exists
        }
    );
}

export async function getProfileByUser(userId) {
    try {
        return await databases.getDocument(DB_ID, PROFILES_COLLECTION, userId);
    } catch {
        return null; // if no profile exists
    }
}

export async function updateProfile(userId, data) {
    return await databases.updateDocument(DB_ID, PROFILES_COLLECTION, userId, data);
}
