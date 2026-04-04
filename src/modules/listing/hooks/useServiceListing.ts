// src/modules/listing/hooks/useServiceListing.ts

import { useEffect, useState } from "react";
import { listingApi } from "../api/listing.api";
import type {
    ServiceListing,
    ListingFiltersState,
    ListingSort,
} from "../types/listing.types";

export function useServiceListing() {
    const [listings, setListings] = useState<ServiceListing[]>([]);
    const [filters, setFilters] = useState<ListingFiltersState>({
        search: "",
        category: [],
        location: [],
    });

    const [sort, setSort] = useState<ListingSort>("latest");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        listingApi
            .getServices({ filters, sort, page, perPage: 12 })
            .then((res) => {
                setListings(res.listings);
                setTotalPages(res.totalPages);
            });
    }, [filters, sort, page]);

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
