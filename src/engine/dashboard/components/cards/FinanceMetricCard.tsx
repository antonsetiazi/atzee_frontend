// src/modules/dashboard/components/cards/FinanceMetricCard.tsx

import type { DashboardMetric } from "../../types/dashboard.types";

interface Props {
    item: DashboardMetric;
}

export default function FinanceMetricCard({ item }: Props) {
    if (!item) {
        return null;
    }

    return (
        <div
            className="group relative overflow-hidden rounded-[24px] border p-5 transition-all duration-300"
            style={{
                background: `
                    linear-gradient(
                        180deg,
                        rgba(255,255,255,0.96),
                        rgba(255,255,255,0.82)
                    )
                `,

                borderColor: "var(--color-border)",

                boxShadow: `
                    0 8px 24px rgba(15,23,42,0.04),
                    0 2px 6px rgba(15,23,42,0.03)
                `,
            }}
        >
            {/* TOP GLOW */}
            <div
                className="absolute inset-x-0 top-0 h-px"
                style={{
                    background: `
                        linear-gradient(
                            90deg,
                            transparent,
                            color-mix(in srgb, var(--color-primary) 40%, white),
                            transparent
                        )
                    `,
                }}
            />

            {/* LABEL */}
            <div
                className="text-xs font-semibold tracking-[0.14em] uppercase"
                style={{
                    color: "var(--text-muted)",
                }}
            >
                {item.label}
            </div>

            {/* VALUE */}
            <div
                className="mt-3 text-2xl font-black tracking-tight lg:text-3xl"
                style={{
                    color: "var(--text-primary)",
                }}
            >
                {item.value}
            </div>

            {/* GROWTH */}
            <div className="mt-4">
                <div
                    className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                        background: "color-mix(in srgb, var(--color-success) 10%, white)",

                        color: "var(--color-success)",
                    }}
                >
                    {item.growth}
                </div>
            </div>
        </div>
    );
}
