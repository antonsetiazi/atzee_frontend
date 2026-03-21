// src/core/ui/views/listing/ListingCard.tsx

import AppImage from "@/core/ui/components/media/AppImage";
import type { Listing } from "./listing.types";
import { useState } from "react";

interface Props {
    listing: Listing;
    onClick?: (listing: Listing) => void;
}

export default function ListingCard({ listing, onClick }: Props) {
    const [liked, setLiked] = useState(false);

    return (
        <div
            onClick={() => onClick?.(listing)}
            className="
                relative
                rounded-[var(--radius)]
                border
                border-[var(--color-border)]
                bg-[var(--color-surface)]
                shadow-[var(--shadow)]
                hover:shadow-lg
                hover:-translate-y-1
                transition-all
                overflow-hidden
                cursor-pointer
            "
        >
            {/* Image */}
            <div className="relative">
                <AppImage
                    src={listing.image}
                    alt={listing.name}
                    className="w-full h-40 object-cover"
                />

                {/* Badge */}
                <div className="absolute top-2 left-2 flex gap-1">
                    {listing.isNew && (
                        <span className="text-[10px] px-2 py-1 rounded-full bg-green-100 text-green-600">
                            NEW
                        </span>
                    )}
                    {listing.isPromo && (
                        <span className="text-[10px] px-2 py-1 rounded-full bg-red-100 text-red-600">
                            PROMO
                        </span>
                    )}
                </div>

                {/* Wishlist */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setLiked(!liked);
                    }}
                    className="
                        absolute top-2 right-2
                        w-8 h-8
                        flex items-center justify-center
                        rounded-full
                        bg-white/80 backdrop-blur
                        text-sm
                        hover:scale-110
                        transition
                    "
                >
                    {liked ? "❤️" : "🤍"}
                </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
                <h3 className="text-[var(--text-primary)] font-semibold text-sm line-clamp-2">
                    {listing.name}
                </h3>

                {listing.type === "service" && (
                    <span className="text-xs text-blue-500">Jasa</span>
                )}

                {/* Rating + Sold */}
                <div className="flex items-center text-xs text-[var(--text-muted)] gap-2">
                    <span>⭐ {listing.rating}</span>
                    <span>•</span>
                    <span>{listing.sold} terjual</span>
                </div>

                <p className="text-xs text-[var(--text-muted)]">
                    {listing.location}
                </p>

                <p className="text-[var(--color-primary)] font-bold text-base">
                    {listing.type === "product"
                        ? `Rp ${listing.price?.toLocaleString()}`
                        : listing.priceLabel}
                </p>
            </div>
        </div>
    );
}
