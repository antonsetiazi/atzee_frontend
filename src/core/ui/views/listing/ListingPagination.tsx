// src/core/ui/views/listing/ListingPagination.tsx

interface Props {
    page: number;
    totalPages: number;
    onChange: (page: number) => void;
}

export default function ListingPagination({
    page,
    totalPages,
    onChange,
}: Props) {
    return (
        <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }).map((_, i) => (
                <button
                    key={i}
                    onClick={() => onChange(i + 1)}
                    className={`
                        px-3 py-1 rounded
                        ${
                            page === i + 1
                                ? "bg-[var(--color-primary)] text-white"
                                : "bg-[var(--color-surface-alt)]"
                        }
                    `}
                >
                    {i + 1}
                </button>
            ))}
        </div>
    );
}
