export function StatCard({ label, value, unit, goal, gradientColors, className = "" }) {
    return (
        <div className={`bg-gradient-to-r ${gradientColors} rounded-xl shadow-md p-6 flex flex-col items-center justify-center ${className}`}>
            <div className={`text-4xl bg-white font-bold text-transparent bg-clip-text`}>
                {value}{unit && <span className="text-base"> {unit}</span>}
            </div>
            <div className="text-white text-2xl mt-2">{label}</div>
            {goal && <div className="text-sm text-white">Goal: {goal}</div>}
        </div>
    );
}
