// src/core/ui/views/listing_detail/listingDetail.types.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ListingType } from "../listing/listing.types";

export interface ListingDetail {
    id: string;
    type: ListingType;

    name: string;
    images: string[];

    category: string;
    location: string;

    rating: number;
    sold: number;

    price?: number;
    priceLabel?: string;

    description?: string;

    meta?: Record<string, any>;
}
