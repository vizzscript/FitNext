import { DietPlans } from "./DietPlans";
import { ProfileCard } from "./ProfileCard";
import { TrackingDashboard } from "./TrackingDashboard";
import { WorkoutPlans } from "./WorkoutPlans";

export function Sidebar({ user, tracking, onUserUpdate }) {
    return (
        <div className="flex flex-col rounded-xl items-center space-y-6 p-4 pt-10">
            <ProfileCard user={user} onSave={onUserUpdate} />
            <DietPlans user={user} />
            <WorkoutPlans user={user} />
            <TrackingDashboard tracking={tracking} />
        </div>
    );
}
