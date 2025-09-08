// TrackingDashboard.jsx
export function TrackingDashboard({ tracking }) {
    return (
        <div className=" w-full rounded-lg shadow p-4 space-y-4">
            <h3 className="text-xl font-semibold mb-3">Your Progress</h3>
            <div>
                <label className="block text-sm font-medium">Diet Adherence</label>
                <progress value={tracking.dietProgress} max="100" className="w-full h-4 rounded" />
                <p className="text-xs mt-1">{tracking.dietProgress}% completed</p>
            </div>
            <div>
                <label className="block text-sm font-medium ">Workout Completion</label>
                <progress value={tracking.workoutProgress} max="100" className="w-full h-4 rounded" />
                <p className="text-xs mt-1">{tracking.workoutProgress}% completed</p>
            </div>
        </div>
    );
}
