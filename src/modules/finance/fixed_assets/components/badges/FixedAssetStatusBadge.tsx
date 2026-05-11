// src/modules/finance/fixed_assets/components/badges/FixedAssetStatusBadge.tsx

import type { AssetStatus } from "../../types/fixedAsset.types";

type Props = {
    status: AssetStatus | string;
};

export default function FixedAssetStatusBadge({ status }: Props) {
    const config = getStatusConfig(status);

    return (
        <span
            className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium capitalize"
            style={{
                background: config.background,
                color: config.color,
                borderColor: config.border,
            }}
        >
            {config.label}
        </span>
    );
}

// ======================================================
// HELPERS
// ======================================================

function getStatusConfig(status: string) {
    switch (status) {
        case "draft":
            return {
                label: "Draft",
                background: "rgba(245, 158, 11, 0.12)",
                color: "var(--color-warning)",
                border: "rgba(245, 158, 11, 0.25)",
            };

        case "active":
            return {
                label: "Active",
                background: "rgba(16, 185, 129, 0.12)",
                color: "var(--color-success)",
                border: "rgba(16, 185, 129, 0.25)",
            };

        case "disposed":
            return {
                label: "Disposed",
                background: "rgba(239, 68, 68, 0.12)",
                color: "var(--color-error)",
                border: "rgba(239, 68, 68, 0.25)",
            };

        default:
            return {
                label: status,
                background: "var(--color-surface-alt)",
                color: "var(--text-secondary)",
                border: "var(--color-border)",
            };
    }
}
