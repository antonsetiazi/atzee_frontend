// src/modules/listing/hooks/useRecommendedServices.ts

import { useEffect, useState } from "react";
import { discoveryApi } from "../api/discovery.api";
import type { ServiceListing } from "../types/listing.types";

export function useRecommendedServices() {
    const [items, setItems] = useState<ServiceListing[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        discoveryApi
            .recommendedServices()
            .then((res) => setItems(res.listings))
            .finally(() => setLoading(false));
    }, []);

    return { items, loading };
}
