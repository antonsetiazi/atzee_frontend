// src/core/ui/components/stat_card/StatCard.tsx

import React from "react";

interface StatCardProps {
    title: string;
    value: string | number;
    icon?: React.ReactNode;
    trend?: {
        value: string;
        direction: "up" | "down" | "neutral";
    };
    footer?: React.ReactNode;
    className?: string;
}

export default function StatCard({
    title,
    value,
    icon,
    trend,
    footer,
    className = "",
}: StatCardProps) {
    const trendColor = {
        up: "text-[var(--color-success)]",
        down: "text-[var(--color-error)]",
        neutral: "text-[var(--text-muted)]",
    };

    return (
        <div
            className={`
            relative
            p-5
            rounded-default
            bg-surface
            border border-default
            shadow-default
            transition-all duration-200
            hover:scale-[1.02]
            ${className}
        `}
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div className="text-sm text-secondary">{title}</div>

                {icon && (
                    <div className="flex items-center justify-center text-muted">
                        {icon}
                    </div>
                )}
            </div>

            {/* Value */}
            <div
                className="
                text-2xl
                font-semibold
                tracking-tight
                text-primary
                mb-2
                "
            >
                {value}
            </div>

            {/* Trend */}
            {trend && (
                <div className={`text-xs ${trendColor[trend.direction]}`}>
                    {trend.value}
                </div>
            )}

            {/* Footer */}
            {footer && <div className="mt-3 text-xs text-muted">{footer}</div>}
        </div>
    );
}
