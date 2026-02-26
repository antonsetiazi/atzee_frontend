// src/core/feedback/ToastRenderer.tsx

import { useEffect } from "react";
import { useFeedbackStore } from "./feedback.store";
import type { FeedbackMessage } from "./feedback.types";

const AUTO_DISMISS_MS = 4000; // 4 detik

export default function ToastRenderer() {
    const { messages, remove } = useFeedbackStore();

    if (messages.length === 0) return null;

    return (
        <div className="fixed top-6 right-6 z-[100] flex w-full max-w-sm flex-col gap-3">
            {messages.map((msg) => (
                <ToastItem
                    key={msg.id}
                    msg={msg}
                    onClose={() => remove(msg.id)}
                />
            ))}
        </div>
    );
}

interface ToastItemProps {
    msg: FeedbackMessage;
    onClose: () => void;
}

function ToastItem({ msg, onClose }: ToastItemProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, AUTO_DISMISS_MS);

        return () => clearTimeout(timer);
    }, [onClose]);

    const variantStyles = {
        success: {
            border: "border-[var(--color-success)]/40",
            accent: "bg-[var(--color-success)]",
        },
        error: {
            border: "border-[var(--color-danger)]/40",
            accent: "bg-[var(--color-danger)]",
        },
        warning: {
            border: "border-[var(--color-warning)]/40",
            accent: "bg-[var(--color-warning)]",
        },
        info: {
            border: "border-[var(--color-primary)]/40",
            accent: "bg-[var(--color-primary)]",
        },
    };

    const style = variantStyles[msg.type] || variantStyles.info;

    return (
        <div
            onClick={onClose}
            className={`
                group
                relative
                cursor-pointer
                overflow-hidden
                rounded-2xl
                border
                ${style.border}
                bg-[var(--color-surface-elevated)]
                px-4
                py-3
                shadow-lg
                backdrop-blur-md
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:shadow-xl
            `}
        >
            {/* Accent bar */}
            <div
                className={`absolute left-0 top-0 h-full w-1 ${style.accent}`}
            />
            <div className="pl-3">
                {msg.title && (
                    <div className="mb-0.5 text-sm font-semibold text-[var(--color-text-primary)]">
                        {msg.title}
                    </div>
                )}
                <div className="text-sm leading-snug text-[var(--color-text-secondary)]">
                    {msg.message}
                </div>
            </div>
        </div>
    );
}
