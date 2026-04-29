// src/modules/listing/components/sections/ListingGrid.tsx

import ListingCard from "../cards/ListingCard";
import type { ListingItem } from "../../types/listing.shared";

interface Props {
    items: ListingItem[];
    mobile?: boolean;
    onItemClick?: (item: ListingItem) => void;
}

export default function ListingGrid({ items, mobile, onItemClick }: Props) {
    return (
        <div
            className={
                mobile
                    ? "grid grid-cols-2 gap-2"
                    : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
            }
        >
            {items.map((item, index) => (
                <ListingCard
                    key={`${item.type}-${item.id}-${index}`}
                    item={item}
                    onClick={onItemClick}
                />
            ))}
        </div>
    );
}
