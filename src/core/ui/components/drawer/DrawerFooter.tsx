// src/core/ui/components/drawer/DrawerFooter.tsx

import type { DrawerSectionProps } from "./drawer.types";

export default function DrawerFooter({
    children,
    className = "",
}: DrawerSectionProps) {
    return (
        <div
            className={`
                px-6
                py-4
                border-t
                border-[var(--color-border)]
                flex
                justify-end
                gap-3
                ${className}
            `}
        >
            {children}
        </div>
    );
}
