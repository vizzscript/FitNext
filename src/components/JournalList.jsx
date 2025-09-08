export function JournalList({ journals }) {
    return (
        <div className="space-y-3 max-h-[300px] overflow-y-auto px-4 py-2">
            {journals.map(({ id, title, details, time }) => (
                <div
                    key={id}
                    className="rounded-md p-3 shadow flex justify-between items-center"
                >
                    <div>
                        <div className="font-semibold ">{title}</div>
                        <div className="text-xs ">{details}</div>
                    </div>
                    <div className="text-xs">{time}</div>
                </div>
            ))}
        </div>
    );
}
