// src/modules/chat/components/ChatWindow.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef, useState } from "react";
import { chatStore } from "@/business/chat/chat.store";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

function formatDateLabel(dateStr: string) {
    const date = new Date(dateStr);
    const today = new Date();

    const isToday = date.toDateString() === today.toDateString();

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isYesterday = date.toDateString() === yesterday.toDateString();

    if (isToday) return "Hari ini";
    if (isYesterday) return "Kemarin";

    return date.toLocaleDateString();
}

// 🔥 TEMP CONTEXT RESOLVER (nanti diganti API)
function getContextInfo(room: any) {
    if (room?.context_type === "service") {
        return {
            title: "Tahsin & Tahfidz",
            price: "Rp 50.000 / sesi",
        };
    }

    if (room?.context_type === "booking") {
        return {
            title: "Booking Jadwal",
            price: "",
        };
    }

    return null;
}

export default function ChatWindow({ roomId }: { roomId: string }) {
    const [messages, setMessages] = useState(chatStore.getMessages(roomId));
    const [typingUsers, setTypingUsers] = useState<string[]>([]);
    const bottomRef = useRef<HTMLDivElement | null>(null);

    const room = chatStore.getRooms().find((r) => r.id === roomId);
    const otherUser = room?.participants.find((p) => p !== "user_1");
    const presence = otherUser ? chatStore.getPresence(otherUser) : null;

    useEffect(() => {
        return chatStore.subscribe(() => {
            setMessages([...chatStore.getMessages(roomId)]);
            setTypingUsers(chatStore.getTypingUsers(roomId));
        });
    }, [roomId]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex flex-col h-full">
            {/* ===================== */}
            {/* 🔥 HEADER UPGRADE */}
            {/* ===================== */}
            <div
                className="px-4 py-3 border-b space-y-2"
                style={{ borderColor: "var(--color-border)" }}
            >
                {/* TOP: USER */}
                <div className="flex items-center gap-3">
                    <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                        style={{ background: "var(--color-primary)" }}
                    >
                        {otherUser?.slice(0, 2).toUpperCase()}
                    </div>

                    <div className="flex-1">
                        <div className="font-medium">{otherUser}</div>
                        <div className="text-xs text-[var(--text-muted)]">
                            {presence?.is_online ? "Online" : "Offline"}
                        </div>
                    </div>
                </div>

                {/* ===================== */}
                {/* 🔥 CONTEXT (SERVICE / BOOKING) */}
                {/* ===================== */}
                {(() => {
                    const ctx = getContextInfo(room);

                    if (!ctx) return null;

                    return (
                        <div
                            className="
                    p-3 rounded-lg border
                    flex items-center justify-between
                    gap-3
                "
                            style={{
                                borderColor: "var(--color-border)",
                                background: "var(--color-surface-alt)",
                            }}
                        >
                            <div className="min-w-0">
                                <div className="text-sm font-medium truncate">
                                    {ctx.title}
                                </div>
                                {ctx.price && (
                                    <div className="text-xs text-[var(--text-muted)]">
                                        {ctx.price}
                                    </div>
                                )}
                            </div>

                            {/* CTA */}
                            {room?.context_type === "service" && (
                                <button
                                    className="
                            px-3 py-1.5 text-xs rounded-lg font-medium
                            text-white
                        "
                                    style={{
                                        background: "var(--color-primary)",
                                    }}
                                    onClick={() => {
                                        // 🔥 nanti redirect ke booking
                                        console.log("Go to booking");
                                    }}
                                >
                                    Booking
                                </button>
                            )}
                        </div>
                    );
                })()}
            </div>

            {/* MESSAGES */}
            <div
                className="flex-1 overflow-y-auto px-4 py-3 space-y-1"
                style={{ background: "var(--color-background)" }}
            >
                {messages.map((msg, index) => {
                    const prev = messages[index - 1];

                    // =========================
                    // 🔥 GROUPING LOGIC
                    // =========================
                    const isSameSender =
                        prev && prev.sender_id === msg.sender_id;

                    const isSameMinute =
                        prev &&
                        new Date(prev.created_at).getMinutes() ===
                            new Date(msg.created_at).getMinutes();

                    const isGrouped = isSameSender && isSameMinute;

                    // =========================
                    // 🔥 DATE SEPARATOR
                    // =========================
                    const showDate =
                        !prev ||
                        new Date(prev.created_at).toDateString() !==
                            new Date(msg.created_at).toDateString();

                    return (
                        <div key={msg.id}>
                            {/* 📅 DATE */}
                            {showDate && (
                                <div className="flex justify-center my-3">
                                    <div
                                        className="px-3 py-1 text-xs rounded-full"
                                        style={{
                                            background:
                                                "var(--color-surface-alt)",
                                            color: "var(--text-muted)",
                                        }}
                                    >
                                        {formatDateLabel(msg.created_at)}
                                    </div>
                                </div>
                            )}

                            {/* 💬 MESSAGE */}
                            <MessageBubble
                                message={msg}
                                isGrouped={isGrouped}
                            />
                        </div>
                    );
                })}

                <div ref={bottomRef} />
            </div>

            {typingUsers.length > 0 && (
                <div className="px-4 pb-2 text-sm text-[var(--text-muted)] italic">
                    {typingUsers.length === 1
                        ? `${typingUsers[0]} sedang mengetik...`
                        : "Beberapa orang sedang mengetik..."}
                </div>
            )}

            {/* INPUT */}
            <MessageInput roomId={roomId} />
        </div>
    );
}
