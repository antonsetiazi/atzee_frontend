// src/core/ui/views/review/hooks/useCanReview.ts

import { useEffect, useState } from "react";
import { orderStore } from "@/business/order/order.store";

export function useCanReview(
    entityType: "product" | "service",
    entityId: string,
) {
    const [canReview, setCanReview] = useState(false);

    useEffect(() => {
        const unsubscribe = orderStore.subscribe((orders) => {
            const hasCompletedOrder = orders.some((order) => {
                if (order.status !== "completed") return false;

                return order.items.some(
                    (item) =>
                        item.entityType === entityType &&
                        item.entityId === entityId,
                );
            });

            setCanReview(hasCompletedOrder);
        });

        return () => unsubscribe();
    }, [entityType, entityId]);

    return canReview;
}
