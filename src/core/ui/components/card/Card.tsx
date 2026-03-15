// src/core/ui/components/card/Card.tsx

import type { CardProps } from "./card.types";

export default function Card({ children, className = "" }: CardProps) {
    return (
        <div
            className={`
                bg-[var(--color-surface)]
                border border-[var(--color-border)]
                rounded-[var(--radius)]
                shadow-[var(--shadow)]
                overflow-hidden
                ${className}
            `}
        >
            {children}
        </div>
    );
}
