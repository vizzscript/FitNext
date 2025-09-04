export function RecentWorkoutTable({ workouts }) {
    return (
        <table className="w-full text-left border-separate border-spacing-y-2 mt-4">
            <thead>
                <tr className="text-gray-500 text-xs uppercase">
                    <th>Workout</th>
                    <th>Distance (kms)</th>
                    <th>Duration (mins)</th>
                    <th>Date & Time</th>
                    <th>Completion</th>
                </tr>
            </thead>
            <tbody>
                {workouts.map(({ id, name, distance, duration, datetime, completion }) => (
                    <tr key={id} className="bg-white rounded shadow">
                        <td className="p-2">{name}</td>
                        <td className="p-2">{distance}</td>
                        <td className="p-2">{duration}</td>
                        <td className="p-2">{datetime}</td>
                        <td className="p-2 text-orange-600">{completion}%</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
