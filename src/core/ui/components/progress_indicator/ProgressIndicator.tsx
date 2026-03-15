// src/core/ui/components/progress_indicator/ProgressIndicator.tsx

import type { ProgressIndicatorProps } from "./progress_indicator.types";

export default function ProgressIndicator({
    value = 0,
    max = 100,
    variant = "bar",
    size = "md",
    label,
    className = "",
}: ProgressIndicatorProps) {
    const percent = Math.min(100, Math.max(0, (value / max) * 100));

    const sizeMap = {
        sm: "h-1.5",
        md: "h-2.5",
        lg: "h-4",
    };

    if (variant === "circle") {
        const radius = 22;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percent / 100) * circumference;

        return (
            <div className={`relative w-[60px] h-[60px] ${className}`}>
                <svg className="rotate-[-90deg]" width="60" height="60">
                    <circle
                        cx="30"
                        cy="30"
                        r={radius}
                        strokeWidth="4"
                        fill="transparent"
                        className="stroke-[var(--color-surface-alt)]"
                    />

                    <circle
                        cx="30"
                        cy="30"
                        r={radius}
                        strokeWidth="4"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        className="stroke-[var(--color-primary)] transition-all duration-300"
                    />
                </svg>

                {label && (
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-[var(--text-primary)]">
                        {label}
                    </div>
                )}
            </div>
        );
    }

    if (variant === "indeterminate") {
        return (
            <div className={`w-full flex flex-col gap-1 ${className}`}>
                <div
                    className={`relative w-full overflow-hidden rounded-[var(--radius)] bg-[var(--color-surface-alt)] ${sizeMap[size]}`}
                >
                    <div
                        className="absolute h-full w-[40%] animate-[progress-indeterminate_1.2s_infinite]"
                        style={{
                            background:
                                "linear-gradient(90deg, transparent, var(--color-primary), transparent)",
                        }}
                    />
                </div>

                {label && (
                    <span className="text-xs text-[var(--text-secondary)]">
                        {label}
                    </span>
                )}
            </div>
        );
    }

    return (
        <div className={`w-full flex flex-col gap-1 ${className}`}>
            <div
                className={`w-full rounded-[var(--radius)] bg-[var(--color-surface-alt)] overflow-hidden ${sizeMap[size]}`}
            >
                <div
                    className="h-full transition-all duration-300"
                    style={{
                        width: `${percent}%`,
                        background:
                            "linear-gradient(90deg, var(--color-primary), var(--color-accent))",
                    }}
                />
            </div>

            {label && (
                <span className="text-xs text-[var(--text-secondary)]">
                    {label}
                </span>
            )}
        </div>
    );
}
