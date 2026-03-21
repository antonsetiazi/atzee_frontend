// src/core/ui/views/listing/ListingSortBar.tsx

interface Props {
    sort: string;
    onChange: (value: string) => void;
}

export default function ListingSortBar({ sort, onChange }: Props) {
    return (
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                Listing
            </h2>

            <select
                value={sort}
                onChange={(e) => onChange(e.target.value)}
                className="
                    px-3 py-2 rounded-lg text-sm
                    bg-[var(--color-surface-alt)]
                "
            >
                <option value="latest">Terbaru</option>
                <option value="price_asc">Harga Terendah</option>
                <option value="price_desc">Harga Tertinggi</option>
                <option value="sold">Terlaris</option>
                <option value="rating">Rating Tertinggi</option>
            </select>
        </div>
    );
}
