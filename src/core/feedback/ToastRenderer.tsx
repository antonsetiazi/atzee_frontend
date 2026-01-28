/* eslint-disable @typescript-eslint/no-explicit-any */
// src/core/feedback/ToastRenderer.tsx

import { useEffect } from "react";
import { useFeedbackStore } from "./feedback.store";

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

/**
 * Komponen individual toast
 * Bertanggung jawab atas auto-dismiss
 */
function ToastItem({ msg, onClose }: { msg: any; onClose: () => void }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, AUTO_DISMISS_MS);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            onClick={onClose}
            className={`
                cursor-pointer rounded-lg px-4 py-3 shadow-lg text-white
                transition-all duration-300 ease-out
                hover:opacity-90 hover:scale-[0.98]
                ${msg.type === "success" && "bg-green-600"}
                ${msg.type === "error" && "bg-red-600"}
                ${msg.type === "warning" && "bg-yellow-500 text-black"}
                ${msg.type === "info" && "bg-blue-600"}
            `}
        >
            {msg.title && (
                <div className="font-semibold mb-0.5">{msg.title}</div>
            )}
            <div className="text-sm leading-snug">{msg.message}</div>
        </div>
    );
}
