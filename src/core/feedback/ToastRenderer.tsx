// src/core/feedback/ToastRenderer.tsx

import { useEffect } from "react";
import { useFeedbackStore } from "./feedback.store";
import type { FeedbackMessage } from "./feedback.types";

const AUTO_DISMISS_MS = 4000; // 4 detik

export default function ToastRenderer() {
    const { messages, remove } = useFeedbackStore();

    if (messages.length === 0) return null;

    return (
        <div className="fixed top-6 right-6 z-[10000] flex w-full max-w-sm flex-col gap-3">
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
            border: "border-green-200",
            accent: "bg-green-500",
            text: "text-green-700",
        },
        error: {
            border: "border-red-200",
            accent: "bg-red-500",
            text: "text-red-700",
        },
        warning: {
            border: "border-orange-200",
            accent: "bg-orange-500",
            text: "text-orange-700",
        },
        info: {
            border: "border-blue-200",
            accent: "bg-blue-500",
            text: "text-blue-700",
        },
    };

    const style = variantStyles[msg.type] || variantStyles.info;

    return (
        <div
            className={`
                group
                relative
                cursor-pointer
                overflow-hidden
                rounded-2xl
                border
                ${style.border}
                bg-white
                px-4
                py-3
                shadow-[0_10px_25px_rgba(0,0,0,0.12)]
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:shadow-[0_12px_30px_rgba(0,0,0,0.15)]
            `}
        >
            {/* Accent bar */}
            <div
                className={`absolute left-0 top-0 h-full w-1 ${style.accent}`}
            />
            <div className="pl-3">
                {msg.title && (
                    <div className="mb-0.5 text-sm font-semibold text-gray-900">
                        {msg.title}
                    </div>
                )}
                <div className="text-sm leading-snug text-gray-600">
                    {msg.message}
                </div>
            </div>
        </div>
    );
}
