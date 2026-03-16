// src/core/ui/components/pagination/Pagination.tsx

interface PaginationProps {
    page: number;
    totalPages: number;
    onChange: (page: number) => void;
    className?: string;
}

export default function Pagination({
    page,
    totalPages,
    onChange,
    className = "",
}: PaginationProps) {
    if (totalPages <= 1) return null;

    const createPages = () => {
        const pages: (number | "...")[] = [];

        const start = Math.max(1, page - 2);
        const end = Math.min(totalPages, page + 2);

        if (start > 1) {
            pages.push(1);
            if (start > 2) pages.push("...");
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (end < totalPages) {
            if (end < totalPages - 1) pages.push("...");
            pages.push(totalPages);
        }

        return pages;
    };

    const pages = createPages();

    return (
        <div
            className={`
            flex items-center gap-3
            ${className}
        `}
        >
            {/* Prev */}
            <button
                onClick={() => onChange(page - 1)}
                disabled={page === 1}
                className="
                px-4 py-2
                text-sm
                rounded-default
                border border-default
                bg-surface
                text-secondary
                transition-all duration-200
                hover:bg-surface-alt
                hover:-translate-y-[1px]
                disabled:opacity-40
                disabled:hover:translate-y-0
                "
            >
                Prev
            </button>

            {/* Pages */}
            <div
                className="
                flex items-center
                gap-1
                p-1
                rounded-default
                bg-surface
                border border-default
                "
            >
                {pages.map((p, i) =>
                    p === "..." ? (
                        <span
                            key={`ellipsis-${i}`}
                            className="px-3 text-muted text-sm"
                        >
                            ...
                        </span>
                    ) : (
                        <button
                            key={`page-${p}-${i}`}
                            onClick={() => onChange(p)}
                            className={`
                            relative
                            w-9 h-9
                            text-sm
                            rounded-default
                            transition-all duration-200
                            ${
                                p === page
                                    ? `
                                    text-white
                                    bg-[var(--color-primary)]
                                    shadow-default
                                    `
                                    : `
                                    text-secondary
                                    hover:bg-surface-alt
                                    hover:-translate-y-[1px]
                                    `
                            }
                            `}
                        >
                            {p}
                        </button>
                    ),
                )}
            </div>

            {/* Next */}
            <button
                onClick={() => onChange(page + 1)}
                disabled={page === totalPages}
                className="
                px-4 py-2
                text-sm
                rounded-default
                border border-default
                bg-surface
                text-secondary
                transition-all duration-200
                hover:bg-surface-alt
                hover:-translate-y-[1px]
                disabled:opacity-40
                disabled:hover:translate-y-0
                "
            >
                Next
            </button>
        </div>
    );
}
