// src/modules/finance/fixed_assets/components/dashboard/AssetAgingHeatmap.tsx

import { useMemo } from "react";
import type { FixedAsset } from "../../types/fixedAsset.types";
import type { AssetCategorySummary } from "../../types/dashboard.types";

type Props = {
    assets: FixedAsset[];
    categories: AssetCategorySummary[];
};

function getAgeRatio(asset: FixedAsset) {
    const life = asset.useful_life_months || 1;

    const start = new Date(asset.depreciation_start_date);
    const now = new Date();

    const months =
        (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());

    return Math.min(months / life, 1);
}

function getColor(ratio: number) {
    if (ratio >= 0.8) return "bg-red-500";
    if (ratio >= 0.5) return "bg-yellow-400";
    return "bg-green-500";
}

export default function AssetAgingHeatmap({ assets, categories }: Props) {
    const matrix = useMemo(() => {
        return categories.map((cat) => {
            const catAssets = assets.filter((a) => a.category_name === cat.category_name);

            const cells = catAssets.map((asset) => ({
                id: asset.id,
                name: asset.name,
                ratio: getAgeRatio(asset),
            }));

            return {
                category: cat.category_name,
                cells,
            };
        });
    }, [assets, categories]);

    return (
        <div className="rounded-2xl border p-5" style={{ borderColor: "var(--color-border)" }}>
            <div className="mb-4 text-sm font-semibold text-[var(--text-primary)]">
                Asset Aging Heatmap
            </div>

            <div className="space-y-6">
                {matrix.map((row) => (
                    <div key={row.category}>
                        <div className="mb-2 text-xs text-[var(--text-muted)]">{row.category}</div>

                        <div className="flex flex-wrap gap-2">
                            {row.cells.map((cell) => (
                                <div
                                    key={cell.id}
                                    className={`h-8 w-8 rounded-md ${getColor(cell.ratio)}`}
                                    title={`${cell.name} (${Math.round(cell.ratio * 100)}%)`}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 flex gap-4 text-xs text-[var(--text-muted)]">
                <span>🟢 Healthy</span>
                <span>🟡 Warning</span>
                <span>🔴 Critical</span>
            </div>
        </div>
    );
}
