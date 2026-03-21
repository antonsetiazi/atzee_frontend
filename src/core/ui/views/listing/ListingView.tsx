// src/core/ui/views/listing/ListingView.tsx

import ListingCard from "./ListingCard";
import ListingSidebarFilters from "./ListingSidebarFilters";
import ListingSortBar from "./ListingSortBar";
import ListingPagination from "./ListingPagination";
import { useBreakpoint } from "@/core/ui/layout/hooks/useBreakpoint";
import type {
    Listing,
    ListingFiltersState,
    ListingSort,
} from "./listing.types";

interface Props {
    listings: Listing[];

    filters: ListingFiltersState;
    onChangeFilters: (filters: ListingFiltersState) => void;

    sort: ListingSort;
    onChangeSort: (value: ListingSort) => void;

    page: number;
    totalPages: number;
    onChangePage: (page: number) => void;

    onItemClick?: (listing: Listing) => void;
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
                    {listings.map((p) => (
                        <ListingCard
                            key={p.id}
                            listing={p}
                            onClick={onItemClick}
                        />
                    ))}
                </div>

                {/* Pagination */}
                <ListingPagination
                    page={page}
                    totalPages={totalPages}
                    onChange={onChangePage}
                />

                {/* Drawer Filter */}
                {/* {showFilter && (
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
                                onChange={setFilters}
                                isMobile={isMobile}
                            />

                            <button
                                onClick={() => setShowFilter(false)}
                                className="
                                    mt-4 w-full py-2 rounded-lg
                                    bg-[var(--color-primary)]
                                    text-white
                                "
                            >
                                Terapkan
                            </button>
                        </div>
                    </div>
                )} */}
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
                    className="w-full px-4 py-3 mb-4 rounded-xl"
                />

                <ListingSortBar
                    sort={sort}
                    onChange={(v) => onChangeSort(v as ListingSort)}
                />

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {listings.map((p) => (
                        <ListingCard
                            key={p.id}
                            listing={p}
                            onClick={onItemClick}
                        />
                    ))}
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
