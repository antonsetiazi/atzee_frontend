// src/core/ui/components/modal/ModalHeader.tsx

import type { ModalSectionProps } from "./modal.types";

export default function ModalHeader({
    children,
    className = "",
}: ModalSectionProps) {
    return (
        <div
            className={`
                px-5
                py-4
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
