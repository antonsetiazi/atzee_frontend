// src/core/ui/views/listing/listing.types.ts

export type ListingType = "product" | "service";

// ==============================
// PRODUCT
// ==============================
export interface ProductListing {
    type: "product";

    id: string;
    name: string;
    image: string;
    price: number;

    category?: string;
    location?: string;

    isPromo?: boolean;
    isNew?: boolean;

    sold?: number;
    rating?: number;
}

// ==============================
// SERVICE
// ==============================
export interface ServiceListing {
    type: "service";

    id: string;
    name: string;
    image: string;

    startingPrice: number;
    priceLabel: string;
    serviceCount: number;

    location: string;

    category?: string;

    rating?: number;
}

// ==============================
// SHARED
// ==============================
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
