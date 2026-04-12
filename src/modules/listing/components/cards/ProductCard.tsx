// src/modules/listing/components/cards/ProductCard.tsx

import AppImage from "@/core/ui/components/media/AppImage";
import type { ProductListing } from "../../types/listing.types";

interface Props {
    item: ProductListing;
    onClick?: (item: ProductListing) => void;
}

export default function ProductCard({ item, onClick }: Props) {
    return (
        <div onClick={() => onClick?.(item)} className="cursor-pointer">
            <AppImage src={item.image} className="w-full h-40 object-cover" />

            <div className="p-3 space-y-1">
                <h3 className="text-sm font-semibold">{item.name}</h3>

                {item.category && (
                    <p className="text-xs text-gray-500">{item.category}</p>
                )}

                {item.city && (
                    <p className="text-xs text-gray-400">📍 {item.city}</p>
                )}

                <p className="font-bold text-primary">
                    Rp {item.price.toLocaleString()}
                </p>

                <div className="flex gap-1">
                    {item.isNew && (
                        <span className="text-xs text-green-600">NEW</span>
                    )}
                    {item.isPromo && (
                        <span className="text-xs text-red-600">PROMO</span>
                    )}
                </div>
            </div>
        </div>
    );
}
