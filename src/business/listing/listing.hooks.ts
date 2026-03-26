// src/business/listing/listing.hooks.ts

import { useEffect, useState } from "react";
import { listingApi } from "./listing.api";
import type {
    ProductListing,
    ServiceListing,
    ListingFiltersState,
    ListingSort,
} from "@/core/ui/views/listing/listing.types";

/* ===========================
   PRODUCT
   =========================== */

export function useProductListing() {
    const [listings, setListings] = useState<ProductListing[]>([]);
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
            .getProducts({ filters, sort, page, perPage: 12 })
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

/* ===========================
   SERVICE
   =========================== */

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
