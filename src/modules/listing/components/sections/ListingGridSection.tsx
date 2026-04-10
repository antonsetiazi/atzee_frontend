// src/modules/listing/components/sections/ListingGridSection.tsx

import ProductCard from "./../cards/ProductCard";
import ServiceCard from "./../cards/ServiceCard";
import ListingEmptyState from "./../ListingEmptyState";
import type { ProductListing, ServiceListing } from "../../types/listing.types";

type ListingItem = ProductListing | ServiceListing;

interface Props {
    listings: ListingItem[];
    onItemClick?: (listing: ListingItem) => void;
    onReset: () => void;
    mobile?: boolean;
}

export default function ListingGridSection({
    listings,
    onItemClick,
    onReset,
    mobile,
}: Props) {
    function renderItem(item: ListingItem, index: number) {
        if (item.type === "product") {
            return (
                <ProductCard
                    key={`product-${item.id}`}
                    item={item}
                    onClick={onItemClick}
                />
            );
        }

        return (
            <ServiceCard
                key={`service-${item.id}-${index}`}
                item={item}
                onClick={onItemClick}
            />
        );
    }

    return (
        <>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
                {listings.length} layanan ditemukan
            </p>

            {listings.length === 0 ? (
                <ListingEmptyState onReset={onReset} />
            ) : (
                <div
                    className={
                        mobile
                            ? "grid grid-cols-2 gap-3"
                            : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                    }
                >
                    {listings.map(renderItem)}
                </div>
            )}
        </>
    );
}
