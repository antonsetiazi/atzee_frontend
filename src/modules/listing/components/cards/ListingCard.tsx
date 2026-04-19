// src/modules/listing/components/cards/ListingCard.tsx

import ProductCard from "./ProductCard";
import ServiceCard from "./ServiceCard";

import type { ListingItem } from "../../types/listing.shared";

interface Props {
    item: ListingItem;
    onClick?: (item: ListingItem) => void;
}

export default function ListingCard({ item, onClick }: Props) {
    if (item.type === "product") {
        return <ProductCard item={item} onClick={onClick} />;
    }

    return <ServiceCard item={item} onClick={onClick} />;
}
