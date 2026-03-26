// src/core/ui/views/listing/ListingView.tsx

import { useState } from "react";
import ProductCard from "./ProductCard";
import ServiceCard from "./ServiceCard";
import ListingSidebarFilters from "./ListingSidebarFilters";
import ListingSortBar from "./ListingSortBar";
import ListingPagination from "./ListingPagination";
import { useBreakpoint } from "@/core/ui/layout/hooks/useBreakpoint";
import type {
    ProductListing,
    ServiceListing,
    ListingFiltersState,
    ListingSort,
} from "./listing.types";

/* ===========================
   UNION TYPE
   =========================== */

type ListingItem = ProductListing | ServiceListing;

interface Props {
    listings: ListingItem[];

    filters: ListingFiltersState;
    onChangeFilters: (filters: ListingFiltersState) => void;

    sort: ListingSort;
    onChangeSort: (value: ListingSort) => void;

    page: number;
    totalPages: number;
    onChangePage: (page: number) => void;

    onItemClick?: (listing: ListingItem) => void;
}

export default function ListingView({
    listings,
    filters,
    onChangeFilters,
    sort,
    onChangeSort,
    page,
    totalPages,
    onChangePage,
    onItemClick,
}: Props) {
    const { isMobile } = useBreakpoint();
    const [showFilter, setShowFilter] = useState(false);

    /* ===========================
       RENDER CARD (TYPE SAFE)
       =========================== */
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

    // =============================
    // MOBILE LAYOUT
    // =============================
    if (isMobile) {
        return (
            <div className="p-4 space-y-4">
                {/* Search */}
                <input
                    type="text"
                    placeholder="Cari..."
                    value={filters.search}
                    onChange={(e) =>
                        onChangeFilters({
                            ...filters,
                            search: e.target.value,
                        })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-alt)]"
                />

                {/* Controls */}
                <div className="flex gap-2">
                    <button
                        onClick={() => setShowFilter(true)}
                        className="
                            flex-1 py-2 rounded-lg
                            bg-[var(--color-surface-alt)]
                            text-sm
                        "
                    >
                        ⚙️ Filter
                    </button>

                    <select
                        value={sort}
                        onChange={(e) =>
                            onChangeSort(e.target.value as ListingSort)
                        }
                        className="flex-1 py-2 rounded-lg text-sm"
                    >
                        <option value="latest">Terbaru</option>
                        <option value="price_asc">Termurah</option>
                        <option value="price_desc">Termahal</option>
                        <option value="sold">Terlaris</option>
                        <option value="rating">Rating</option>
                    </select>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 gap-3">
                    {listings.map((item, index) => renderItem(item, index))}
                </div>

                {/* Pagination */}
                <ListingPagination
                    page={page}
                    totalPages={totalPages}
                    onChange={onChangePage}
                />

                {/* Drawer Filter */}
                {showFilter && (
                    <div
                        className="
                            fixed inset-0 z-50
                            bg-black/40
                            flex items-end
                        "
                    >
                        <div
                            className="
                                w-full bg-[var(--color-surface)]
                                rounded-t-2xl p-4
                                max-h-[80vh] overflow-auto
                            "
                        >
                            <div className="flex justify-between mb-4">
                                <h3 className="font-semibold">Filter</h3>
                                <button onClick={() => setShowFilter(false)}>
                                    ✕
                                </button>
                            </div>

                            <ListingSidebarFilters
                                filters={filters}
                                onChange={onChangeFilters}
                                isMobile={true}
                            />

                            <button
                                onClick={() => setShowFilter(false)}
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
                )}
            </div>
        );
    }

    // =============================
    // DESKTOP (tetap)
    // =============================
    return (
        <div className="flex">
            <ListingSidebarFilters
                filters={filters}
                onChange={onChangeFilters}
            />

            <div className="flex-1 p-6">
                {/* Search */}
                <input
                    type="text"
                    placeholder="Cari..."
                    value={filters.search}
                    onChange={(e) =>
                        onChangeFilters({
                            ...filters,
                            search: e.target.value,
                        })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-alt)] mb-4"
                />

                <ListingSortBar
                    sort={sort}
                    onChange={(v) => onChangeSort(v as ListingSort)}
                />

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {listings.map((item, index) => renderItem(item, index))}
                </div>

                <ListingPagination
                    page={page}
                    totalPages={totalPages}
                    onChange={onChangePage}
                />
            </div>
        </div>
    );
}
