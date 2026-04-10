// src/modules/listing/components/sections/ListingControls.tsx

import type { ListingSort } from "../../types/listing.types";

interface Props {
    sort: ListingSort;
    onChangeSort: (value: ListingSort) => void;
    onOpenFilter?: () => void;
    mobile?: boolean;
}

export default function ListingControls({
    sort,
    onChangeSort,
    onOpenFilter,
    mobile,
}: Props) {
    return (
        <div className="flex gap-2 mb-4">
            {mobile && (
                <button
                    onClick={onOpenFilter}
                    className="
                        flex-1 py-2 rounded-lg
                        bg-[var(--color-surface-alt)]
                        text-sm
                    "
                >
                    ⚙️ Filter
                </button>
            )}

            <select
                value={sort}
                onChange={(e) => onChangeSort(e.target.value as ListingSort)}
                className="flex-1 py-2 rounded-lg text-sm"
            >
                <option value="latest">Terbaru</option>
                <option value="price_asc">Termurah</option>
                <option value="price_desc">Termahal</option>
                <option value="sold">Terlaris</option>
                <option value="rating">Rating</option>
            </select>
        </div>
    );
}
