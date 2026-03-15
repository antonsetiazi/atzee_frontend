// src/core/ui/components/card/CardFooter.tsx

import type { CardSectionProps } from "./card.types";

export default function CardFooter({
    children,
    className = "",
}: CardSectionProps) {
    return (
        <div
            className={`
                px-4
                py-3
                border-t
                border-[var(--color-border)]
                ${className}
            `}
        >
            {children}
        </div>
    );
}
