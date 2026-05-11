// src/core/ui/components/summary_card/SummaryCard.tsx

interface Props {
    title: string;
    value: string;
    subtitle?: string;
    tone?: "default" | "success" | "danger" | "warning";
}

export default function SummaryCard({ title, value, subtitle, tone = "default" }: Props) {
    const toneColor = {
        default: "var(--text-primary)",
        success: "var(--color-success)",
        danger: "var(--color-error)",
        warning: "var(--color-warning)",
    }[tone];

    return (
        <div
            className="rounded-2xl border p-5 transition-all"
            style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border)",
                boxShadow: "var(--shadow)",
            }}
        >
            <div
                className="text-sm font-medium"
                style={{
                    color: "var(--text-secondary)",
                }}
            >
                {title}
            </div>

            <div
                className="mt-3 text-2xl font-bold tracking-tight"
                style={{
                    color: toneColor,
                }}
            >
                {value}
            </div>

            {subtitle && (
                <div
                    className="mt-2 text-xs"
                    style={{
                        color: "var(--text-muted)",
                    }}
                >
                    {subtitle}
                </div>
            )}
        </div>
    );
}
