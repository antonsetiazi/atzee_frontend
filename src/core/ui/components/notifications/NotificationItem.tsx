// src/core/ui/components/notifications/NotificationItem.tsx

import type { NotificationItemData } from "./notifications.types";

interface Props {
    item: NotificationItemData;
}

export default function NotificationItem({ item }: Props) {
    return (
        <div
            className="px-4 py-3 transition-colors cursor-pointer"
            style={{
                background: item.read
                    ? "transparent"
                    : "var(--color-surface-alt)",
            }}
        >
            <div
                className="text-sm font-medium"
                style={{ color: "var(--text-primary)" }}
            >
                {item.title}
            </div>

            {item.description && (
                <div
                    className="text-xs mt-1"
                    style={{ color: "var(--text-muted)" }}
                >
                    {item.description}
                </div>
            )}
        </div>
    );
}
