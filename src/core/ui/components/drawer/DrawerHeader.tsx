// src/core/ui/components/drawer/DrawerHeader.tsx

import type { DrawerSectionProps } from "./drawer.types";

export default function DrawerHeader({
    children,
    className = "",
}: DrawerSectionProps) {
    return (
        <div
            className={`
                px-6
                py-4
                border-b
                border-[var(--color-border)]
                text-lg
                font-semibold
                text-[var(--text-primary)]
                ${className}
            `}
        >
            {children}
        </div>
    );
}
