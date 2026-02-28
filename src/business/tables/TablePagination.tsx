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

    const isPrevDisabled = page <= 1;
    const isNextDisabled = page >= totalPages;

    return (
        <div
            className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between py-4"
            style={{
                color: "var(--text-secondary)",
            }}
        >
            {/* INFO */}
            <div className="text-sm">
                Page{" "}
                <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>
                    {page}
                </span>{" "}
                of{" "}
                <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>
                    {totalPages}
                </span>{" "}
                ·{" "}
                <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>
                    {total}
                </span>{" "}
                items
            </div>

            {/* CONTROLS */}
            <div className="flex items-center gap-3">
                {/* PAGE SIZE */}
                <select
                    value={pageSize}
                    onChange={(e) => onPageSizeChange(Number(e.target.value))}
                    className="px-3 py-2 text-sm rounded-xl transition-all duration-150"
                    style={{
                        background: "var(--color-surface-alt)",
                        border: "1px solid var(--color-border)",
                        color: "var(--text-primary)",
                    }}
                >
                    {[10, 20, 50, 100].map((size) => (
                        <option key={size} value={size}>
                            {size} / page
                        </option>
                    ))}
                </select>

                {/* SEGMENTED NAV */}
                <div
                    className="flex items-center rounded-xl overflow-hidden"
                    style={{
                        border: "1px solid var(--color-border)",
                        background: "var(--color-surface-alt)",
                    }}
                >
                    <button
                        disabled={isPrevDisabled}
                        onClick={() => onPageChange(page - 1)}
                        className="px-4 py-2 text-sm transition-all duration-150 disabled:opacity-40"
                        style={{
                            color: "var(--text-primary)",
                        }}
                        onMouseEnter={(e) =>
                            !isPrevDisabled &&
                            (e.currentTarget.style.background =
                                "var(--color-surface)")
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.background = "transparent")
                        }
                    >
                        Prev
                    </button>

                    <div
                        style={{
                            width: "1px",
                            background: "var(--color-border)",
                            height: "24px",
                        }}
                    />

                    <button
                        disabled={isNextDisabled}
                        onClick={() => onPageChange(page + 1)}
                        className="px-4 py-2 text-sm transition-all duration-150 disabled:opacity-40"
                        style={{
                            color: "var(--text-primary)",
                        }}
                        onMouseEnter={(e) =>
                            !isNextDisabled &&
                            (e.currentTarget.style.background =
                                "var(--color-surface)")
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.background = "transparent")
                        }
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
