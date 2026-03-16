// src/core/ui/components/notifications/NotificationBell.tsx

import { useRef, useState } from "react";
import Icon from "@/core/ui/icons/Icon";
import NotificationDropdown from "./NotificationDropdown";
import type { NotificationItemData } from "./notifications.types";
import { useClickOutside } from "@/core/ui/hooks/useClickOutside";

interface Props {
    notifications: NotificationItemData[];
}

export default function NotificationBell({ notifications }: Props) {
    const [open, setOpen] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    useClickOutside(ref, () => setOpen(false));

    const unread = notifications.filter((n) => !n.read).length;

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen((v) => !v)}
                className="relative flex items-center justify-center w-9 h-9 rounded-md transition-all duration-200 hover:scale-105"
                style={{
                    color: "var(--text-secondary)",
                }}
            >
                <Icon name="bell" variant="primary" />

                {unread > 0 && (
                    <span
                        className="absolute -top-1 -right-1 text-[10px] px-1.5 py-[1px] rounded-full"
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
