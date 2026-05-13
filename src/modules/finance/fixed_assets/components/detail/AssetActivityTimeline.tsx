// src/modules/finance/fixed_assets/components/detail/AssetActivityTimeline.tsx

type ActivityItem = {
    id: string;
    title: string;
    description?: string;
    date: string;
    type: "created" | "activated" | "depreciation" | "adjustment" | "disposed";
};

type Props = {
    items: ActivityItem[];
};

export default function AssetActivityTimeline({ items }: Props) {
    return (
        <div
            className="rounded-xl border p-6"
            style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border)",
            }}
        >
            {/* HEADER */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2
                        className="text-lg font-semibold"
                        style={{
                            color: "var(--text-primary)",
                        }}
                    >
                        Asset Activity Timeline
                    </h2>

                    <p
                        className="text-sm"
                        style={{
                            color: "var(--text-secondary)",
                        }}
                    >
                        Full audit trail and lifecycle history.
                    </p>
                </div>
            </div>

            {/* EMPTY */}
            {items.length === 0 && (
                <div
                    className="rounded-2xl border border-dashed p-8 text-center text-sm"
                    style={{
                        borderColor: "var(--color-border)",
                        color: "var(--text-muted)",
                    }}
                >
                    No activity recorded yet.
                </div>
            )}

            {/* TIMELINE */}
            <div className="space-y-6">
                {items.map((item, index) => (
                    <div key={item.id} className="flex gap-4">
                        {/* LEFT LINE */}
                        <div className="flex flex-col items-center">
                            <div
                                className="h-3 w-3 rounded-full"
                                style={{
                                    background: getActivityColor(item.type),
                                }}
                            />

                            {index !== items.length - 1 && (
                                <div
                                    className="mt-1 w-px flex-1"
                                    style={{
                                        background: "var(--color-border)",
                                    }}
                                />
                            )}
                        </div>

                        {/* CONTENT */}
                        <div className="flex-1 pb-6">
                            <div className="flex flex-wrap items-center gap-3">
                                <div
                                    className="font-medium"
                                    style={{
                                        color: "var(--text-primary)",
                                    }}
                                >
                                    {item.title}
                                </div>

                                <Badge type={item.type} />
                            </div>

                            {item.description && (
                                <div
                                    className="mt-1 text-sm leading-relaxed"
                                    style={{
                                        color: "var(--text-secondary)",
                                    }}
                                >
                                    {item.description}
                                </div>
                            )}

                            <div
                                className="mt-2 text-xs"
                                style={{
                                    color: "var(--text-muted)",
                                }}
                            >
                                {formatDate(item.date)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Badge({ type }: { type: ActivityItem["type"] }) {
    return (
        <div
            className="rounded-full px-3 py-1 text-xs font-medium"
            style={{
                background: `${getActivityColor(type)}20`,
                color: getActivityColor(type),
            }}
        >
            {formatType(type)}
        </div>
    );
}

function getActivityColor(type: ActivityItem["type"]) {
    switch (type) {
        case "created":
            return "#3b82f6";

        case "activated":
            return "#10b981";

        case "depreciation":
            return "#f59e0b";

        case "adjustment":
            return "#8b5cf6";

        case "disposed":
            return "#ef4444";

        default:
            return "#94a3b8";
    }
}

function formatType(type: string) {
    return type.replaceAll("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatDate(value: string) {
    return new Intl.DateTimeFormat("id-ID", {
        dateStyle: "medium",
    }).format(new Date(value));
}
