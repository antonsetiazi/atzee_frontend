// src/modules/listing/hooks/useCheapServices.ts

import { useEffect, useState } from "react";
import { discoveryApi } from "../api/discovery.api";
import type { ServiceListing } from "../types/listing.types";

export function useCheapServices() {
    const [items, setItems] = useState<ServiceListing[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        discoveryApi
            .cheapServices()
            .then((res) => setItems(res.listings))
            .finally(() => setLoading(false));
    }, []);

    return { items, loading };
}
