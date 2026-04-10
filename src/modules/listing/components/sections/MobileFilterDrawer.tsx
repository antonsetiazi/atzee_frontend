// src/modules/listing/components/sections/MobileFilterDrawer.tsx

import ListingSidebarFilters from "./../ListingSidebarFilters";
import type { ListingFiltersState } from "../../types/listing.types";

interface Props {
    open: boolean;
    filters: ListingFiltersState;
    onChangeFilters: (filters: ListingFiltersState) => void;
    onClose: () => void;
}

export default function MobileFilterDrawer({
    open,
    filters,
    onChangeFilters,
    onClose,
}: Props) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-end">
            <div
                className="
                    w-full bg-[var(--color-surface)]
                    rounded-t-2xl p-4
                    max-h-[80vh] overflow-auto
                "
            >
                <div className="flex justify-between mb-4">
                    <h3 className="font-semibold">Filter</h3>
                    <button onClick={onClose}>✕</button>
                </div>

                <ListingSidebarFilters
                    filters={filters}
                    onChange={onChangeFilters}
                    isMobile={true}
                />

                <button
                    onClick={onClose}
                    className="
                        mt-4 w-full py-3 rounded-xl
                        bg-[var(--color-primary)]
                        text-white font-semibold
                    "
                >
                    Terapkan
                </button>
            </div>
        </div>
    );
}
