// src/modules/listing/components/sections/ListingSection.tsx

import ListingGrid from "./ListingGrid";
import ListingEmptyState from "../ListingEmptyState";
import type { ListingItem } from "../../types/listing.shared";

interface Props {
    title: string;
    items: ListingItem[];
    mobile?: boolean;
    onViewAll?: () => void;
    onItemClick?: (item: ListingItem) => void;
}

export default function ListingSection({
    title,
    items,
    mobile,
    onViewAll,
    onItemClick,
}: Props) {
    return (
        <section className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">{title}</h2>

                {onViewAll && (
                    <button
                        onClick={onViewAll}
                        className="text-sm text-primary"
                    >
                        Lihat Semua
                    </button>
                )}
            </div>

            {items.length === 0 ? (
                <ListingEmptyState />
            ) : (
                <ListingGrid
                    items={items}
                    mobile={mobile}
                    onItemClick={onItemClick}
                />
            )}
        </section>
    );
}
