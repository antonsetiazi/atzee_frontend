// src/modules/finance/fixed_assets/components/dashboard/AssetCategoryChart.tsx

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { AssetCategorySummary } from "../../types/dashboard.types";

type Props = {
    data: AssetCategorySummary[];
};

export default function AssetCategoryChart({ data }: Props) {
    return (
        <div
            className="min-h-[320px] rounded-2xl border p-4"
            style={{ borderColor: "var(--color-border)" }}
        >
            <div className="mb-3 text-sm font-medium text-[var(--text-primary)]">
                Asset by Category
            </div>

            <ResponsiveContainer width="100%" height={260}>
                <BarChart data={data || []}>
                    <XAxis dataKey="category_name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="asset_count" fill="var(--color-secondary)" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
