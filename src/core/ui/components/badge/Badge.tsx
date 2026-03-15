// src/core/ui/components/badge/Badge.tsx

import type { BadgeProps } from "./badge.types";

export default function Badge({
    children,
    variant = "soft",
    size = "md",
    color = "primary",
    rounded = true,
    className = "",
}: BadgeProps) {
    const sizeMap = {
        sm: "text-xs px-2 py-0.5",
        md: "text-xs px-2.5 py-1",
        lg: "text-sm px-3 py-1.5",
    };

    const radius = rounded ? "rounded-full" : "rounded-[var(--radius)]";

    const colorMap = {
        primary: {
            solid: "bg-[var(--color-primary)] text-white",
            soft: "bg-[color:color-mix(in_srgb,var(--color-primary)_15%,transparent)] text-[var(--color-primary)]",
            outline:
                "border border-[var(--color-primary)] text-[var(--color-primary)]",
        },
        secondary: {
            solid: "bg-[var(--color-secondary)] text-white",
            soft: "bg-[color:color-mix(in_srgb,var(--color-secondary)_15%,transparent)] text-[var(--color-secondary)]",
            outline:
                "border border-[var(--color-secondary)] text-[var(--color-secondary)]",
        },
        success: {
            solid: "bg-[var(--color-success)] text-white",
            soft: "bg-[color:color-mix(in_srgb,var(--color-success)_15%,transparent)] text-[var(--color-success)]",
            outline:
                "border border-[var(--color-success)] text-[var(--color-success)]",
        },
        warning: {
            solid: "bg-[var(--color-warning)] text-white",
            soft: "bg-[color:color-mix(in_srgb,var(--color-warning)_15%,transparent)] text-[var(--color-warning)]",
            outline:
                "border border-[var(--color-warning)] text-[var(--color-warning)]",
        },
        error: {
            solid: "bg-[var(--color-error)] text-white",
            soft: "bg-[color:color-mix(in_srgb,var(--color-error)_15%,transparent)] text-[var(--color-error)]",
            outline:
                "border border-[var(--color-error)] text-[var(--color-error)]",
        },
        neutral: {
            solid: "bg-[var(--color-surface-alt)] text-[var(--text-primary)]",
            soft: "bg-[var(--color-surface-alt)] text-[var(--text-secondary)]",
            outline:
                "border border-[var(--color-border)] text-[var(--text-secondary)]",
        },
    };

    return (
        <span
            className={`
                inline-flex
                items-center
                font-medium
                leading-none
                ${sizeMap[size]}
                ${radius}
                ${colorMap[color][variant]}
                ${className}
            `}
        >
            {children}
        </span>
    );
}
