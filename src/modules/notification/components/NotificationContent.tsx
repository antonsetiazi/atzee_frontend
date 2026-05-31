// src/modules/notification/components/NotificationContent.tsx

import NotificationItem from "./NotificationItem";
import { notificationService } from "../services/notification.service";
import type { Notification } from "../types/notification.types";
import { X } from "lucide-react";

interface Props {
    items: Notification[];
    mobile?: boolean;
    onClose?: () => void;
}

export default function NotificationContent({ items, mobile = false, onClose }: Props) {
    return (
        <>
            {/* Header */}
            <div
                className="flex items-center justify-between border-b px-4 py-3"
                style={{
                    borderColor: "var(--color-border)",
                }}
            >
                <div className="flex items-center gap-2">
                    <div
                        className={`font-semibold ${mobile ? "text-lg" : "text-sm"}`}
                        style={{
                            color: "var(--text-primary)",
                        }}
                    >
                        Notifications
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {items.length > 0 && (
                        <>
                            <button
                                onClick={() => notificationService.inbox.markAllAsRead()}
                                className={`rounded-full transition-colors ${
                                    mobile ? "px-3 py-1.5 text-xs" : "text-xs hover:underline"
                                } `}
                                style={{
                                    background: mobile ? "var(--color-surface-alt)" : undefined,
                                    color: "var(--text-muted)",
                                }}
                            >
                                Read All
                            </button>

                            <button
                                onClick={() => notificationService.inbox.clearAll()}
                                className={`rounded-full transition-colors ${
                                    mobile ? "px-3 py-1.5 text-xs" : "text-xs hover:underline"
                                } `}
                                style={{
                                    background: mobile ? "var(--color-surface-alt)" : undefined,
                                    color: "var(--text-muted)",
                                }}
                            >
                                Clear All
                            </button>
                        </>
                    )}

                    {mobile && onClose && (
                        <button
                            onClick={onClose}
                            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors"
                            style={{
                                background: "var(--color-surface-alt)",
                            }}
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>
            </div>

            {/* Body */}
            <div className={mobile ? "max-h-[70vh] overflow-y-auto" : "max-h-96 overflow-auto"}>
                {items.length === 0 ? (
                    <div
                        className="p-6 text-center text-sm"
                        style={{
                            color: "var(--text-muted)",
                        }}
                    >
                        No notifications
                    </div>
                ) : (
                    items.map((item) => (
                        <NotificationItem key={item.id} item={item} mobile={mobile} />
                    ))
                )}
            </div>
        </>
    );
}
