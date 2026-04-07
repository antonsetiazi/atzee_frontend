// src/modules/tracking/hooks/useTracking.ts

import { useEffect, useState } from "react";
import { trackingService } from "@/business/tracking/tracking.service";
import type { OrderTrackingData } from "@/business/tracking/tracking.types";

export function useTracking(orderId: number) {
    const [data, setData] = useState<OrderTrackingData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        async function load() {
            try {
                const res = await trackingService.getOrderTracking(orderId);
                if (isMounted) {
                    setData(res);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        load();

        const interval = setInterval(load, 5000);

        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, [orderId]);

    return { data, loading };
}
