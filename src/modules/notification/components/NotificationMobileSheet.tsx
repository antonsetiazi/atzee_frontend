// src/modules/notification/components/NotificationMobileSheet.tsx

import clsx from "clsx";
import { useNotifications } from "../hooks/useNotifications";
import NotificationItem from "./NotificationItem";

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function NotificationMobileSheet({ open, onClose }: Props) {
    const items = useNotifications();

    return (
        <>
            {/* Overlay */}
            <div
                onClick={onClose}
                className={clsx(
                    "fixed inset-0 bg-black/40 z-50 transition-opacity duration-200",
                    open ? "opacity-100" : "opacity-0 pointer-events-none",
                )}
            />

            {/* Bottom Sheet */}
            <div
                className={clsx(
                    "fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl overflow-hidden transition-transform duration-300",
                    open ? "translate-y-0" : "translate-y-full",
                )}
                style={{
                    background: "var(--color-surface)",
                    maxHeight: "80vh",
                }}
            >
                {/* Header */}
                <div className="p-4 border-b border-[var(--color-border)] font-semibold">
                    Notifications
                </div>

                {/* Body */}
                <div className="overflow-y-auto max-h-[70vh]">
                    {items.length === 0 ? (
                        <div className="p-6 text-center text-sm opacity-70">
                            No notifications
                        </div>
                    ) : (
                        items.map((item) => (
                            <NotificationItem key={item.id} item={item} />
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
