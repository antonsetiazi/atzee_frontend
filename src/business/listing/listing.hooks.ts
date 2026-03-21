// src/business/listing/listing.hooks.ts

import { useMemo, useState } from "react";
import { listingService } from "./listing.service";
import type {
    Listing,
    ListingFiltersState,
    ListingSort,
} from "@/core/ui/views/listing/listing.types";

export function useListing(type?: "product" | "service") {
    const [filters, setFilters] = useState<ListingFiltersState>({
        search: "",
        category: [],
        location: [],
    });

    const [sort, setSort] = useState<ListingSort>("latest");
    const [page, setPage] = useState(1);
    const perPage = 12;

    const raw = listingService.getAll();

    const processed = useMemo(() => {
        let result: Listing[] = [...raw];

        if (type) {
            result = result.filter((r) => r.type === type);
        }

        if (filters.search) {
            const q = filters.search.toLowerCase();
            result = result.filter((r) => r.name.toLowerCase().includes(q));
        }

        if (filters.category.length) {
            result = result.filter((r) =>
                filters.category.includes(r.category),
            );
        }

        if (filters.location.length) {
            result = result.filter((r) =>
                filters.location.includes(r.location),
            );
        }

        if (filters.minPrice !== undefined) {
            result = result.filter((r) => r.price >= filters.minPrice!);
        }

        if (filters.maxPrice !== undefined) {
            result = result.filter((r) => r.price <= filters.maxPrice!);
        }

        switch (sort) {
            case "price_asc":
                result.sort((a, b) => a.price - b.price);
                break;
            case "price_desc":
                result.sort((a, b) => b.price - a.price);
                break;
            case "sold":
                result.sort((a, b) => b.sold - a.sold);
                break;
            case "rating":
                result.sort((a, b) => b.rating - a.rating);
                break;
        }

        return result;
    }, [raw, filters, sort, type]);

    const totalPages = Math.ceil(processed.length / perPage);

    const paginated = processed.slice((page - 1) * perPage, page * perPage);

    return {
        listings: paginated,

        filters,
        setFilters,

        sort,
        setSort,

        page,
        setPage,

        totalPages,
    };
}
