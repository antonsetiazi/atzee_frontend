// src/modules/chat/components/ChatWindow.tsx

import { useEffect, useRef, useState } from "react";

import {
    chatStore,
    type ChatRoom,
    type Message,
} from "@/business/chat/chat.store";

import { getOtherParticipant } from "../utils/chat.user";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

import { useSessionStore } from "@/core/session/session.store";
import { chatApi } from "../api/chat.api";

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

/**
 * sementara hardcode
 * nanti bisa dari API context detail
 */
function getContextInfo(room?: ChatRoom) {
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
    const { user } = useSessionStore();

    const currentUserId = String(user?.id || "");

    const [room, setRoom] = useState<ChatRoom | undefined>(() =>
        chatStore.getRooms().find((r) => String(r.id) === String(roomId)),
    );

    const [messages, setMessages] = useState<Message[]>(
        chatStore.getMessages(roomId),
    );

    const [typingUsers, setTypingUsers] = useState<string[]>(
        chatStore.getTypingUsers(roomId),
    );

    const bottomRef = useRef<HTMLDivElement | null>(null);

    const otherUser =
        room && currentUserId ? getOtherParticipant(room, currentUserId) : null;

    const presence = otherUser
        ? chatStore.getPresence(otherUser.id)
        : undefined;

    /**
     * load messages ketika room berubah
     */
    useEffect(() => {
        let mounted = true;

        chatApi.getMessages(roomId).then((msgs: Message[]) => {
            if (!mounted) return;

            chatStore.setMessages(roomId, msgs);
        });

        chatApi.markRead(roomId);

        return () => {
            mounted = false;
        };
    }, [roomId]);

    /**
     * subscribe store
     */
    useEffect(() => {
        const unsubscribe = chatStore.subscribe(() => {
            const nextRoom = chatStore
                .getRooms()
                .find((r) => String(r.id) === String(roomId));

            setRoom((prev) => {
                if (!nextRoom && !prev) return prev;
                if (!nextRoom) return undefined;
                if (!prev) return nextRoom;

                if (
                    prev.id === nextRoom.id &&
                    prev.last_message === nextRoom.last_message &&
                    prev.last_timestamp === nextRoom.last_timestamp
                ) {
                    return prev;
                }

                return nextRoom;
            });

            setMessages([...chatStore.getMessages(roomId)]);
            setTypingUsers(chatStore.getTypingUsers(roomId));
        });

        return unsubscribe;
    }, [roomId]);

    /**
     * auto scroll bawah
     */
    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);

    const context = getContextInfo(room);

    return (
        <div className="flex flex-col h-full">
            {/* ===================================== */}
            {/* HEADER */}
            {/* ===================================== */}
            <div
                className="px-4 py-3 border-b space-y-2"
                style={{
                    borderColor: "var(--color-border)",
                }}
            >
                {/* user header */}
                <div className="flex items-center gap-3">
                    <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                        style={{
                            background: "var(--color-primary)",
                        }}
                    >
                        {otherUser?.name?.slice(0, 2).toUpperCase() || "?"}
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">
                            {otherUser?.name || "Loading..."}
                        </div>

                        <div className="text-xs text-[var(--text-muted)]">
                            {presence?.is_online
                                ? "Online"
                                : "Last seen recently"}
                        </div>
                    </div>
                </div>

                {/* context */}
                {context && (
                    <div
                        className="p-3 rounded-lg border flex items-center justify-between gap-3"
                        style={{
                            borderColor: "var(--color-border)",
                            background: "var(--color-surface-alt)",
                        }}
                    >
                        <div className="min-w-0">
                            <div className="text-sm font-medium truncate">
                                {context.title}
                            </div>

                            {context.price && (
                                <div className="text-xs text-[var(--text-muted)]">
                                    {context.price}
                                </div>
                            )}
                        </div>

                        {room?.context_type === "service" && (
                            <button
                                className="px-3 py-1.5 text-xs rounded-lg font-medium text-white"
                                style={{
                                    background: "var(--color-primary)",
                                }}
                                onClick={() => {
                                    console.log("Go to booking");
                                }}
                            >
                                Booking
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* ===================================== */}
            {/* MESSAGES */}
            {/* ===================================== */}
            <div
                className="flex-1 overflow-y-auto px-4 py-3 space-y-1"
                style={{
                    background: "var(--color-background)",
                }}
            >
                {messages.map((msg, index) => {
                    const prev = messages[index - 1];

                    const isSameSender =
                        prev && prev.sender_id === msg.sender_id;

                    const isSameMinute =
                        prev &&
                        new Date(prev.created_at).getMinutes() ===
                            new Date(msg.created_at).getMinutes();

                    const isGrouped = !!isSameSender && !!isSameMinute;

                    const showDate =
                        !prev ||
                        new Date(prev.created_at).toDateString() !==
                            new Date(msg.created_at).toDateString();

                    return (
                        <div key={msg.id}>
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

                            <MessageBubble
                                message={msg}
                                isGrouped={isGrouped}
                            />
                        </div>
                    );
                })}

                <div ref={bottomRef} />
            </div>

            {/* typing */}
            {typingUsers.length > 0 && (
                <div className="px-4 pb-2 text-sm text-[var(--text-muted)] italic">
                    {typingUsers.length === 1
                        ? `${typingUsers[0]} sedang mengetik...`
                        : "Beberapa orang sedang mengetik..."}
                </div>
            )}

            {/* input */}
            <MessageInput roomId={roomId} />
        </div>
    );
}
