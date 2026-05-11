// src/modules/finance/fixed_assets/components/filters/FixedAssetFilters.tsx

import { Search } from "lucide-react";

type Props = {
    search: string;
    status: string;
    onSearchChange: (value: string) => void;
    onStatusChange: (value: string) => void;
};

export default function FixedAssetFilters({
    search,
    status,
    onSearchChange,
    onStatusChange,
}: Props) {
    return (
        <div
            className="flex flex-col items-stretch justify-between gap-4 rounded-2xl border p-4 lg:flex-row lg:items-center"
            style={{
                background: "var(--color-surface)",

                borderColor: "var(--color-border)",
            }}
        >
            <div className="relative flex-1">
                <Search
                    size={18}
                    className="absolute top-1/2 left-3 -translate-y-1/2"
                    style={{
                        color: "var(--text-muted)",
                    }}
                />

                <input
                    type="text"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search assets..."
                    className="h-11 w-full rounded-xl border pr-4 pl-10 text-sm outline-none"
                    style={{
                        background: "var(--color-background)",
                        borderColor: "var(--color-border)",
                        color: "var(--text-primary)",
                    }}
                />
            </div>

            <div className="w-full lg:w-52">
                <select
                    value={status}
                    onChange={(e) => onStatusChange(e.target.value)}
                    className="h-11 w-full rounded-xl border px-4 text-sm outline-none"
                    style={{
                        background: "var(--color-background)",
                        borderColor: "var(--color-border)",
                        color: "var(--text-primary)",
                    }}
                >
                    <option value="">All Status</option>
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="disposed">Disposed</option>
                </select>
            </div>
        </div>
    );
}
