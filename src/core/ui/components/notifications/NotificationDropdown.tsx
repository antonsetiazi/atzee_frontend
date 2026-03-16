// src/core/ui/components/notifications/NotificationDropdown.tsx

import clsx from "clsx";
import NotificationItem from "./NotificationItem";
import type { NotificationItemData } from "./notifications.types";

interface Props {
    open: boolean;
    items: NotificationItemData[];
}

export default function NotificationDropdown({ open, items }: Props) {
    return (
        <div
            className={clsx(
                "absolute right-0 mt-3 w-80 rounded-lg overflow-hidden",
                "transition-all duration-200 origin-top-right",
                open
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 -translate-y-1 pointer-events-none",
            )}
            style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow)",
            }}
        >
            <div
                className="px-4 py-3 text-sm font-medium border-b"
                style={{
                    borderColor: "var(--color-border)",
                    color: "var(--text-primary)",
                }}
            >
                Notifications
            </div>

            <div className="max-h-80 overflow-auto">
                {items.length === 0 && (
                    <div
                        className="p-6 text-sm text-center"
                        style={{ color: "var(--text-muted)" }}
                    >
                        No notifications
                    </div>
                )}

                {items.map((item) => (
                    <NotificationItem key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}
