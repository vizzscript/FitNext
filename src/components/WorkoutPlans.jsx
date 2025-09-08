// WorkoutPlans.jsx
export function WorkoutPlans({ user }) {
    const plans = [
        { id: 1, name: "Cardio Focus", desc: "Daily cardio for fat burn", suitable: user.goal < user.weight },
        { id: 2, name: "Strength Training", desc: "Build muscle with weights", suitable: user.goal > user.weight },
        { id: 3, name: "Flexibility", desc: "Yoga and stretching routines", suitable: user.goal === user.weight },
    ];
    return (
        <div className="w-full rounded-lg shadow p-4">
            <h3 className="text-xl font-semibold mb-3">Workout Plans</h3>
            <div className="grid grid-cols-1 gap-3">
                {plans.filter(p => p.suitable).map(plan => (
                    <div key={plan.id} className="p-4 rounded hover:shadow-lg transition cursor-pointer">
                        <h4 className="font-semibold">{plan.name}</h4>
                        <p className="text-sm">{plan.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
