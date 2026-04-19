// src/modules/listing/hooks/usePopularServices.ts

import { useEffect, useState } from "react";
import { discoveryApi } from "../api/discovery.api";
import type { ServiceListing } from "../types/listing.types";

export function usePopularServices() {
    const [items, setItems] = useState<ServiceListing[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        discoveryApi
            .popularServices()
            .then((res) => setItems(res.listings))
            .finally(() => setLoading(false));
    }, []);

    return { items, loading };
}
