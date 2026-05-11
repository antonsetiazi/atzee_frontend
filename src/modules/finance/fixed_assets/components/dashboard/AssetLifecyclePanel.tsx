// src/modules/finance/fixed_assets/components/dashboard/AssetLifecyclePanel.tsx

import { useMemo } from "react";
import type { FixedAsset } from "../../types/fixedAsset.types";

type Props = {
    assets: FixedAsset[];
};

function getLifecycleStatus(asset: FixedAsset) {
    const life = asset.useful_life_months || 1;
    const ageMonths = getAgeInMonths(asset.depreciation_start_date);

    const ratio = ageMonths / life;

    if (asset.status === "disposed") return "disposed";
    if (asset.status === "fully_depreciated") return "fully_depreciated";
    if (ratio >= 0.8) return "critical";
    if (ratio >= 0.5) return "warning";
    return "healthy";
}

// helper sederhana
function getAgeInMonths(startDate: string) {
    const start = new Date(startDate);
    const now = new Date();

    const years = now.getFullYear() - start.getFullYear();
    const months = now.getMonth() - start.getMonth();

    return years * 12 + months;
}

export default function AssetLifecyclePanel({ assets }: Props) {
    const summary = useMemo(() => {
        const result = {
            healthy: 0,
            warning: 0,
            critical: 0,
            fully_depreciated: 0,
            disposed: 0,
        };

        assets.forEach((asset) => {
            const status = getLifecycleStatus(asset);
            result[status]++;
        });

        return result;
    }, [assets]);

    return (
        <div className="rounded-2xl border p-5" style={{ borderColor: "var(--color-border)" }}>
            <div className="mb-4 text-sm font-semibold text-[var(--text-primary)]">
                Asset Lifecycle Overview
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
                <LifecycleCard label="Healthy" value={summary.healthy} tone="green" />
                <LifecycleCard label="Warning" value={summary.warning} tone="yellow" />
                <LifecycleCard label="Critical" value={summary.critical} tone="red" />
                <LifecycleCard
                    label="Fully Depreciated"
                    value={summary.fully_depreciated}
                    tone="gray"
                />
                <LifecycleCard label="Disposed" value={summary.disposed} tone="slate" />
            </div>
        </div>
    );
}

function LifecycleCard({
    label,
    value,
    tone,
}: {
    label: string;
    value: number;
    tone: "green" | "yellow" | "red" | "gray" | "slate";
}) {
    const colorMap: Record<string, string> = {
        green: "text-green-500",
        yellow: "text-yellow-500",
        red: "text-red-500",
        gray: "text-gray-400",
        slate: "text-slate-500",
    };

    return (
        <div className="rounded-xl border border-[var(--color-border)] p-3">
            <div className={`text-xl font-bold ${colorMap[tone]}`}>{value}</div>
            <div className="text-xs text-[var(--text-muted)]">{label}</div>
        </div>
    );
}
