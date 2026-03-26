// src/core/ui/views/listing/ServiceCard.tsx

import AppImage from "@/core/ui/components/media/AppImage";
import type { ServiceListing } from "./listing.types";

interface Props {
    item: ServiceListing;
    onClick?: (item: ServiceListing) => void;
}

export default function ServiceCard({ item, onClick }: Props) {
    return (
        <div onClick={() => onClick?.(item)} className="cursor-pointer">
            <AppImage src={item.image} className="w-full h-40 object-cover" />

            <div className="p-3 space-y-1">
                <h3 className="text-sm font-semibold">{item.name}</h3>

                {/* 🔥 WAJIB */}
                <p className="text-xs text-gray-500">📍 {item.location}</p>

                <p className="font-bold text-primary">{item.priceLabel}</p>

                <p className="text-xs text-gray-400">
                    {item.serviceCount} layanan
                </p>
            </div>
        </div>
    );
}
