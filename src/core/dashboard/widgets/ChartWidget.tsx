/* eslint-disable @typescript-eslint/no-explicit-any */
// src/core/dashboard/widgets/ChartWidget.tsx

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import type { ChartValue } from "../dashboard.types";
import { useElementSize } from "@/core/ui/hooks/useElementSize";

interface Props {
    title: string;
    value: ChartValue;
}

/**
 * Convert ChartValue → Recharts data
 */
function buildChartData(value: ChartValue) {
    return value.labels.map((label, idx) => {
        const row: Record<string, any> = { label };

        value.datasets.forEach((ds) => {
            row[ds.label] = ds.data[idx];
        });

        return row;
    });
}

export default function ChartWidget({ title, value }: Props) {
    const data = buildChartData(value);
    const { ref, width, height } = useElementSize<HTMLDivElement>();

    return (
        <div className="p-5">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    {title}
                </h3>
            </div>

            {/* Chart */}
            <div ref={ref} className="w-full h-72">
                {width > 0 && height > 0 && (
                    <ResponsiveContainer width={width} height={height}>
                        <LineChart data={data}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                className="stroke-gray-200 dark:stroke-gray-800"
                            />
                            <XAxis
                                dataKey="label"
                                tick={{ fontSize: 12 }}
                                className="text-gray-500 dark:text-gray-400"
                            />
                            <YAxis
                                tick={{ fontSize: 12 }}
                                className="text-gray-500 dark:text-gray-400"
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "var(--tw-bg-opacity)",
                                }}
                                wrapperClassName="rounded-md border border-gray-200 bg-white text-sm shadow-sm dark:border-gray-700 dark:bg-gray-900"
                            />
                            <Legend
                                wrapperStyle={{
                                    fontSize: "12px",
                                    paddingTop: "8px",
                                }}
                            />

                            {value.datasets.map((ds) => (
                                <Line
                                    key={ds.label}
                                    type="monotone"
                                    dataKey={ds.label}
                                    strokeWidth={2}
                                    dot={false}
                                />
                            ))}
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}
