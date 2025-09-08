import { storage } from "@services/appwrite.client";
import { ID } from "appwrite";
import { useState } from "react";

export default function ProfileModal({ user, onClose, onSave }) {
    const [formData, setFormData] = useState({
        name: user.name,
        age: user.age,
        weight: user.weight,
        goal: user.goal,
        height: user.height,
        location: user.location || "",
        email: user.email || "",
        avatar: user.avatar || `https://api.dicebear.com/6.x/identicon/svg?seed=${encodeURIComponent(user.name)}`,
        theme: user.theme || "light"
    });
    const [uploading, setUploading] = useState(false);

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
    };

    const handleSave = () => {
        if (onSave) onSave(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-2xl p-7 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
                >
                    ✕
                </button>
                <h2 className="text-2xl font-semibold mb-5 text-orange-600">Profile</h2>
                <div className="flex flex-col items-center mb-7">
                    <img
                        src={formData.avatar}
                        alt="Avatar"
                        className="w-24 h-24 rounded-full shadow-md object-cover border-2 border-orange-400"
                    />
                    <label className="mt-3 px-4 py-2 text-sm bg-orange-500 text-white rounded cursor-pointer hover:bg-orange-600">
                        {uploading ? "Uploading..." : "Change Avatar"}
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAvatarChange}
                            disabled={uploading}
                        />
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
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{field.label}</label>
                            <input
                                type={field.type}
                                name={field.key}
                                value={formData[field.key]}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring focus:ring-orange-400"
                            />
                        </div>
                    ))}
                    <div>
                        <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Theme</span>
                        <div className="flex space-x-5">
                            <label>
                                <input type="radio" name="theme" value="light" checked={formData.theme === "light"} onChange={() => handleThemeChange("light")} />
                                <span className="ml-2">Light</span>
                            </label>
                            <label>
                                <input type="radio" name="theme" value="dark" checked={formData.theme === "dark"} onChange={() => handleThemeChange("dark")} />
                                <span className="ml-2">Dark</span>
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-3 mt-7">
                        <button onClick={onClose} className="px-5 py-2 bg-gray-200 dark:bg-gray-700 dark:text-gray-100 rounded hover:bg-gray-300 dark:hover:bg-gray-600">Cancel</button>
                        <button onClick={handleSave} className="px-5 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">Update Profile</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
