// src/modules/listing/hooks/useServiceSection.ts

import { useEffect, useState } from "react";
import { discoveryApi } from "../api/discovery.api";
import type { ServiceListing } from "../types/listing.types";

type SectionType =
    | "popular_services"
    | "nearby_services"
    | "new_services"
    | "recommended_services"
    | "top_rated_services"
    | "cheap_services";

export function useServiceSection(type: SectionType) {
    const [items, setItems] = useState<ServiceListing[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        const request = (() => {
            switch (type) {
                case "nearby_services":
                    return discoveryApi.nearbyServices();

                case "new_services":
                    return discoveryApi.newestServices();

                case "recommended_services":
                    return discoveryApi.recommendedServices();

                case "top_rated_services":
                    return discoveryApi.topRatedServices();

                case "cheap_services":
                    return discoveryApi.cheapServices();

                case "popular_services":
                default:
                    return discoveryApi.popularServices();
            }
        })();

        request
            .then((res) => {
                if (cancelled) return;
                setItems(res.listings);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [type]);

    return { items, loading };
}
