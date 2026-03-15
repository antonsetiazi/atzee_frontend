// src/core/ui/components/tabs/TabsList.tsx

import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
    className?: string;
}

export default function TabsList({ children, className = "" }: Props) {
    return (
        <div
            className={`
                flex
                gap-1
                border-b
                border-[var(--color-border)]
                ${className}
            `}
        >
            {children}
        </div>
    );
}
