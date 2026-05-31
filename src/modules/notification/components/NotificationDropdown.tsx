// src/modules/notification/components/NotificationDropdown.tsx

import clsx from "clsx";
import type { Notification } from "../types/notification.types";
import NotificationContent from "./NotificationContent";

interface Props {
    open: boolean;
    items: Notification[];
}

export default function NotificationDropdown({ open, items }: Props) {
    return (
        <div
            className={clsx(
                "absolute right-0 z-50 mt-3 w-80 overflow-hidden rounded-xl",
                "origin-top-right transition-all duration-200",
                open
                    ? "translate-y-0 scale-100 opacity-100"
                    : "pointer-events-none -translate-y-1 scale-95 opacity-0",
            )}
            style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow)",
            }}
        >
            <NotificationContent items={items} />
        </div>
    );
}
