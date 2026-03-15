// src/core/ui/components/button/button.styles.ts

export const base =
    "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 select-none";

export const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-4 py-2 text-sm rounded-lg",
    lg: "px-6 py-3 text-base rounded-xl",
};

export interface ButtonStyle {
    background: string;
    color: string;
    border?: string;
}

export const variants: Record<string, ButtonStyle> = {
    primary: {
        background: "var(--color-primary)",
        color: "#fff",
    },

    secondary: {
        background: "var(--color-surface-alt)",
        color: "var(--text-primary)",
        border: "1px solid var(--color-border)",
    },

    ghost: {
        background: "transparent",
        color: "var(--text-secondary)",
    },

    danger: {
        background: "var(--color-error)",
        color: "#fff",
    },

    success: {
        background: "var(--color-success)",
        color: "#fff",
    },
};
