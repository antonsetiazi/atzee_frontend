// src/core/ui/class/field.ui.class.ts

export const inputBase = `
    w-full
    rounded-xl
    border
    bg-white
    px-3.5
    py-2.5
    text-sm
    text-[var(--color-text-primary)]
    border-[var(--color-border)]
    placeholder:text-gray-400
    transition-all
    duration-200
    focus:outline-none
    focus:ring-2
    focus:ring-[var(--color-primary)]/20
    focus:border-[var(--color-primary)]
    disabled:bg-[var(--color-surface-muted)]
    disabled:text-[var(--color-text-muted)]
    disabled:cursor-not-allowed
`;

export const inputError = `
    border-[var(--color-danger)]
    focus:ring-[var(--color-danger)]/20
    focus:border-[var(--color-danger)]
`;
