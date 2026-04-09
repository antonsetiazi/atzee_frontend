// src/modules/notification/components/NotificationDropdown.tsx

import clsx from "clsx";
import NotificationItem from "./NotificationItem";
import type { Notification } from "../types/notification.types";
import { notificationService } from "../services/notification.service";

interface Props {
    open: boolean;
    items: Notification[];
}

export default function NotificationDropdown({ open, items }: Props) {
    return (
        <div
            className={clsx(
                "absolute right-0 mt-3 w-80 rounded-xl overflow-hidden z-50",
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
            {/* Header */}
            <div
                className="px-4 py-3 flex items-center justify-between border-b"
                style={{
                    borderColor: "var(--color-border)",
                }}
            >
                <div
                    className="text-sm font-semibold"
                    style={{
                        color: "var(--text-primary)",
                    }}
                >
                    Notifications
                </div>

                {items.length > 0 && (
                    <button
                        onClick={() => notificationService.inbox.clearAll()}
                        className="text-xs hover:underline"
                        style={{
                            color: "var(--text-muted)",
                        }}
                    >
                        Clear all
                    </button>
                )}
            </div>

            {/* Body */}
            <div className="max-h-96 overflow-auto">
                {items.length === 0 ? (
                    <div
                        className="p-6 text-sm text-center"
                        style={{
                            color: "var(--text-muted)",
                        }}
                    >
                        No notifications
                    </div>
                ) : (
                    items.map((item) => (
                        <NotificationItem key={item.id} item={item} />
                    ))
                )}
            </div>
        </div>
    );
}
