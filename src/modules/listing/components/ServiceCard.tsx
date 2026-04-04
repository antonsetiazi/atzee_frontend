// src/modules/listing/components/ServiceCard.tsx

import { useState } from "react";
import AppImage from "@/core/ui/components/media/AppImage";
import type { ServiceListing } from "../types/listing.types";

interface Props {
    item: ServiceListing;
    onClick?: (item: ServiceListing) => void;
}

export default function ServiceCard({ item, onClick }: Props) {
    const [liked, setLiked] = useState(false);

    return (
        <div
            onClick={() => onClick?.(item)}
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
            <AppImage src={item.image} className="w-full h-40 object-cover" />

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

            <div className="p-4 space-y-2">
                <h3 className="text-[var(--text-primary)] font-semibold text-sm line-clamp-2">
                    {item.name}
                </h3>

                {/* 🔥 WAJIB */}
                <p className="text-xs text-gray-500">📍 {item.location}</p>

                <p className="text-[var(--color-primary)] font-bold text-base">
                    {item.priceLabel}
                </p>

                <p className="text-xs text-gray-400">
                    {item.serviceCount} layanan
                </p>
            </div>
        </div>
    );
}
