export function JournalList({ journals }) {
    return (
        <div className="space-y-3 max-h-[300px] overflow-y-auto px-4 py-2">
            {journals.map(({ id, title, details, time }) => (
                <div
                    key={id}
                    className="bg-gray-50 dark:bg-gray-800 rounded-md p-3 shadow flex justify-between items-center"
                >
                    <div>
                        <div className="font-semibold text-gray-700 dark:text-gray-200">{title}</div>
                        <div className="text-xs text-gray-400 dark:text-gray-400">{details}</div>
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-400">{time}</div>
                </div>
            ))}
        </div>
    );
}
