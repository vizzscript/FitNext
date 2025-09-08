// DietPlans.jsx
export function DietPlans({ user }) {
    // Simple logic for demo purposes
    const plans = [
        { id: 1, name: "Weight Loss", desc: "Low calorie, high protein meals", suitable: user.goal < user.weight },
        { id: 2, name: "Muscle Gain", desc: "High protein and carb diet", suitable: user.goal > user.weight },
        { id: 3, name: "Balanced", desc: "Moderate nutrition for well-being", suitable: user.goal === user.weight },
    ];
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg w-full shadow p-4">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">Diet Plans</h3>
            <div className="grid grid-cols-1 gap-3">
                {plans.filter(p => p.suitable).map(plan => (
                    <div key={plan.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded hover:shadow-lg transition cursor-pointer bg-green-50 dark:bg-gray-900">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">{plan.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{plan.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
