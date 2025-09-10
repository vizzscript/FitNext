// services/quest.service.js
"use client";

import { databases } from "@/services/appwrite.client";
import { ID, Query } from "appwrite";

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const QUESTS_COLLECTION = "quests";

// Create quest
export async function createQuest(data) {
    return await databases.createDocument(
        DB_ID,
        QUESTS_COLLECTION,
        ID.unique(),
        {
            title: data.title,
            description: data.description,
            xpReward: data.xpReward,
            completedBy: [], // relationship field
        }
    );
}

// List all quests
export async function listQuests() {
    const res = await databases.listDocuments(DB_ID, QUESTS_COLLECTION);
    return res.documents;
}

// Mark quest as completed for a profile
export async function completeQuest(questId, profileId) {
    // NOTE: Appwrite relationship fields overwrite on update,
    // so you must include the *full array* (not just append one).
    const quest = await databases.getDocument(DB_ID, QUESTS_COLLECTION, questId);

    const updatedCompletedBy = [
        ...(quest.completedBy?.map((p) => p.$id) || []),
        profileId,
    ];

    return await databases.updateDocument(DB_ID, QUESTS_COLLECTION, questId, {
        completedBy: updatedCompletedBy,
    });
}

// Get quests completed by a specific profile
export async function getCompletedQuests(profileId) {
    const res = await databases.listDocuments(DB_ID, QUESTS_COLLECTION, [
        Query.equal("completedBy", profileId),
    ]);
    return res.documents;
}
