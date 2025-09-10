// ProfileModal.jsx
"use client";

import { storage } from "@services/appwrite.client";
import { ID } from "appwrite";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ProfileModal({ user, onClose, onSave }) {
    const { setTheme } = useTheme();
    const [formData, setFormData] = useState({});
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (!user) return;
        setFormData({
            name: user.name || "",
            age: user.age || "",
            weight: user.weight || "",
            goal: user.goal || "",
            height: user.height || "",
            location: user.location || "",
            email: user.email || "",
            avatar: user.avatar && user.avatar.trim() !== ""
                ? user.avatar
                : `https://api.dicebear.com/6.x/identicon/svg?seed=${encodeURIComponent(user.name)}`,
            theme: user.theme || "light"
        });
    }, [user]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAvatarChange = async (e) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        setUploading(true);
        try {
            const file = files[0];
            const bucketId = process.env.NEXT_PUBLIC_BUCKET_ID;
            const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
            const created = await storage.createFile(bucketId, ID.unique(), file);
            const url = `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${bucketId}/files/${created.$id}/view?project=${projectId}`;
            setFormData(prev => ({ ...prev, avatar: url }));
        } catch (err) {
            console.error(err);
        } finally {
            setUploading(false);
        }
    };

    const handleThemeChange = (theme) => {
        setFormData(prev => ({ ...prev, theme }));
        setTheme(theme);
    };

    const handleSave = () => {
        if (onSave) onSave(formData);
        setTheme(formData.theme);
        onClose();
    };

    return (
        <div className="fixed inset-0 backdrop-blur-2xl flex items-center justify-center z-50">
            <div className="rounded-lg shadow-lg bg-gray-900 w-full max-w-2xl p-7 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-xl">✕</button>
                <h2 className="text-2xl font-semibold mb-5 text-orange-600">Profile</h2>

                <div className="flex flex-col items-center mb-7">
                    <img
                        src={formData.avatar || null}
                        alt="Avatar"
                        className="w-24 h-24 rounded-full shadow-md object-cover border-2 border-orange-400"
                    />
                    <label className="mt-3 px-4 py-2 text-sm bg-orange-500 rounded cursor-pointer text-white hover:bg-orange-600">
                        {uploading ? "Uploading..." : "Change Avatar"}
                        <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} disabled={uploading} />
                    </label>
                </div>

                <div className="space-y-4">
                    {[
                        { label: "Name", key: "name", type: "text" },
                        { label: "Age", key: "age", type: "number" },
                        { label: "Weight", key: "weight", type: "number" },
                        { label: "Set your Goal", key: "goal", type: "number" },
                        { label: "Height", key: "height", type: "number" },
                        { label: "Location", key: "location", type: "text" },
                        { label: "Email", key: "email", type: "email" }
                    ].map(field => (
                        <div key={field.key}>
                            <label className="block text-sm font-medium text-gray-300">{field.label}</label>
                            <input
                                type={field.type}
                                name={field.key}
                                value={formData[field.key] || ""}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-700 rounded-lg px-3 py-2 bg-gray-800 text-gray-100 focus:ring focus:ring-orange-400"
                            />
                        </div>
                    ))}
                    <div className="flex justify-end space-x-3 mt-7">
                        <button onClick={onClose} className="px-5 py-2 bg-gray-700 text-gray-100 rounded hover:bg-gray-600">Cancel</button>
                        <button onClick={handleSave} className="px-5 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">Update Profile</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
