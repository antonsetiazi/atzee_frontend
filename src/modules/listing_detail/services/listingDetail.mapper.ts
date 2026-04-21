// src/modules/listing_detail/services/listingDetail.mapper.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ListingDetail } from "../types/listingDetail.types";

export function mapServiceDetailToListingDetail(data: any): ListingDetail {
    const minPrice =
        data.offerings?.length > 0
            ? Math.min(...data.offerings.map((o: any) => o.price))
            : null;

    return {
        id: String(data.id),
        type: "service",

        name: data.name,

        images: data.avatar_url
            ? [data.avatar_url]
            : ["https://placehold.co/600x400"],

        category: data.specialization || "Service",
        location: "Indonesia", // 🔥 nanti bisa dari backend

        rating: data.rating ?? 0,
        rating_avg: data.rating ?? 0,
        rating_count: data.rating_count ?? 0,
        sold: 0,

        priceLabel:
            minPrice !== null
                ? `Mulai dari Rp ${minPrice.toLocaleString()}`
                : "Harga tidak tersedia",

        description: data.bio || "",

        partner: {
            id: data.id,
            name: data.name,
        },

        owner_user_id: data.owner_user_id,
        partner_id: data.partner_id,
        service_profile_id: data.service_profile_id,

        meta: {
            owner_id: data.id, // 🔥 penting untuk chat
            offerings: data.offerings, // 🔥 kita simpan full di meta
            specialization: data.specialization,
            experience_years: data.experience_years,
            resource_id: data.resource_id,
            working_hours: data.working_hours,
        },
    };
}
