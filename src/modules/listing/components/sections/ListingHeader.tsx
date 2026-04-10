// src/modules/listing/components/sections/ListingHeader.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function ListingHeader({
    filters,
    onChangeFilters,
    mobile,
}: any) {
    const navigate = useNavigate();

    return (
        <div
            className={`flex gap-2 ${mobile ? "sticky top-0 z-20 p-4 border-b border-[var(--color-border)] bg-[var(--color-background)]" : "mb-4"}`}
        >
            {mobile && (
                <button onClick={() => navigate(-1)}>
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
