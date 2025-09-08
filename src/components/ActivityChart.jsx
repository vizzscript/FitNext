import {
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

export function ActivityChart({ data }) {
    return (
        <ResponsiveContainer width="100%" height={300} >
            <LineChart data={data}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
                <Line type="monotone" dataKey="diet" stroke="#4299e1" />
                <Line type="monotone" dataKey="workout" stroke="#d53f8c" />
            </LineChart>
        </ResponsiveContainer>
    );
}
