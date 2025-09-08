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
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-blue-500 text-center">Tell us about you</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {["name", "age", "weight", "goal", "height", "location"].map(field => (
                        <div key={field}>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize mb-1">{field}</label>
                            <input
                                name={field}
                                type={field === "age" || field === "weight" || field === "goal" || field === "height" ? "number" : "text"}
                                value={form[field]}
                                onChange={handleChange}
                                required
                                placeholder={
                                    field === "name" ? "John Doe" :
                                        field === "age" ? "28" :
                                            field === "weight" ? "70 (kg)" :
                                                field === "goal" ? "65 (target kg)" :
                                                    field === "height" ? "172 (cm)" :
                                                        "City, Country"
                                }
                                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 py-2 px-4 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
                            />
                        </div>
                    ))}
                </div>
                <button
                    type="submit"
                    className="mt-6 w-full py-3 rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
                >
                    Save Profile
                </button>
            </form>
        </div>
    );
}
