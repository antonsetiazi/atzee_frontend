// src/core/ui/components/data_table/DataTablePagination.tsx

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface Props {
    page: number;
    totalPages: number;
    totalItems?: number;
    onPageChange: (page: number) => void;
}

export default function DataTablePagination({ page, totalPages, totalItems, onPageChange }: Props) {
    const canPrev = page > 1;
    const canNext = page < totalPages;

    return (
        <div className="flex flex-col gap-4 border-t border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-3 md:flex-row md:items-center md:justify-between">
            {/* INFO */}

            <div className="text-sm text-[var(--text-muted)]">
                Page <span className="font-medium text-[var(--text-primary)]">{page}</span> of{" "}
                <span className="font-medium text-[var(--text-primary)]">{totalPages}</span>
                {typeof totalItems === "number" && (
                    <>
                        {" "}
                        •{" "}
                        <span className="font-medium text-[var(--text-primary)]">
                            {totalItems}
                        </span>{" "}
                        items
                    </>
                )}
            </div>

            {/* ACTIONS */}

            <div className="flex items-center gap-2">
                {/* PREV */}

                <button
                    type="button"
                    disabled={!canPrev}
                    onClick={() => onPageChange(page - 1)}
                    className="inline-flex h-8 items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 text-xs font-medium transition-all hover:bg-[var(--color-surface-alt)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <ChevronLeftIcon className="h-3 w-3" />
                    Previous
                </button>

                {/* NEXT */}

                <button
                    type="button"
                    disabled={!canNext}
                    onClick={() => onPageChange(page + 1)}
                    className="inline-flex h-8 items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 text-xs font-medium transition-all hover:bg-[var(--color-surface-alt)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Next
                    <ChevronRightIcon className="h-3 w-3" />
                </button>
            </div>
        </div>
    );
}
