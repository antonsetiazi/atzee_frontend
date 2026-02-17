// src/core/feedback/ToastRenderer.tsx

import { useEffect } from "react";
import { useFeedbackStore } from "./feedback.store";
import type { FeedbackMessage } from "./feedback.types";

const AUTO_DISMISS_MS = 4000; // 4 detik

export default function ToastRenderer() {
    const { messages, remove } = useFeedbackStore();

    if (messages.length === 0) return null;

    return (
        <div className="fixed top-4 right-4 z-50 space-y-3">
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

/**
 * Komponen individual toast
 * Bertanggung jawab atas auto-dismiss
 */
function ToastItem({ msg, onClose }: ToastItemProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, AUTO_DISMISS_MS);

        return () => clearTimeout(timer);
    }, [onClose]);

    const variantClasses = {
        success: "bg-green-50 border-green-200 text-green-800",
        error: "bg-red-50 border-red-200 text-red-800",
        warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
        info: "bg-blue-50 border-blue-200 text-blue-800",
    };

    return (
        <div
            onClick={onClose}
            className={`
                cursor-pointer rounded-xl border px-4 py-3 shadow-md
                backdrop-blur-sm
                transition-all duration-200 ease-out
                hover:shadow-lg hover:-translate-y-px]
                ${variantClasses[msg.type] || variantClasses.info}
            `}
        >
            {msg.title && (
                <div className="font-semibold mb-0.5">{msg.title}</div>
            )}
            <div className="text-sm leading-snug opacity-90">{msg.message}</div>
        </div>
    );
}
