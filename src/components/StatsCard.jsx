export function StatCard({ label, value, unit, goal, gradientColors }) {
    return (
        <div className={`rounded-xl p-6 shadow-md text-white bg-gradient-to-tr ${gradientColors}`}>
            <h4 className="font-semibold text-lg">{label}</h4>
            <div className="mt-2 text-3xl font-extrabold">
                {value} <span className="text-xl">{unit}</span>
            </div>
            {goal && <div className="mt-1 text-xs opacity-80">Goal: {goal}</div>}
        </div>
    );
}
