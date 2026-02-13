/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/entities/blocks/BlockChart.tsx

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
import { useElementSize } from "@/core/ui/hooks/useElementSize";

interface Props {
    block: any;
}

/**
 * Convert ChartValue → Recharts data
 */
function buildChartData(value: any) {
    return value.labels.map((label: string, idx: number) => {
        const row: Record<string, any> = { label };
        value.datasets.forEach((ds: any) => {
            row[ds.label] = ds.data[idx];
        });
        return row;
    });
}

export default function BlockChart({ block }: Props) {
    const data = buildChartData(block.value);
    const { ref, width, height } = useElementSize<HTMLDivElement>();

    return (
        <div ref={ref} className="w-full h-72 p-5">
            {width > 0 && height > 0 && (
                <ResponsiveContainer width={width} height={height}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Legend
                            wrapperStyle={{
                                fontSize: "12px",
                                paddingTop: "8px",
                            }}
                        />
                        {block.value.datasets.map((ds: any) => (
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
    );
}
