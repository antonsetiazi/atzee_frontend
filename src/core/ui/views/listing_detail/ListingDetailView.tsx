// src/core/ui/views/listing_detail/ListingDetailView.tsx

import { useState } from "react";
import type { ListingDetail } from "./listingDetail.types";

interface Props {
    data: ListingDetail;
    onPrimaryAction?: (data: ListingDetail) => void;
    onBuyNow?: (data: ListingDetail) => void;
}

export default function ListingDetailView({
    data,
    onPrimaryAction,
    onBuyNow,
}: Props) {
    const [activeImage, setActiveImage] = useState(0);

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
            {/* ================= IMAGE GALLERY ================= */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Main Image */}
                <div>
                    <img
                        src={data.images[activeImage]}
                        className="w-full h-80 object-cover rounded-2xl"
                    />

                    {/* Thumbnails */}
                    <div className="flex gap-2 mt-3">
                        {data.images.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                onClick={() => setActiveImage(i)}
                                className={`
                                    w-16 h-16 object-cover rounded-lg cursor-pointer
                                    ${
                                        activeImage === i
                                            ? "ring-2 ring-[var(--color-primary)]"
                                            : ""
                                    }
                                `}
                            />
                        ))}
                    </div>
                </div>

                {/* ================= INFO ================= */}
                <div className="space-y-4">
                    {/* Title */}
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                        {data.name}
                    </h1>

                    {/* Meta */}
                    <div className="text-sm text-[var(--text-muted)] flex gap-3">
                        <span>⭐ {data.rating}</span>
                        <span>•</span>
                        <span>{data.sold} terjual</span>
                        <span>•</span>
                        <span>{data.location}</span>
                    </div>

                    {/* Price */}
                    <div className="text-2xl font-bold text-[var(--color-primary)]">
                        {data.type === "product"
                            ? `Rp ${data.price?.toLocaleString()}`
                            : data.priceLabel}
                    </div>

                    {/* Category */}
                    <div className="text-sm text-[var(--text-muted)]">
                        Kategori: {data.category}
                    </div>

                    {/* ================= SERVICE META ================= */}
                    {data.type === "service" && data.meta && (
                        <div className="space-y-1 text-sm">
                            {data.meta.specialization && (
                                <p>
                                    📘 Spesialisasi: {data.meta.specialization}
                                </p>
                            )}

                            {data.meta.experience && (
                                <p>🧠 Pengalaman: {data.meta.experience}</p>
                            )}
                        </div>
                    )}

                    {/* CTA */}
                    {data.type === "product" ? (
                        <div className="flex gap-3">
                            <button
                                onClick={() => onPrimaryAction?.(data)}
                                className="
                                    flex-1 py-3 rounded-xl
                                    border border-[var(--color-border)]
                                    bg-[var(--color-surface)]
                                    font-medium
                                    hover:bg-[var(--color-hover)]
                                    transition
                                "
                            >
                                Tambah ke Keranjang
                            </button>

                            <button
                                onClick={() => onBuyNow?.(data)}
                                className="
                                    flex-1 py-3 rounded-xl
                                    bg-[var(--color-primary)]
                                    text-white font-semibold
                                    shadow-[var(--shadow)]
                                    hover:opacity-90 transition
                                "
                            >
                                Beli Sekarang
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => onPrimaryAction?.(data)}
                            className="
                                w-full py-3 rounded-xl
                                bg-[var(--color-primary)]
                                text-white font-semibold
                                shadow-[var(--shadow)]
                                hover:opacity-90 transition
                            "
                        >
                            Booking Sekarang
                        </button>
                    )}
                </div>
            </div>

            {/* ================= DESCRIPTION ================= */}
            {data.description && (
                <div className="space-y-2">
                    <h2 className="text-lg font-semibold">Deskripsi</h2>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                        {data.description}
                    </p>
                </div>
            )}
        </div>
    );
}
