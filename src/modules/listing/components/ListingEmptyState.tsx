// src/modules/listing/components/ListingEmptyState.tsx

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface Props {
    onReset?: () => void;
}

export default function ListingEmptyState({ onReset }: Props) {
    return (
        <div
            className="
                flex flex-col items-center justify-center
                py-16 px-6 text-center
            "
        >
            <MagnifyingGlassIcon className="w-14 h-14 text-gray-400 mb-4" />

            <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                Tidak ada layanan ditemukan
            </h3>

            <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-sm">
                Coba ubah kata pencarian atau filter kategori yang kamu pilih.
            </p>

            {onReset && (
                <button
                    onClick={onReset}
                    className="
                        mt-5 px-5 py-2 rounded-xl
                        bg-[var(--color-primary)]
                        text-white font-medium
                        hover:opacity-90 transition
                    "
                >
                    Reset Filter
                </button>
            )}
        </div>
    );
}
