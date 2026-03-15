// src/core/ui/components/modal/ModalFooter.tsx

import type { ModalSectionProps } from "./modal.types";

export default function ModalFooter({
    children,
    className = "",
}: ModalSectionProps) {
    return (
        <div
            className={`
                px-5
                py-4
                border-t
                border-[var(--color-border)]
                flex
                justify-end
                gap-2
                ${className}
            `}
        >
            {children}
        </div>
    );
}
