// src/modules/dashboard/components/sections/DashboardHero.tsx

import MetricsGrid from "./MetricsGrid";

import type { DashboardHeroData, DashboardMetric } from "../../types/dashboard.types";

interface Props {
    hero: DashboardHeroData;
    metrics: DashboardMetric[];
}

export default function DashboardHero({ hero, metrics }: Props) {
    if (!hero) {
        return null;
    }

    return (
        <div
            className="relative overflow-hidden rounded-[32px] border p-8 lg:p-10"
            style={{
                background: `
                    linear-gradient(
                        135deg,
                        #ffffff 0%,
                        var(--color-surface) 100%
                    )
                `,

                borderColor: "var(--color-border)",

                boxShadow: `
                    0 20px 60px rgba(15,23,42,0.05),
                    0 4px 12px rgba(15,23,42,0.03)
                `,
            }}
        >
            {/* SOFT BACKGROUND GLOW */}
            <div
                className="absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl"
                style={{
                    background: "color-mix(in srgb, var(--color-primary) 10%, transparent)",
                }}
            />

            <div
                className="absolute bottom-0 left-1/3 h-52 w-52 rounded-full blur-3xl"
                style={{
                    background: "color-mix(in srgb, var(--color-accent) 10%, transparent)",
                }}
            />

            {/* CONTENT */}
            <div className="relative z-10 flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
                {/* LEFT */}
                <div className="max-w-2xl">
                    <div
                        className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold tracking-wide"
                        style={{
                            borderColor:
                                "color-mix(in srgb, var(--color-primary) 15%, transparent)",

                            background: "color-mix(in srgb, var(--color-primary) 6%, white)",

                            color: "var(--color-primary)",
                        }}
                    >
                        {hero.greeting}
                    </div>

                    <h1
                        className="mt-6 text-4xl leading-tight font-black tracking-tight lg:text-6xl"
                        style={{
                            color: "var(--text-primary)",
                        }}
                    >
                        {hero.title}
                    </h1>

                    <p
                        className="mt-5 max-w-2xl text-base leading-8 lg:text-lg"
                        style={{
                            color: "var(--text-secondary)",
                        }}
                    >
                        {hero.subtitle}
                    </p>
                </div>

                {/* RIGHT */}
                <MetricsGrid items={metrics} />
            </div>
        </div>
    );
}
