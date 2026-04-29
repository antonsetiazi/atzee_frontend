// src/modules/listing/components/cards/ServiceCard.tsx

// import { useState } from "react";
import AppImage from "@/core/ui/components/media/AppImage";
import type { ServiceListing } from "../../types/listing.types";

interface Props {
    item: ServiceListing;
    onClick?: (item: ServiceListing) => void;
}

export default function ServiceCard({ item, onClick }: Props) {
    // const [liked, setLiked] = useState(false);

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
            {/* <button
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
            </button> */}

            <div className="p-2 flex flex-col gap-1">
                {/* ================= NAME ================= */}
                <h3 className="text-[var(--text-primary)] font-semibold text-sm line-clamp-2">
                    {item.name}
                </h3>

                {/* ================= ROW 1 ================= */}
                <div className="flex flex-1 items-start justify-between">
                    {/* 📍 LOCATION */}
                    <p className="text-xs text-gray-600">{item.city || "-"}</p>

                    {/* 📦 SERVICE COUNT */}
                    {/* <span className="text-xs text-gray-400">
                        {item.serviceCount} layanan
                    </span> */}
                </div>

                {/* ================= ROW 2 ================= */}
                <div className="flex items-end justify-between">
                    {/* 💰 PRICE */}
                    <div className="flex flex-col leading-tight">
                        <span className="text-[10px] text-orange-400">
                            Mulai
                        </span>

                        <span className="text-[var(--color-primary)] font-bold text-md leading-none">
                            <small>Rp</small>{" "}
                            {item.startingPrice.toLocaleString()}
                        </span>
                    </div>

                    {/* ⭐ RATING */}
                    <div className="flex items-center gap-0 rounded-lg bg-amber-100 px-1">
                        <span className="text-yellow-500 text-sm">⭐</span>

                        <span className="text-xs font-medium text-[var(--text-primary)]">
                            {item.rating?.toFixed(1) ?? "0.0"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
