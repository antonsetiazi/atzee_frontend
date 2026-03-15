// src/core/ui/components/card/CardContent.tsx

import type { CardSectionProps } from "./card.types";

export default function CardContent({
    children,
    className = "",
}: CardSectionProps) {
    return (
        <div
            className={`
                px-4
                py-4
                text-sm
                text-[var(--text-primary)]
                ${className}
            `}
        >
            {children}
        </div>
    );
}
