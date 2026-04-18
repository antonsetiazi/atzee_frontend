// src/modules/notification/components/NotificationToastContainer.tsx

import NotificationToastItem from "./NotificationToastItem";
import { useToastNotifications } from "../hooks/useToastNotifications";

export default function NotificationToastContainer() {
    const items = useToastNotifications();

    return (
        <div className="fixed top-4 right-4 z-[9999] space-y-3">
            {items.map((item) => (
                <NotificationToastItem key={item.id} item={item} />
            ))}
        </div>
    );
}
