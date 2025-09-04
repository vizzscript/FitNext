import { useEffect, useRef, useState } from "react";

export function UserProfileDropdown({ user, onUpdate }) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(false);

    // List only the fields meant for display/edit
    const profileFields = ["name", "email", "age", "weight", "goal", "height", "location", "theme"];

    // Initialize form with filtered fields only
    const filterUserFields = (userData) => {
        const filtered = {};
        profileFields.forEach((key) => {
            if (userData[key] !== undefined) filtered[key] = userData[key];
        });
        return filtered;
    };

    const [form, setForm] = useState(filterUserFields(user));
    const dropdownRef = useRef(null);

    // Sync filtered form state whenever user prop changes
    useEffect(() => {
        setForm(filterUserFields(user));
    }, [user]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
                setEditing(false);
                setForm(filterUserFields(user)); // reset form on close
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onUpdate(form);
        setEditing(false);
        setOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setOpen(!open)}
                className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold uppercase fixed top-6 right-6 z-50"
                aria-label="User Profile"
            >
                {user.name ? user.name.charAt(0) : "U"}
            </button>
            {open && (
                <div className="absolute right-0 mt-2 w-80 bg-white border rounded shadow-lg p-4 space-y-3 z-50 max-w-full">
                    {editing ? (
                        <>
                            {profileFields.map((key) =>
                                key === "email" ? (
                                    <div key={key}>
                                        <label className="text-sm text-gray-600 capitalize">{key}</label>
                                        <input
                                            type="email"
                                            name={key}
                                            value={form[key] || ""}
                                            readOnly
                                            className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
                                        />
                                    </div>
                                ) : (
                                    <div key={key}>
                                        <label className="text-sm text-gray-600 capitalize">{key}</label>
                                        <input
                                            type={["age", "weight", "goal", "height"].includes(key) ? "number" : "text"}
                                            name={key}
                                            value={form[key] || ""}
                                            onChange={handleChange}
                                            className="w-full p-2 border rounded"
                                        />
                                    </div>
                                )
                            )}
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => {
                                        setEditing(false);
                                        setForm(filterUserFields(user));
                                    }}
                                    className="px-3 py-1 rounded bg-gray-200 text-gray-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600"
                                >
                                    Save
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            {profileFields.map((key) =>
                                key === "email" ? (
                                    <p key={key} className="text-sm text-gray-500">
                                        {key.charAt(0).toUpperCase() + key.slice(1)}: {user[key]}
                                    </p>
                                ) : (
                                    <p key={key} className="text-sm text-gray-600">
                                        {key.charAt(0).toUpperCase() + key.slice(1)}: {user[key]}
                                        {key === "weight" || key === "goal" ? " kg" : ""}
                                        {key === "height" ? " cm" : ""}
                                    </p>
                                )
                            )}
                            <button
                                onClick={() => setEditing(true)}
                                className="px-3 py-1 w-full rounded bg-blue-500 text-white hover:bg-blue-600 text-sm"
                            >
                                Edit Profile
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
