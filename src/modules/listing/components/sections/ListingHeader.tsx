// src/modules/listing/components/sections/ListingHeader.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { SmartNavigate } from "@/core/navigation/SmartNavigate";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function ListingHeader({
    filters,
    onChangeFilters,
    mobile,
}: any) {
    return (
        <div
            className={`flex gap-2 ${mobile ? "sticky top-0 z-20 p-4 border-b border-[var(--color-border)] bg-[var(--color-background)]" : "mb-4"}`}
        >
            {mobile && (
                <button onClick={() => SmartNavigate.back()}>
                    <ArrowLeftIcon className="w-5 h-5" />
                </button>
            )}

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
                className="flex-1 px-4 py-3 rounded-xl bg-[var(--color-surface-alt)]"
            />
        </div>
    );
}
