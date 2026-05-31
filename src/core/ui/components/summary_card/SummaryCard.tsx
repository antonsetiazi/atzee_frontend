// src/core/ui/components/summary_card/SummaryCard.tsx

interface Props {
    title: string;
    value: string;
    subtitle?: string;
    tone?: "default" | "success" | "danger" | "warning";
    isMobile?: boolean;
}

export default function SummaryCard({ title, value, subtitle, tone = "default", isMobile }: Props) {
    const toneColor = {
        default: "var(--text-primary)",
        success: "var(--color-success)",
        danger: "var(--color-error)",
        warning: "var(--color-warning)",
    }[tone];

    return (
        <div
            className={`rounded-2xl border transition-all ${isMobile ? "p-3" : "p-5"} `}
            style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border)",
                boxShadow: "var(--shadow)",
            }}
        >
            <div
                className={`flex items-center font-medium ${
                    isMobile ? "min-h-[32px] text-[11px]" : "min-h-[40px] text-sm"
                } `}
                style={{
                    color: "var(--text-secondary)",
                }}
            >
                {title}
            </div>

            <div
                className={`font-bold tracking-tight ${isMobile ? "mt-2 text-lg" : "mt-3 text-2xl"} `}
                style={{
                    color: toneColor,
                }}
            >
                {value}
            </div>

            {subtitle && (
                <div
                    className={` ${isMobile ? "mt-1 text-[10px]" : "mt-2 text-xs"} `}
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
