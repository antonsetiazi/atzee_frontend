// src/modules/chat/ChatPage.tsx

import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useChat } from "./hooks/useChat";
import { useBreakpoint } from "@/core/ui/layout/hooks/useBreakpoint";

import ChatList from "./components/ChatList";
import ChatWindow from "./components/ChatWindow";

export default function ChatPage() {
    const { roomId } = useParams();
    const navigate = useNavigate();

    const { isMobile } = useBreakpoint();

    const { rooms, activeRoom, setActiveRoom, getUnread, getPresence } =
        useChat();

    useEffect(() => {
        if (roomId) {
            setActiveRoom(roomId);
        }
    }, [roomId, setActiveRoom]);

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
                                    setActiveRoom(undefined);
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
                                setActiveRoom(id);
                                navigate(`/chat/${id}`);
                            }}
                            getUnread={getUnread}
                            getPresence={getPresence}
                            currentUserId="user_1"
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
                            setActiveRoom(id);
                            navigate(`/chat/${id}`);
                        }}
                        getUnread={getUnread}
                        getPresence={getPresence}
                        currentUserId="user_1"
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
