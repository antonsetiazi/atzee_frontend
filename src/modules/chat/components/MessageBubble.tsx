// src/modules/chat/components/MessageBubble.tsx

import type { Message } from "@/business/chat/chat.store";
import { useSessionStore } from "@/core/session/session.store";

interface Props {
    message: Message;
    isGrouped?: boolean;
}

export default function MessageBubble({ message, isGrouped }: Props) {
    const { user } = useSessionStore();
    const currentUserId = String(user?.id || "");

    const isMine = message.sender_id === currentUserId;

    // ================================
    // 🤖 SYSTEM MESSAGE (CENTERED)
    // ================================
    if (message.type === "system") {
        return (
            <div className="flex justify-center my-2">
                <div
                    className="
                    text-xs px-3 py-1 rounded-full
                    animate-[fadeIn_0.2s_ease]
                "
                    style={{
                        background: "var(--color-surface-alt)",
                        color: "var(--text-muted)",
                        border: "1px solid var(--color-border)",
                        fontStyle: "italic",
                    }}
                >
                    {message.content}
                </div>
            </div>
        );
    }

    function CheckIcon({ double = false }: { double?: boolean }) {
        return (
            <span className="flex items-center">
                {/* First check */}
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="20 6 9 17 4 12" />
                </svg>

                {/* Second check */}
                {double && (
                    <svg
                        className="-ml-1"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                )}
            </span>
        );
    }

    function renderStatus(status: string, isMine: boolean) {
        if (!isMine) return null;

        const baseClass = "ml-1 flex items-center";

        if (status === "sending") {
            return <span className="text-[var(--text-muted)]">⏳</span>;
        }

        if (status === "sent") {
            return (
                <span className={`${baseClass} text-[var(--text-muted)]`}>
                    <CheckIcon />
                </span>
            );
        }

        if (status === "delivered") {
            return (
                <span className={`${baseClass} text-[var(--text-secondary)]`}>
                    <CheckIcon double />
                </span>
            );
        }

        if (status === "read") {
            return (
                <span
                    className={`${baseClass}`}
                    style={{
                        color: "var(--color-chat-read)",
                    }}
                >
                    <CheckIcon double />
                </span>
            );
        }

        return null;
    }

    return (
        <div
            className={`
                flex
                ${isMine ? "justify-end" : "justify-start"}
                ${isGrouped ? "mt-1" : "mt-3"}
            `}
        >
            <div
                className="
                    px-4 py-2 max-w-[70%]
                    shadow-sm
                    transition-all duration-200
                    animate-[fadeIn_0.2s_ease]
                "
                style={{
                    background: isMine
                        ? "var(--color-primary)"
                        : "var(--color-surface)",
                    color: isMine ? "#fff" : "var(--text-primary)",
                    borderRadius: isGrouped
                        ? isMine
                            ? "16px 16px 4px 16px"
                            : "16px 16px 16px 4px"
                        : "16px",
                }}
            >
                <div className="text-sm">{message.content}</div>

                <div className="flex items-center justify-end gap-1 mt-1 text-[10px]">
                    <span>
                        {new Date(message.created_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </span>

                    {isMine && (
                        <span>{renderStatus(message.status, isMine)}</span>
                    )}
                </div>
            </div>
        </div>
    );
}
