// src/core/ui/components/data_table/DataTableToolbar.tsx

interface Props {
    left?: React.ReactNode;
    right?: React.ReactNode;
}

export default function DataTableToolbar({ left, right }: Props) {
    return (
        <div className="flex flex-col gap-3 border-b border-[var(--color-border)] bg-[var(--color-surface)] p-3 md:flex-row md:items-center md:justify-between">
            {/* LEFT */}
            <div className="flex flex-1 items-center gap-2">{left}</div>

            {/* RIGHT */}
            <div className="flex flex-wrap items-center gap-2">{right}</div>
        </div>
    );
}
