// src/core/ui/views/chat/ChatView.tsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { chatStore } from "@/business/chat/chat.store";
import { useBreakpoint } from "@/core/ui/layout/hooks/useBreakpoint";

import ChatList from "./components/ChatList";
import ChatWindow from "./components/ChatWindow";

export default function ChatView() {
    const { roomId } = useParams();
    const navigate = useNavigate();

    const { isMobile } = useBreakpoint();

    const [rooms, setRooms] = useState(chatStore.getRooms());
    const [activeRoom, setActiveRoom] = useState<string | undefined>(
        chatStore.getActiveRoomId(),
    );

    // ================================
    // 🔥 SUBSCRIBE STORE
    // ================================
    useEffect(() => {
        const unsubscribe = chatStore.subscribe(() => {
            setRooms([...chatStore.getRooms()]);
            setActiveRoom(chatStore.getActiveRoomId());
        });

        return unsubscribe;
    }, []);

    // ================================
    // 🔥 SYNC URL → STORE
    // ================================
    useEffect(() => {
        if (roomId) {
            chatStore.setActiveRoom(roomId);
        }
    }, [roomId]);

    // ================================
    // 📱 MOBILE MODE
    // ================================
    if (isMobile) {
        return (
            <div className="h-[calc(100vh-64px)] flex flex-col min-h-0 bg-[var(--color-background)]">
                {/* ===================== */}
                {/* HEADER */}
                {/* ===================== */}
                <div
                    className="px-4 py-3 font-semibold text-lg border-b"
                    style={{ borderColor: "var(--color-border)" }}
                >
                    {activeRoom ? (
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => {
                                    chatStore.setActiveRoom(undefined);
                                    navigate("/chat");
                                }}
                                className="text-sm"
                            >
                                ←
                            </button>
                            Chat
                        </div>
                    ) : (
                        "Chat"
                    )}
                </div>

                {/* ===================== */}
                {/* CONTENT */}
                {/* ===================== */}
                <div className="flex-1 overflow-hidden">
                    {!activeRoom ? (
                        <ChatList
                            rooms={rooms}
                            activeRoom={activeRoom}
                            onSelect={(id) => {
                                chatStore.setActiveRoom(id);
                                navigate(`/chat/${id}`);
                            }}
                        />
                    ) : (
                        <ChatWindow roomId={activeRoom} />
                    )}
                </div>
            </div>
        );
    }

    // ================================
    // 💻 DESKTOP MODE
    // ================================
    return (
        <div
            className="
                flex h-full min-h-0
                bg-[var(--color-background)]
                text-[var(--text-primary)]
            "
        >
            {/* SIDEBAR */}
            <div
                className="
                    w-[320px]
                    border-r
                    flex flex-col
                "
                style={{
                    background: "var(--color-surface)",
                    borderColor: "var(--color-border)",
                }}
            >
                <div
                    className="p-4 font-semibold text-lg"
                    style={{
                        borderBottom: "1px solid var(--color-border)",
                    }}
                >
                    Chat
                </div>

                <div className="flex-1 overflow-y-auto">
                    <ChatList
                        rooms={rooms}
                        activeRoom={activeRoom}
                        onSelect={(id) => {
                            chatStore.setActiveRoom(id);
                            navigate(`/chat/${id}`);
                        }}
                    />
                </div>
            </div>

            {/* MAIN */}
            <div className="flex-1 flex flex-col">
                {activeRoom ? (
                    <div
                        className="
                            flex-1 flex flex-col
                            m-4 rounded-[var(--radius)]
                            shadow-[var(--shadow)]
                            overflow-hidden
                        "
                        style={{
                            background: "var(--color-surface)",
                        }}
                    >
                        <ChatWindow roomId={activeRoom} />
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full text-center">
                        <div>
                            <div className="text-xl font-semibold mb-2">
                                Welcome to Chat
                            </div>
                            <div className="text-[var(--text-muted)]">
                                Pilih percakapan untuk mulai
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
