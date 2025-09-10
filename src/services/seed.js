import { Client, Databases, ID } from "appwrite";
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

// Initialize Appwrite client
const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const databases = new Databases(client);
const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const PROFILES_COLLECTION = "profiles";
const QUESTS_COLLECTION = "quests";

// Utility functions to generate random data
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomName() {
    const names = ["Alex", "Sam", "Jordan", "Taylor", "Morgan", "Riley", "Casey", "Jamie"];
    return names[Math.floor(Math.random() * names.length)] + "_" + randomInt(1, 1000);
}

function randomQuestTitle() {
    const activities = ["Run", "Swim", "Cycle", "Walk", "Yoga", "Meditate", "Workout"];
    const descriptors = ["Morning", "Evening", "Challenge", "Boost", "Streak"];
    return `${descriptors[Math.floor(Math.random() * descriptors.length)]} ${activities[Math.floor(Math.random() * activities.length)]}`;
}

// Delete all documents from a collection
async function clearCollection(collectionId) {
    const res = await databases.listDocuments(DB_ID, collectionId);
    for (const doc of res.documents) {
        try {
            await databases.deleteDocument(DB_ID, collectionId, doc.$id);
            console.log("Deleted:", doc.$id);
        } catch (err) {
            console.error("Error deleting doc", doc.$id, err.message);
        }
    }
}

// Seed profiles
async function seedProfiles(count = 100) {
    for (let i = 0; i < count; i++) {
        const id = ID.unique();
        const profile = {
            xp: randomInt(0, 2000),
            level: randomInt(1, 10),
            steps: randomInt(1000, 25000),
            calories: randomInt(800, 4000),
            // name: randomName()
        };
        try {
            await databases.createDocument(DB_ID, PROFILES_COLLECTION, id, profile);
            console.log("Created profile:", id);
        } catch (err) {
            console.error("Error creating profile", id, err.message);
        }
    }
}

// Seed quests
async function seedQuests(count = 100) {
    for (let i = 0; i < count; i++) {
        const id = ID.unique();
        const quest = {
            title: randomQuestTitle(),
            description: "Complete this quest to earn XP!",
            xpRewards: randomInt(50, 500).toString(),
            // completedBy: relationship handled later in app
        };
        try {
            await databases.createDocument(DB_ID, QUESTS_COLLECTION, id, quest);
            console.log("Created quest:", id);
        } catch (err) {
            console.error("Error creating quest", id, err.message);
        }
    }
}

// Main seed function
async function seed() {
    console.log("Clearing profiles...");
    await clearCollection(PROFILES_COLLECTION);
    console.log("Clearing quests...");
    await clearCollection(QUESTS_COLLECTION);

    console.log("Seeding profiles...");
    await seedProfiles();
    console.log("Seeding quests...");
    await seedQuests();

    console.log("Seeding completed!");
}

seed();
