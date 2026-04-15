// src/modules/listing_detail/types/listingDetail.types.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ListingType } from "@/modules/listing/types/listing.types";

export interface ListingDetail {
    id: string;
    type: ListingType;

    name: string;
    images: string[];

    category: string;
    location: string;

    rating_avg: number;
    rating_count: number;

    rating: number;
    sold: number;

    price?: number;
    priceLabel?: string;

    description?: string;

    partner: {
        id: number;
        name: string;
    };

    meta?: Record<string, any>;
}
