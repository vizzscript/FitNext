// DietPlans.jsx
export function DietPlans({ user }) {
    // Simple logic for demo purposes
    const plans = [
        { id: 1, name: "Weight Loss", desc: "Low calorie, high protein meals", suitable: user.goal < user.weight },
        { id: 2, name: "Muscle Gain", desc: "High protein and carb diet", suitable: user.goal > user.weight },
        { id: 3, name: "Balanced", desc: "Moderate nutrition for well-being", suitable: user.goal === user.weight },
    ];
    return (
        <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-xl font-semibold mb-3">Diet Plans</h3>
            <div className="grid grid-cols-1 gap-3">
                {plans.filter(p => p.suitable).map(plan => (
                    <div key={plan.id} className="p-4 border rounded hover:shadow-lg transition cursor-pointer bg-green-50">
                        <h4 className="font-semibold">{plan.name}</h4>
                        <p className="text-sm text-gray-600">{plan.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
