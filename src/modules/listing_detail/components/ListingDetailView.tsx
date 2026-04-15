// src/core/ui/views/listing_detail/ListingDetailView.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import type { ListingDetail } from "../types/listingDetail.types";
import { useBreakpoint } from "@/core/ui/layout/hooks/useBreakpoint";

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
    const { isMobile } = useBreakpoint();

    function formatHour(hour?: number) {
        if (hour === undefined) return "-";
        return `${hour.toString().padStart(2, "0")}:00`;
    }

    return (
        <div
            className={`
                max-w-6xl mx-auto space-y-6
                ${isMobile ? "" : "p-4 md:p-6"}
            `}
        >
            {/* ================= IMAGE GALLERY ================= */}
            <div className={isMobile ? "" : "grid md:grid-cols-2 gap-6"}>
                {/* Main Image */}
                <div>
                    <img
                        src={data.images[activeImage]}
                        className={`
                            w-full object-cover
                            ${isMobile ? "h-[300px] rounded-none" : "h-80 rounded-2xl"}
                        `}
                    />

                    {/* Thumbnails */}
                    <div
                        className={`
                            flex gap-2 mt-3
                            ${isMobile ? "px-4" : ""}
                        `}
                    >
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
                <div className={`space-y-4 ${isMobile ? "px-4" : ""}`}>
                    {/* Title */}
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                        {data.name}
                    </h1>

                    {/* Meta */}
                    <div className="text-sm text-[var(--text-muted)] flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-1">
                            <span className="text-yellow-500">⭐</span>
                            <span className="font-medium">
                                {data.rating_count > 0
                                    ? data.rating_avg.toFixed(1)
                                    : "0.0"}
                            </span>
                            <span>
                                {data.rating_count > 0
                                    ? `(${data.rating_count})`
                                    : "Baru"}
                            </span>
                        </div>

                        <span>•</span>
                        <span>{data.sold ?? 0} terjual</span>

                        <span>•</span>
                        <span>{data.location}</span>
                    </div>

                    {/* Price */}
                    <div className="flex flex-col">
                        {data.type === "product" ? (
                            <span className="text-2xl font-bold text-[var(--color-primary)]">
                                Rp {data.price?.toLocaleString()}
                            </span>
                        ) : (
                            <div className="flex items-end gap-2">
                                <span className="text-sm text-[var(--text-muted)]">
                                    Mulai dari
                                </span>

                                <span className="text-2xl font-bold text-[var(--color-primary)]">
                                    {data.priceLabel?.replace(
                                        "Mulai dari ",
                                        "",
                                    )}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Category */}
                    <div className="text-sm text-[var(--text-muted)]">
                        Kategori: {data.category}
                    </div>

                    {/* ================= SERVICE META ================= */}
                    {data.type === "service" && data.meta && (
                        <div className="space-y-1 text-sm">
                            {data.meta.working_hours && (
                                <p className="flex items-center gap-1">
                                    🕒{" "}
                                    <span className="font-medium">
                                        Jam Operasional:
                                    </span>
                                    {formatHour(data.meta.working_hours.start)}{" "}
                                    - {formatHour(data.meta.working_hours.end)}
                                </p>
                            )}
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

                    {/* ❌ CTA HANYA DESKTOP */}
                    {!isMobile && (
                        <>
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
                        </>
                    )}
                </div>
            </div>

            {/* ================= DESCRIPTION ================= */}
            {data.description && (
                <div className={`space-y-2 ${isMobile ? "px-4" : ""}`}>
                    <h2 className="text-lg font-semibold">Deskripsi</h2>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                        {data.description}
                    </p>
                </div>
            )}

            {/* ================= SERVICES LIST ================= */}
            {data.type === "service" && data.meta?.offerings && (
                <div className={`space-y-3 ${isMobile ? "px-4 pb-4" : ""}`}>
                    <h2 className="text-lg font-semibold">Daftar Layanan</h2>

                    <div className="space-y-2">
                        {data.meta.offerings.map((item: any) => (
                            <div
                                key={item.product_id}
                                className="
                                    p-3 rounded-xl border
                                    border-[var(--color-border)]
                                    bg-[var(--color-surface)]
                                    flex justify-between items-center
                                "
                            >
                                <div>
                                    <p className="font-medium">
                                        {item.product_name}
                                    </p>
                                    <p className="text-sm text-[var(--text-muted)]">
                                        {item.duration_minutes} menit
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className="font-semibold text-[var(--color-primary)]">
                                        Rp {item.price.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
