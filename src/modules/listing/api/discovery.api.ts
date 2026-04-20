// src/modules/listing/api/discovery.api.ts
import { remember } from "../store/discovery.cache";

import { listingApi } from "./listing.api";

export const discoveryApi = {
    async nearbyServices() {
        return listingApi.getServices({
            filters: {
                search: "",
                category: [],
                useMyLocation: true,
                radius: 10,
            },
            sort: "latest",
            page: 1,
            perPage: 8,
        });
    },

    async popularServices() {
        return remember("services-rating", () =>
            listingApi.getServices({
                filters: {
                    search: "",
                    category: [],
                },
                sort: "rating",
                page: 1,
                perPage: 8,
            }),
        );
    },

    async newestServices() {
        return listingApi.getServices({
            filters: {
                search: "",
                category: [],
            },
            sort: "latest",
            page: 1,
            perPage: 8,
        });
    },

    async topRatedServices() {
        return remember("services-rating", () =>
            listingApi.getServices({
                filters: {
                    search: "",
                    category: [],
                },
                sort: "rating",
                page: 1,
                perPage: 8,
            }),
        );
    },

    async cheapServices() {
        return listingApi.getServices({
            filters: {
                search: "",
                category: [],
            },
            sort: "price_asc",
            page: 1,
            perPage: 8,
        });
    },

    async recommendedServices() {
        return remember("services-rating", () =>
            listingApi.getServices({
                filters: {
                    search: "",
                    category: [],
                },
                sort: "rating",
                page: 1,
                perPage: 8,
            }),
        );
    },
};
