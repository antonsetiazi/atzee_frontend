// src/modules/finance/fixed_assets/components/cards/FixedAssetSummaryCard.tsx

import type { ReactNode } from "react";

type Props = {
    title: string;
    value: string;
    subtitle?: string;
    icon?: ReactNode;
};

export default function FixedAssetSummaryCard({ title, value, subtitle, icon }: Props) {
    return (
        <div
            className="rounded-2xl border p-6 transition-all"
            style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border)",
            }}
        >
            {/* ================================= */}
            {/* HEADER */}
            {/* ================================= */}

            <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                    <div
                        className="text-sm font-medium"
                        style={{
                            color: "var(--text-secondary)",
                        }}
                    >
                        {title}
                    </div>

                    <div
                        className="mt-3 text-3xl font-bold tracking-tight"
                        style={{
                            color: "var(--text-primary)",
                        }}
                    >
                        {value}
                    </div>

                    {subtitle && (
                        <div
                            className="mt-2 text-sm"
                            style={{
                                color: "var(--text-muted)",
                            }}
                        >
                            {subtitle}
                        </div>
                    )}
                </div>

                {icon && (
                    <div
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                        style={{
                            background: "var(--color-surface-alt)",

                            color: "var(--color-primary)",
                        }}
                    >
                        {icon}
                    </div>
                )}
            </div>
        </div>
    );
}
