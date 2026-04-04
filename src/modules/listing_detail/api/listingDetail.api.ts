// src/modules/listing_detail/api/listingDetail.api.ts

import { httpGet } from "@/core/http/http.client";

interface ServiceDetailResponse {
    id: number;
    name: string;
    avatar_url: string | null;

    offerings: {
        product_id: number;
        product_name: string;
        price: number;
        duration_minutes: number;
    }[];

    specialization?: string;
    experience_years?: number;
    bio?: string;

    working_hours?: {
        start: number;
        end: number;
    };
}

export const listingDetailApi = {
    async getDetail(id: string) {
        return httpGet<ServiceDetailResponse>(`/discovery/services/${id}/`, {
            skipAuth: true,
        });
    },
};
