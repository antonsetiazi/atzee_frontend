// src/modules/finance/fixed_assets/components/dashboard/DepreciationTrendChart.tsx

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { MonthlyDepreciationSummary } from "../../types/dashboard.types";

type Props = {
    data: MonthlyDepreciationSummary[];
};

export default function DepreciationTrendChart({ data }: Props) {
    return (
        <div
            className="min-h-[320px] rounded-2xl border p-4"
            style={{ borderColor: "var(--color-border)" }}
        >
            <div className="mb-3 text-sm font-medium text-[var(--text-primary)]">
                Depreciation Trend
            </div>

            <ResponsiveContainer width="100%" height={260}>
                <LineChart data={data || []}>
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="depreciation_amount"
                        stroke="var(--color-primary)"
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
