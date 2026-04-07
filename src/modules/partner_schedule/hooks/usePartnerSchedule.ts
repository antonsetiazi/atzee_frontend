// src/modules/partner_schedule/hooks/usePartnerSchedule.ts

import { useEffect, useState } from "react";
import { httpGet } from "@/core/http/http.client";

export interface ScheduleItem {
    id: string;
    start_time: string;
    end_time: string;
    status: string;
    order?: {
        id: string;
        order_number: string;
    };
}

export function usePartnerSchedule() {
    const [data, setData] = useState<ScheduleItem[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const res = await httpGet<ScheduleItem[]>(
                    "/business/booking/partner/schedule",
                );
                setData(res);
            } finally {
                setLoading(false);
            }
        };

        fetch();
    }, []);

    return { data, loading };
}
