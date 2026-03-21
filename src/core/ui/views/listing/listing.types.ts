// src/core/ui/views/listing/listing.types.ts

export type ListingType = "product" | "service";

export interface Listing {
    id: string;
    type: ListingType;
    name: string;
    category: string;
    location: string;
    image: string;

    rating: number; // 0 - 5
    sold: number; // jumlah terjual

    price: number;
    priceLabel?: string;

    isNew?: boolean;
    isPromo?: boolean;

    meta?: Record<string, unknown>;
}

export interface ListingFiltersState {
    search: string;
    category: string[];
    location: string[];
    minPrice?: number;
    maxPrice?: number;
}

export type ListingSort =
    | "latest"
    | "price_asc"
    | "price_desc"
    | "sold"
    | "rating";
