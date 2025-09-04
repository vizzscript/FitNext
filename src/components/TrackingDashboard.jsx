// TrackingDashboard.jsx
export function TrackingDashboard({ tracking }) {
    return (
        <div className="bg-white rounded-lg shadow p-4 space-y-4">
            <h3 className="text-xl font-semibold mb-3">Your Progress</h3>
            <div>
                <label className="block text-sm font-medium text-gray-700">Diet Adherence</label>
                <progress value={tracking.dietProgress} max="100" className="w-full h-4 rounded" />
                <p className="text-xs text-gray-500 mt-1">{tracking.dietProgress}% completed</p>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Workout Completion</label>
                <progress value={tracking.workoutProgress} max="100" className="w-full h-4 rounded" />
                <p className="text-xs text-gray-500 mt-1">{tracking.workoutProgress}% completed</p>
            </div>
        </div>
    );
}
