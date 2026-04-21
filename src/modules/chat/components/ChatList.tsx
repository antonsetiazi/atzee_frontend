// src/modules/chat/components/ChatList.tsx

import type { ChatRoom, Presence } from "@/business/chat/chat.store";
import { getOtherParticipant } from "../utils/chat.user";

interface Props {
    rooms: ChatRoom[];
    activeRoom?: string;
    onSelect: (id: string) => void;

    getUnread: (roomId: string) => number;
    getPresence: (userId: string) => Presence | undefined;

    currentUserId: string;
}

// 🔥 Helper: ambil user selain kita
// function getOtherUser(room: ChatRoom, currentUserId: string) {
//     return (
//         room.participants.find((p) => p !== currentUserId) ||
//         room.participants[0]
//     );
// }

export default function ChatList({
    rooms,
    activeRoom,
    onSelect,
    getUnread,
    getPresence,
    currentUserId,
}: Props) {
    return (
        <div className="h-full">
            {rooms.map((room) => {
                const unread = getUnread(room.id);

                // 🔥 ambil lawan bicara
                const otherUser = getOtherParticipant(room, currentUserId);

                // const displayName =
                //     typeof otherUser === "string"
                //         ? otherUser
                //         : String(otherUser || "??");

                // 🔥 ambil status online
                const presence = getPresence(otherUser.id);

                return (
                    <div
                        key={room.id}
                        onClick={() => onSelect(room.id)}
                        className={`
                            px-4 py-3 cursor-pointer transition-all
                            flex items-center gap-3
                            border-b
                            ${activeRoom === room.id ? "opacity-100" : "opacity-80 hover:opacity-100"}
                        `}
                        style={{
                            background:
                                activeRoom === room.id
                                    ? "var(--color-surface-alt)"
                                    : "transparent",
                            borderColor: "var(--color-border)",
                        }}
                    >
                        {/* ===================== */}
                        {/* 🔵 AVATAR + ONLINE */}
                        {/* ===================== */}
                        <div className="relative">
                            <div
                                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                                style={{
                                    background: "var(--color-primary)",
                                }}
                            >
                                {otherUser.name.slice(0, 2).toUpperCase()}
                            </div>

                            {/* 🟢 Online Indicator */}
                            {presence?.is_online && (
                                <div
                                    className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2"
                                    style={{
                                        background: "var(--color-success)",
                                        borderColor: "var(--color-surface)",
                                    }}
                                />
                            )}
                        </div>

                        {/* ===================== */}
                        {/* 📄 CONTENT */}
                        {/* ===================== */}
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center">
                                <div className="font-medium truncate">
                                    {otherUser.name}
                                </div>

                                {room.last_timestamp && (
                                    <div className="text-xs text-[var(--text-muted)]">
                                        {new Date(
                                            room.last_timestamp,
                                        ).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </div>
                                )}
                            </div>

                            <div className="text-sm text-[var(--text-muted)] truncate">
                                {room.last_message}
                            </div>
                        </div>

                        {/* ===================== */}
                        {/* 🔴 UNREAD BADGE */}
                        {/* ===================== */}
                        {unread > 0 && (
                            <div
                                className="text-xs px-2 py-1 rounded-full text-white"
                                style={{
                                    background: "var(--color-primary)",
                                }}
                            >
                                {unread}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
