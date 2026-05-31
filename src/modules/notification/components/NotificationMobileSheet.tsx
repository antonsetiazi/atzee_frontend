// src/modules/notification/components/NotificationMobileSheet.tsx

import clsx from "clsx";
import { useNotifications } from "../hooks/useNotifications";
import NotificationContent from "./NotificationContent";

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
                    "fixed inset-0 z-50 bg-black/40 transition-opacity duration-200",
                    open ? "opacity-100" : "pointer-events-none opacity-0",
                )}
            />

            {/* Bottom Sheet */}
            <div
                className={clsx(
                    "fixed right-0 bottom-0 left-0 z-50 overflow-hidden rounded-t-3xl transition-transform duration-300",
                    open ? "translate-y-0" : "translate-y-full",
                )}
                style={{
                    background: "var(--color-surface)",
                    maxHeight: "80vh",
                }}
            >
                <div
                    className="mx-auto mt-3 mb-2 h-1.5 w-12 rounded-full"
                    style={{
                        background: "var(--color-border)",
                    }}
                    onClick={onClose}
                />
                <NotificationContent items={items} mobile onClose={onClose} />
            </div>
        </>
    );
}
