// src/core/ui/components/status_badge/StatusBadge.tsx

import clsx from "clsx";
import type { ReactNode } from "react";
import type { StatusTone, StatusVariant } from "./status.types";

interface Props {
    children: ReactNode;
    tone?: StatusTone;
    variant?: StatusVariant;
    pulse?: boolean;
    icon?: ReactNode;
}

export default function StatusBadge({
    children,
    tone = "neutral",
    variant = "soft",
    pulse = false,
    icon,
}: Props) {
    const toneStyles = {
        neutral: {
            bg: "var(--color-surface-alt)",
            text: "var(--text-secondary)",
            border: "var(--color-border)",
        },
        success: {
            bg: "color-mix(in srgb, #16a34a 15%, transparent)",
            text: "#16a34a",
            border: "color-mix(in srgb, #16a34a 35%, transparent)",
        },
        warning: {
            bg: "color-mix(in srgb, #f59e0b 15%, transparent)",
            text: "#f59e0b",
            border: "color-mix(in srgb, #f59e0b 35%, transparent)",
        },
        danger: {
            bg: "color-mix(in srgb, #ef4444 15%, transparent)",
            text: "#ef4444",
            border: "color-mix(in srgb, #ef4444 35%, transparent)",
        },
        info: {
            bg: "color-mix(in srgb, #3b82f6 15%, transparent)",
            text: "#3b82f6",
            border: "color-mix(in srgb, #3b82f6 35%, transparent)",
        },
    };

    const style = toneStyles[tone];

    const variantStyles = {
        soft: {
            background: style.bg,
            color: style.text,
            border: `1px solid ${style.border}`,
        },
        solid: {
            background: style.text,
            color: "white",
            border: "1px solid transparent",
        },
        outline: {
            background: "transparent",
            color: style.text,
            border: `1px solid ${style.border}`,
        },
    };

    return (
        <span
            className={clsx(
                "inline-flex items-center gap-1.5",
                "text-xs font-medium",
                "px-2.5 py-1",
                "rounded-full",
                "transition-all duration-200",
                pulse && "animate-pulse",
            )}
            style={{
                borderRadius: "999px",
                ...variantStyles[variant],
            }}
        >
            {icon && <span className="flex items-center">{icon}</span>}

            {children}
        </span>
    );
}
