// src/modules/listing/hooks/useServiceListing.ts

import { useEffect, useState } from "react";
import { listingApi } from "../api/listing.api";
import type {
    ServiceListing,
    ListingFiltersState,
    ListingSort,
} from "../types/listing.types";
import { useMyLocation } from "@/core/location/hooks/useMyLocation";

export function useServiceListing() {
    const [listings, setListings] = useState<ServiceListing[]>([]);
    const [filters, setFilters] = useState<ListingFiltersState>({
        search: "",
        category: [],
        // location: [],
    });

    const myLocation = useMyLocation(filters.useMyLocation || false);

    const [sort, setSort] = useState<ListingSort>("latest");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const finalFilters = {
            ...filters,
            lat:
                filters.useMyLocation && myLocation?.latitude != null
                    ? myLocation.latitude
                    : undefined,
            lng:
                filters.useMyLocation && myLocation?.longitude != null
                    ? myLocation.longitude
                    : undefined,
        };

        listingApi
            .getServices({
                filters: finalFilters,
                sort,
                page,
                perPage: 12,
            })
            .then((res) => {
                setListings(res.listings);
                setTotalPages(res.totalPages);
            });
    }, [filters, sort, page, myLocation]);

    return {
        listings,
        filters,
        setFilters,
        sort,
        setSort,
        page,
        setPage,
        totalPages,
    };
}
