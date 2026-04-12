// src/core/location/hooks/useMyLocation.ts

import { useEffect, useState } from "react";
import { httpGet } from "@/core/http/http.client";

interface UserAddress {
    id: number;
    label: string;
    city: string;
    latitude: number | null;
    longitude: number | null;
    is_default: boolean;
}

export function useMyLocation(enabled: boolean) {
    const [location, setLocation] = useState<UserAddress | null>(null);

    useEffect(() => {
        if (!enabled) return;

        let cancelled = false;

        httpGet<UserAddress[]>("/account/address/")
            .then((res) => {
                if (cancelled) return;

                if (!res.length) {
                    setLocation(null);
                    return;
                }

                const selected = res.find((a) => a.is_default) || res[0];

                setLocation(selected);
            })
            .catch(() => {
                if (!cancelled) setLocation(null);
            });

        return () => {
            cancelled = true;
        };
    }, [enabled]);

    // 🔥 DERIVED OUTPUT (INI KUNCINYA)
    return enabled ? location : null;
}
