// src/business/tables/TablePagination.tsx

interface Props {
    total: number;
    page: number;
    pageSize: number;

    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
}

export default function TablePagination({
    total,
    page,
    pageSize,
    onPageChange,
    onPageSizeChange,
}: Props) {
    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    return (
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 text-sm text-gray-600">
            {/* Info */}
            <div>
                Page <strong>{page}</strong> of <strong>{totalPages}</strong> ·{" "}
                <strong>{total}</strong> items
            </div>

            {/* CONTROLS */}
            <div className="flex items-center gap-2">
                {/* PAGE SIZE */}
                <select
                    value={pageSize}
                    onChange={(e) => onPageSizeChange(Number(e.target.value))}
                    className="rounded-md border border-gray-300 px-2 py-1 text-sm"
                >
                    {[10, 20, 50, 100].map((size) => (
                        <option key={size} value={size}>
                            {size} / page
                        </option>
                    ))}
                </select>

                {/* PREV */}
                <button
                    disabled={page <= 1}
                    onClick={() => onPageChange(page - 1)}
                    className="
                        rounded-md border border-gray-300 px-3 py-1
                        hover:bg-gray-100
                        disabled:opacity-50
                    "
                >
                    Prev
                </button>

                {/* NEXT */}
                <button
                    disabled={page >= totalPages}
                    onClick={() => onPageChange(page + 1)}
                    className="
                        rounded-md border border-gray-300 px-3 py-1
                        hover:bg-gray-100
                        disabled:opacity-50
                    "
                >
                    Next
                </button>
            </div>
        </div>
    );
}
