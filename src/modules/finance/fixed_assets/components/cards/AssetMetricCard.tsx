// src/modules/finance/fixed_assets/components/cards/AssetMetricCard.tsx

import type { ReactNode } from "react";

type Props = {
    label: string;
    value: string;
    change?: string;
    positive?: boolean;
    icon?: ReactNode;
};

export default function AssetMetricCard({ label, value, change, positive = true, icon }: Props) {
    return (
        <div
            className="rounded-2xl border p-5 transition-all"
            style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border)",
            }}
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                    <div
                        className="text-sm font-medium"
                        style={{
                            color: "var(--text-secondary)",
                        }}
                    >
                        {label}
                    </div>

                    <div
                        className="mt-2 text-2xl font-bold"
                        style={{
                            color: "var(--text-primary)",
                        }}
                    >
                        {value}
                    </div>
                </div>

                {icon && (
                    <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{
                            background: "var(--color-surface-alt)",

                            color: "var(--color-primary)",
                        }}
                    >
                        {icon}
                    </div>
                )}
            </div>

            {change && (
                <div
                    className="mt-4 text-sm font-medium"
                    style={{
                        color: positive ? "var(--color-success)" : "var(--color-error)",
                    }}
                >
                    {change}
                </div>
            )}
        </div>
    );
}
