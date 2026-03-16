// src/core/ui/components/drawer/DrawerContent.tsx

import type { DrawerSectionProps } from "./drawer.types";

export default function DrawerContent({
    children,
    className = "",
}: DrawerSectionProps) {
    return (
        <div
            className={`
                flex-1
                overflow-auto
                px-6
                py-5
                ${className}
            `}
        >
            {children}
        </div>
    );
}
