// src/modules/notification/components/NotificationMobileButton.tsx

import { useState } from "react";
import Icon from "@/core/ui/icons/Icon";
import { useNotifications } from "../hooks/useNotifications";
import NotificationMobileSheet from "./NotificationMobileSheet";

export default function NotificationMobileButton() {
    const [open, setOpen] = useState(false);

    const notifications = useNotifications();
    const unread = notifications.filter((n) => !n.read).length;

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="relative flex items-center justify-center rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                    width: 42,
                    height: 42,
                    background: "rgba(255,255,255,0.12)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    boxShadow: `
                        0 8px 24px rgba(0,0,0,0.18),
                        inset 0 1px 0 rgba(255,255,255,0.18)
                    `,
                }}
            >
                {/* Soft Glow */}
                <div
                    className="absolute inset-0 rounded-full"
                    style={{
                        boxShadow: "0 0 18px rgba(255,255,255,0.18)",
                    }}
                />

                <Icon name="bell" className="relative text-white" size="md" />

                {unread > 0 && (
                    <span
                        className="absolute -top-1 -right-1 text-[10px] font-semibold px-1.5 py-[1px] rounded-full"
                        style={{
                            background: "#ff4d4f",
                            color: "white",
                            minWidth: 18,
                            textAlign: "center",
                            boxShadow: "0 4px 10px rgba(255,77,79,0.35)",
                        }}
                    >
                        {unread > 99 ? "99+" : unread}
                    </span>
                )}
            </button>

            <NotificationMobileSheet
                open={open}
                onClose={() => setOpen(false)}
            />
        </>
    );
}
