// src/modules/listing/components/sections/ListingGridSection.tsx

import ListingGrid from "./ListingGrid";
import ListingEmptyState from "../ListingEmptyState";

import type { ListingItem } from "../../types/listing.shared";

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
    return (
        <>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
                {listings.length} layanan ditemukan
            </p>

            {listings.length === 0 ? (
                <ListingEmptyState onReset={onReset} />
            ) : (
                <ListingGrid
                    items={listings}
                    mobile={mobile}
                    onItemClick={onItemClick}
                />
            )}
        </>
    );
}
