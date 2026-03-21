// src/business/listing/listing.service.ts

import { dummyListings } from "@/core/ui/views/listing/listing.dummy";

export const listingService = {
    getAll() {
        return dummyListings;
    },

    getByType(type: "product" | "service") {
        return dummyListings.filter((item) => item.type === type);
    },
};
