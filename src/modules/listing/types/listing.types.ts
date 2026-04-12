// src/modules/listing/types/listing.types.ts

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
    city?: string;

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

    city?: string;

    category?: string;

    rating?: number;
}

// ==============================
// SHARED
// ==============================
export interface ListingFiltersState {
    search: string;
    category: string[];
    // location: string[];

    city?: string;
    useMyLocation?: boolean;
    radius?: number;

    lat?: number;
    lng?: number;

    minPrice?: number;
    maxPrice?: number;
}

export type ListingSort =
    | "latest"
    | "price_asc"
    | "price_desc"
    | "sold"
    | "rating";
