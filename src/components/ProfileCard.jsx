export function ProfileCard({ user }) {
    return (
        <div className="bg-white rounded-xl p-6 shadow-md max-w-xs mx-auto md:mx-0">
            <img
                className="mx-auto rounded-full w-24 h-24"
                src={`https://api.dicebear.com/6.x/identicon/svg?seed=${encodeURIComponent(user.name)}`}
                alt={user.name}
            />
            <h2 className="text-center mt-2 text-xl font-semibold">{user.name}</h2>
            <p className="text-center text-gray-500">{user.age} Years, {user.location}</p>
            <div className="grid grid-cols-3 gap-4 mt-4 text-center">
                <div>
                    <div className="text-orange-500 font-bold">{user.weight} kg</div>
                    <div className="text-gray-400 text-sm">Weight</div>
                </div>
                <div>
                    <div className="text-teal-500 font-bold">{user.height} cm</div>
                    <div className="text-gray-400 text-sm">Height</div>
                </div>
                <div>
                    <div className="text-pink-500 font-bold">{user.goal} kg</div>
                    <div className="text-gray-400 text-sm">Goal</div>
                </div>
            </div>
        </div>
    );
}
