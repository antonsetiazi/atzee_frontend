// src/core/ui/components/modal/Modal.tsx

import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { ModalProps } from "./modal.types";

export default function Modal({
    open,
    onClose,
    children,
    className = "",
}: ModalProps) {
    useEffect(() => {
        function handleKey(e: KeyboardEvent) {
            if (e.key === "Escape") {
                onClose?.();
            }
        }

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose]);

    if (!open) return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
            {/* Backdrop */}
            <div
                onClick={onClose}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Dialog */}
            <div
                className={`
                    relative
                    bg-[var(--color-surface)]
                    border
                    border-[var(--color-border)]
                    rounded-[var(--radius)]
                    shadow-[var(--shadow)]
                    w-[90%] sm:w-full
                    max-w-lg
                    animate-[fadeIn_.15s_ease-out]
                    ${className}
                `}
            >
                {children}
            </div>
        </div>,
        document.body,
    );
}
