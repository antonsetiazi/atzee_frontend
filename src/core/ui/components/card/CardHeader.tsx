// src/core/ui/components/card/CardHeader.tsx

import type { CardSectionProps } from "./card.types";

export default function CardHeader({
    children,
    className = "",
}: CardSectionProps) {
    return (
        <div
            className={`
                px-4
                py-3
                border-b
                border-[var(--color-border)]
                font-semibold
                text-[var(--text-primary)]
                ${className}
            `}
        >
            {children}
        </div>
    );
}
