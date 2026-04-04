// src/modules/listing/components/ListingFilters.tsx

import type { ListingFiltersState } from "../types/listing.types";

interface Props {
    filters: ListingFiltersState;
    onChange: (filters: ListingFiltersState) => void;
}

export default function ListingFilters({ filters, onChange }: Props) {
    function update<K extends keyof ListingFiltersState>(
        key: K,
        value: ListingFiltersState[K],
    ) {
        onChange({ ...filters, [key]: value });
    }

    function clearFilters() {
        onChange({
            search: "",
            category: [],
            location: [],
            minPrice: undefined,
            maxPrice: undefined,
        });
    }

    const isActive =
        filters.search ||
        filters.category.length > 0 ||
        filters.location.length > 0 ||
        filters.minPrice ||
        filters.maxPrice;

    return (
        <div
            className="
                p-4 rounded-[var(--radius)]
                bg-[var(--color-surface)]
                border border-[var(--color-border)]
                shadow-[var(--shadow)]
                space-y-3
            "
        >
            {/* Top Row */}
            <div className="flex flex-wrap gap-2 items-center">
                {/* Search */}
                <input
                    type="text"
                    placeholder="🔍 Cari produk..."
                    value={filters.search}
                    onChange={(e) => update("search", e.target.value)}
                    className="
                        px-4 py-2 rounded-full text-sm
                        bg-[var(--color-surface-alt)]
                        text-[var(--text-primary)]
                        outline-none
                        focus:ring-2 focus:ring-[var(--color-primary)]
                        w-60
                    "
                />

                {/* Category */}
                <select
                    value={filters.category[0] || ""}
                    onChange={(e) =>
                        update(
                            "category",
                            e.target.value ? [e.target.value] : [],
                        )
                    }
                    className="
                        px-3 py-2 rounded-full text-sm
                        bg-[var(--color-surface-alt)]
                        text-[var(--text-primary)]
                        outline-none
                    "
                >
                    <option value="">Semua Kategori</option>
                    <option value="Elektronik">Elektronik</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Fashion">Fashion</option>
                </select>

                {/* Location */}
                <input
                    type="text"
                    placeholder="📍 Lokasi"
                    value={filters.location[0] || ""}
                    onChange={(e) =>
                        update(
                            "location",
                            e.target.value ? [e.target.value] : [],
                        )
                    }
                    className="
                        px-3 py-2 rounded-full text-sm
                        bg-[var(--color-surface-alt)]
                        text-[var(--text-primary)]
                        outline-none
                        w-40
                    "
                />

                {/* Clear Button */}
                {isActive && (
                    <button
                        onClick={clearFilters}
                        className="
                            ml-auto
                            text-sm px-3 py-2 rounded-full
                            bg-red-100 text-red-600
                            hover:opacity-80
                            transition
                        "
                    >
                        Reset
                    </button>
                )}
            </div>

            {/* Bottom Row (Price Range) */}
            <div className="flex flex-wrap gap-2 items-center">
                <input
                    type="number"
                    placeholder="Min Harga"
                    value={filters.minPrice ?? ""}
                    onChange={(e) =>
                        update("minPrice", Number(e.target.value) || undefined)
                    }
                    className="
                        px-3 py-2 rounded-full text-sm
                        bg-[var(--color-surface-alt)]
                        text-[var(--text-primary)]
                        outline-none
                        w-32
                    "
                />

                <span className="text-[var(--text-muted)] text-sm">-</span>

                <input
                    type="number"
                    placeholder="Max Harga"
                    value={filters.maxPrice ?? ""}
                    onChange={(e) =>
                        update("maxPrice", Number(e.target.value) || undefined)
                    }
                    className="
                        px-3 py-2 rounded-full text-sm
                        bg-[var(--color-surface-alt)]
                        text-[var(--text-primary)]
                        outline-none
                        w-32
                    "
                />

                {/* Active Indicator */}
                {isActive && (
                    <span className="text-xs text-[var(--color-primary)] ml-2">
                        Filter aktif
                    </span>
                )}
            </div>
        </div>
    );
}
