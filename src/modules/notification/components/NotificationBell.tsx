// src/modules/notification/components/NotificationBell.tsx

import { useRef, useState } from "react";
import { notificationSmart } from "../services/notification.smart";
import Icon from "@/core/ui/icons/Icon";
import NotificationDropdown from "./NotificationDropdown";
import { useClickOutside } from "@/core/ui/hooks/useClickOutside";
import { useNotifications } from "../hooks/useNotifications";

export default function NotificationBell() {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useClickOutside(ref, () => setOpen(false));

    // Ambil notification langsung dari store
    const notifications = useNotifications();

    // Hitung unread
    const unread = notifications.filter((n) => !n.read).length;

    // Toggle dropdown
    const handleToggle = () => {
        const next = !open;
        setOpen(next);

        if (next) {
            notificationSmart.refreshNow();
        }
    };

    return (
        <div ref={ref} className="relative">
            <button
                onClick={handleToggle}
                className="relative flex h-9 w-9 items-center justify-center rounded-md transition-all duration-200 hover:scale-105"
                style={{
                    color: "#ffffff",
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                }}
            >
                <Icon name="bell" variant="primary" />

                {unread > 0 && (
                    <span
                        className="absolute -top-1 -right-1 rounded-full px-1.5 py-[1px] text-[10px]"
                        style={{
                            background: "var(--color-error)",
                            color: "white",
                        }}
                    >
                        {unread}
                    </span>
                )}
            </button>

            {/* Dropdown */}

            <NotificationDropdown open={open} items={notifications} />
        </div>
    );
}
