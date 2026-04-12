// src/modules/listing/hooks/useCities.ts

import { useEffect, useState } from "react";
import { httpGet } from "@/core/http/http.client";

interface City {
    id: number;
    code: string;
    name: string;
}

export function useCities() {
    const [cities, setCities] = useState<City[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        httpGet<City[]>("/discovery/cities/", {
            skipAuth: true,
        })
            .then((res) => setCities(res))
            .finally(() => setLoading(false));
    }, []);

    return { cities, loading };
}
