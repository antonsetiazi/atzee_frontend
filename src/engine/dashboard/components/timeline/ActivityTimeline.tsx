// src/modules/dashboard/components/timeline/ActivityTimeline.tsx

import type { Activity } from "../../types/dashboard.types";

interface Props {
    items: Activity[];
}

export default function ActivityTimeline({ items }: Props) {
    if (!items?.length) {
        return null;
    }

    return (
        <div className="mt-8 space-y-8">
            {items.map((activity, index) => (
                <div key={activity.id} className="flex gap-4">
                    {/* LEFT TIMELINE */}
                    <div className="flex flex-col items-center">
                        {/* DOT */}
                        <div
                            className="relative flex h-3 w-3 items-center justify-center rounded-full"
                            style={{
                                background: "var(--color-primary)",
                            }}
                        >
                            <div
                                className="absolute h-6 w-6 rounded-full opacity-20"
                                style={{
                                    background: "var(--color-primary)",
                                }}
                            />
                        </div>

                        {/* LINE */}
                        {index !== items.length - 1 && (
                            <div
                                className="mt-2 w-px flex-1"
                                style={{
                                    background: `
                                        linear-gradient(
                                            180deg,
                                            color-mix(in srgb, var(--color-primary) 20%, transparent),
                                            var(--color-border)
                                        )
                                    `,
                                }}
                            />
                        )}
                    </div>

                    {/* CONTENT */}
                    <div className="flex-1 pb-6">
                        {/* TITLE */}
                        <div
                            className="text-sm font-semibold"
                            style={{
                                color: "var(--text-primary)",
                            }}
                        >
                            {activity.title}
                        </div>

                        {/* DESCRIPTION */}
                        <div
                            className="mt-2 text-sm leading-7"
                            style={{
                                color: "var(--text-secondary)",
                            }}
                        >
                            {activity.description}
                        </div>

                        {/* TIME */}
                        <div
                            className="mt-3 text-xs"
                            style={{
                                color: "var(--text-muted)",
                            }}
                        >
                            {activity.time}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
