// src/modules/listing/hooks/useTopRatedServices.ts

import { useEffect, useState } from "react";
import { discoveryApi } from "../api/discovery.api";
import type { ServiceListing } from "../types/listing.types";

export function useTopRatedServices() {
    const [items, setItems] = useState<ServiceListing[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        discoveryApi
            .topRatedServices()
            .then((res) => setItems(res.listings))
            .finally(() => setLoading(false));
    }, []);

    return { items, loading };
}
