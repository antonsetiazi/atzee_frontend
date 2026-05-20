// src/core/ui/components/data_table/DataTableSearch.tsx

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface Props {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export default function DataTableSearch({
    value,
    onChange,
    placeholder = "Search...",
    className = "",
}: Props) {
    return (
        <div className={`relative w-full md:max-w-sm ${className} `}>
            {/* ICON */}

            <MagnifyingGlassIcon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />

            {/* INPUT */}

            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="h-10 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] pr-4 pl-10 text-sm transition-all outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/10"
            />
        </div>
    );
}
