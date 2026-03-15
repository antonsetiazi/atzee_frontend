// src/core/ui/components/modal/ModalContent.tsx

import type { ModalSectionProps } from "./modal.types";

export default function ModalContent({
    children,
    className = "",
}: ModalSectionProps) {
    return (
        <div
            className={`
                px-5
                py-5
                text-sm
                text-[var(--text-primary)]
                ${className}
            `}
        >
            {children}
        </div>
    );
}
