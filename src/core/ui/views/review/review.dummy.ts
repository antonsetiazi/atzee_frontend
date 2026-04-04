// src/core/ui/views/review/review.dummy.ts

import type { Review } from "../../../../modules/review/types/review.types";

export const dummyReviews: Review[] = [
    {
        id: "r1",
        entityType: "product",
        entityId: "1",
        userName: "Ahmad Fauzi",
        rating: 5,
        comment: "Produk sangat bagus, kualitas premium dan sesuai deskripsi.",
        isVerified: true,
        createdAt: "2026-03-01T10:00:00Z",
    },
    {
        id: "r2",
        entityType: "product",
        entityId: "1",
        userName: "Budi Santoso",
        rating: 4,
        comment: "Pengiriman cepat, barang sesuai. Recommended!",
        isVerified: true,
        createdAt: "2026-03-05T12:30:00Z",
    },
    {
        id: "r3",
        entityType: "product",
        entityId: "1",
        userName: "Siti Rahma",
        rating: 3,
        comment: "Cukup bagus, tapi packaging kurang rapi.",
        createdAt: "2026-03-08T08:15:00Z",
    },
    {
        id: "r4",
        entityType: "product",
        entityId: "1",
        userName: "Dewi Lestari",
        rating: 5,
        comment: "Sangat puas! Akan beli lagi.",
        isVerified: true,
        createdAt: "2026-03-10T14:45:00Z",
    },
    {
        id: "r5",
        entityType: "product",
        entityId: "2",
        userName: "Rizky Pratama",
        rating: 4,
        comment: "Worth it untuk harga segini.",
        createdAt: "2026-03-12T09:20:00Z",
    },
];
