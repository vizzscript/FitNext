// UserProfileForm.jsx
import React from "react";


export function UserProfileForm({ onComplete }) {
    const [form, setForm] = React.useState({
        name: "",
        age: "",
        weight: "",
        goal: "",
        height: "",
        location: "",
        theme: "dark",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onComplete(form);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg space-y-4">
            <h2 className="text-2xl font-semibold text-center mb-4">Tell us about you</h2>
            {["name", "age", "weight", "goal", "height", "location"].map(field => (
                <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
                    <input
                        name={field}
                        type={field === "age" || field === "weight" || field === "goal" || field === "height" ? "number" : "text"}
                        value={form[field]}
                        onChange={handleChange}
                        required
                        className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            ))}
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
                Save Profile
            </button>
        </form>
    );
}
