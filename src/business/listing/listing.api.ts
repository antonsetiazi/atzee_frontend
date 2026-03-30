// src/business/listing/listing.api.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { httpGet } from "@/core/http/http.client";
import type {
    ProductListing,
    ServiceListing,
    ListingFiltersState,
    ListingSort,
} from "@/core/ui/views/listing/listing.types";

/* ===========================
   RESPONSE TYPES
   =========================== */

interface ProductItemResponse {
    id: string;
    name: string;
    image: string;
    price: number;

    category?: string;
    location?: string;

    is_new?: boolean;
    is_promo?: boolean;
}

interface ServiceItemResponse {
    id: string;
    name: string;
    image: string;

    starting_price: number;
    service_count: number;
    priceLabel: string;

    // 🔥 WAJIB
    location: string;

    category?: string;
}

/* ===========================
   QUERY BUILDER
   =========================== */

function buildQuery(params: {
    filters: ListingFiltersState;
    sort: ListingSort;
    page: number;
    perPage: number;
}) {
    const { filters, sort, page, perPage } = params;

    return {
        search: filters.search || undefined,
        category: filters.category.length ? filters.category : undefined,
        location: filters.location.length ? filters.location : undefined,
        min_price: filters.minPrice,
        max_price: filters.maxPrice,
        sort,
        page,
        per_page: perPage,
    };
}

/* ===========================
   API
   =========================== */

export const listingApi = {
    async getProducts(params: {
        filters: ListingFiltersState;
        sort: ListingSort;
        page: number;
        perPage: number;
    }) {
        const res = await httpGet<{
            data: ProductItemResponse[];
            meta: any;
        }>("/discovery/listings/products/", {
            skipAuth: true,
            query: buildQuery(params),
        });

        return {
            listings: res.data.map(
                (item): ProductListing => ({
                    type: "product",
                    id: item.id,
                    name: item.name,
                    image: item.image,
                    price: item.price,
                    category: item.category,
                    location: item.location,
                    isNew: item.is_new,
                    isPromo: item.is_promo,
                }),
            ),
            totalPages: res.meta.total_pages,
        };
    },

    async getServices(params: {
        filters: ListingFiltersState;
        sort: ListingSort;
        page: number;
        perPage: number;
    }) {
        const res = await httpGet<{
            data: ServiceItemResponse[];
            meta: any;
        }>("/discovery/listings/services/", {
            skipAuth: true,
            query: buildQuery(params),
        });

        return {
            listings: res.data.map(
                (item): ServiceListing => ({
                    type: "service",
                    id: item.id,
                    name: item.name,
                    image: item.image,
                    startingPrice: item.starting_price,
                    priceLabel: item.priceLabel,
                    serviceCount: item.service_count,
                    location: item.location,
                    category: item.category,
                }),
            ),
            totalPages: res.meta.total_pages,
        };
    },
};
