// src/business/chat/chat.store.ts

export type MessageStatus = "sending" | "sent" | "delivered" | "read";

export interface Message {
    id: string;
    room_id: string;
    sender_id: string;
    type: "text" | "image" | "file" | "system";
    content: string;
    created_at: string;
    status: MessageStatus;
}

export interface ChatRoom {
    id: string;
    type: "direct" | "transactional";
    participants: string[];

    context_type?: "order" | "booking" | "service";
    context_id?: string;

    last_message?: string;
    last_timestamp?: string;
}

export interface Presence {
    user_id: string;
    is_online: boolean;
    last_seen?: string;
}

type Listener = () => void;

class ChatStore {
    private rooms: Record<string, ChatRoom> = {};
    private messages: Record<string, Message[]> = {};
    private unreadCounts: Record<string, number> = {};
    private typingUsers: Record<string, Set<string>> = {};
    private presence: Record<string, Presence> = {};

    private activeRoomId?: string;

    private listeners: Listener[] = [];

    // ================================
    // 🔔 SUBSCRIBE
    // ================================
    subscribe(listener: Listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }

    private emit() {
        this.listeners.forEach((l) => l());
    }

    // ================================
    // 🏠 ROOM
    // ================================
    createRoom(room: ChatRoom) {
        // ❗ jangan overwrite kalau sudah ada
        if (this.rooms[room.id]) return;

        this.rooms[room.id] = room;

        if (!this.unreadCounts[room.id]) {
            this.unreadCounts[room.id] = 0;
        }

        this.emit();
    }

    setRooms(rooms: ChatRoom[]) {
        rooms.forEach((room) => {
            this.rooms[room.id] = {
                ...this.rooms[room.id],
                ...room,
            };

            if (!this.unreadCounts[room.id]) {
                this.unreadCounts[room.id] = 0;
            }
        });

        this.emit();
    }

    getRooms(): ChatRoom[] {
        return Object.values(this.rooms).sort((a, b) =>
            (b.last_timestamp || "").localeCompare(a.last_timestamp || ""),
        );
    }

    setActiveRoom(roomId?: string) {
        this.activeRoomId = roomId;

        // reset unread saat dibuka
        if (roomId) {
            this.unreadCounts[roomId] = 0;
        }

        this.emit();
    }

    getActiveRoomId() {
        return this.activeRoomId;
    }

    // ================================
    // 💬 MESSAGE
    // ================================
    setMessages(roomId: string, msgs: Message[]) {
        this.messages[roomId] = this.deduplicate(msgs);
        this.emit();
    }

    addMessage(roomId: string, msg: Message) {
        if (!this.messages[roomId]) {
            this.messages[roomId] = [];
        }

        // deduplicate
        const exists = this.messages[roomId].some((m) => m.id === msg.id);
        if (exists) return;

        this.messages[roomId].push(msg);

        // update room preview
        const room = this.rooms[roomId];
        if (room) {
            room.last_message = msg.content;
            room.last_timestamp = msg.created_at;
        }

        // unread logic
        if (this.activeRoomId !== roomId) {
            this.unreadCounts[roomId] = (this.unreadCounts[roomId] || 0) + 1;
        }

        this.emit();
    }

    addSystemMessage(roomId: string, content: string) {
        this.addMessage(roomId, {
            id: `sys-${Date.now()}`,
            room_id: roomId,
            sender_id: "system",
            type: "system",
            content,
            created_at: new Date().toISOString(),
            status: "sent",
        });
    }

    updateMessageStatus(
        roomId: string,
        messageId: string,
        status: MessageStatus,
    ) {
        const msgs = this.messages[roomId];
        if (!msgs) return;

        const msg = msgs.find((m) => m.id === messageId);
        if (msg) {
            msg.status = status;
            this.emit();
        }
    }

    getMessages(roomId: string): Message[] {
        return this.messages[roomId] || [];
    }

    // ================================
    // ✍️ TYPING
    // ================================
    setTyping(roomId: string, userId: string, isTyping: boolean) {
        if (!this.typingUsers[roomId]) {
            this.typingUsers[roomId] = new Set();
        }

        if (isTyping) {
            this.typingUsers[roomId].add(userId);
        } else {
            this.typingUsers[roomId].delete(userId);
        }

        this.emit();
    }

    getTypingUsers(roomId: string): string[] {
        return Array.from(this.typingUsers[roomId] || []);
    }

    // ================================
    // 🟢 PRESENCE
    // ================================
    setPresence(p: Presence) {
        this.presence[p.user_id] = p;
        this.emit();
    }

    getPresence(userId: string): Presence | undefined {
        return this.presence[userId];
    }

    // ================================
    // 🔢 UNREAD
    // ================================
    getUnread(roomId: string): number {
        return this.unreadCounts[roomId] || 0;
    }

    getTotalUnread(): number {
        return Object.values(this.unreadCounts).reduce((a, b) => a + b, 0);
    }

    // ================================
    // 🧠 UTIL
    // ================================
    private deduplicate(messages: Message[]): Message[] {
        const map = new Map<string, Message>();
        messages.forEach((m) => map.set(m.id, m));
        return Array.from(map.values());
    }
}

export const chatStore = new ChatStore();
