// src/core/ui/components/drawer/Drawer.tsx

import { useEffect } from "react";
import type { DrawerProps } from "./drawer.types";

export default function Drawer({
    open,
    onClose,
    children,
    width = "420px",
}: DrawerProps) {
    // ESC close
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose?.();
            }
        };

        if (open) {
            window.addEventListener("keydown", handler);
        }

        return () => {
            window.removeEventListener("keydown", handler);
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <div
                className="
                    absolute
                    inset-0
                    bg-black/40
                    backdrop-blur-sm
                "
                onClick={onClose}
            />

            {/* Drawer Panel */}
            <div
                style={{ width }}
                className="
                    absolute
                    right-0
                    top-0
                    h-full
                    bg-[var(--color-surface)]
                    shadow-2xl
                    flex
                    flex-col
                    animate-slideIn
                    z-10
                "
            >
                {children}
            </div>
        </div>
    );
}
