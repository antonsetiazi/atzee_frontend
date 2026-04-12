// src/modules/listing/components/ListingSidebarFilters.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import type { ListingFiltersState } from "../types/listing.types";
import { useCategories } from "../hooks/useCategories";
import { useCities } from "../hooks/useCities";

interface Props {
    filters: ListingFiltersState;
    onChange: (filters: ListingFiltersState) => void;
    isMobile?: boolean;
}

interface SectionProps {
    title: string;
    name: string;
    isOpen: boolean;
    onToggle: (name: string) => void;
    isMobile?: boolean;
    count?: number;
    children: React.ReactNode;
}

// ==============================
// 🔥 Chevron Icon (Mobile Only)
// ==============================
function Chevron({ open }: { open: boolean }) {
    return (
        <svg
            className={`
                w-4 h-4 transition-transform duration-300
                ${open ? "rotate-180" : ""}
            `}
            viewBox="0 0 24 24"
            fill="none"
        >
            <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

// ==============================
// 🔥 Section Component
// ==============================
function Section({
    title,
    name,
    isOpen,
    onToggle,
    isMobile,
    count,
    children,
}: SectionProps) {
    const clickable = !!isMobile;

    return (
        <div>
            {/* Header */}
            <div
                onClick={() => clickable && onToggle(name)}
                className={`
                    w-full flex justify-between items-center
                    text-sm font-semibold
                    text-[var(--text-primary)]
                    ${clickable ? "cursor-pointer" : "cursor-default"}
                `}
            >
                <span className="flex items-center gap-2">
                    {title}
                    {count ? (
                        <span
                            className="
                            text-xs px-2 py-0.5 rounded-full
                            bg-[var(--color-primary)] text-white
                        "
                        >
                            {count}
                        </span>
                    ) : null}
                </span>

                {/* Chevron ONLY mobile */}
                {isMobile && <Chevron open={isOpen} />}
            </div>

            {/* Content */}
            <div
                className={`
                    overflow-hidden transition-all duration-300
                    ${
                        isMobile
                            ? isOpen
                                ? "max-h-96 opacity-100 mt-2"
                                : "max-h-0 opacity-0"
                            : "max-h-none opacity-100 mt-2"
                    }
                `}
            >
                <div className="space-y-2">{children}</div>
            </div>
        </div>
    );
}

// ==============================
// 🔥 MAIN COMPONENT
// ==============================

export default function ListingSidebarFilters({
    filters,
    onChange,
    isMobile,
}: Props) {
    const [openSection, setOpenSection] = useState<string | null>("category");

    const { categories, loading } = useCategories("partners.service_category"); // scope yang sesuai

    const { cities, loading: loadingCities } = useCities();

    function toggleSection(name: string) {
        setOpenSection((prev) => (prev === name ? null : name));
    }

    function toggleCategory(value: string) {
        const current = filters.category || [];

        const exists = current.includes(value);

        const updated = exists
            ? current.filter((v) => v !== value)
            : [...current, value];

        onChange({ ...filters, category: updated });
    }

    function update<K extends keyof ListingFiltersState>(
        key: K,
        value: ListingFiltersState[K],
    ) {
        onChange({ ...filters, [key]: value });
    }

    const categoryCount = filters.category?.length || 0;
    const locationCount = filters.useMyLocation || filters.city ? 1 : 0;
    const priceActive = filters.minPrice || filters.maxPrice ? 1 : 0;

    return (
        <div
            className={`
                ${isMobile ? "w-full space-y-6 pb-24" : "w-64 space-y-6"}
                p-4
                bg-[var(--color-surface)]
                ${isMobile ? "" : "border-r border-[var(--color-border)]"}
            `}
        >
            {/* Category */}
            <Section
                title="Kategori"
                name="category"
                isOpen={openSection === "category"}
                onToggle={toggleSection}
                isMobile={isMobile}
                count={categoryCount}
            >
                {loading ? (
                    <div className="text-sm text-gray-500">Loading...</div>
                ) : (
                    categories.map((cat) => (
                        <label
                            key={cat.id}
                            className="flex items-center gap-2 text-sm"
                        >
                            <input
                                type="checkbox"
                                checked={(filters.category as any)?.includes(
                                    cat.code,
                                )}
                                onChange={() => toggleCategory(cat.code)}
                            />
                            {cat.name}
                        </label>
                    ))
                )}
            </Section>

            <hr className="border-[var(--color-border)]" />

            {/* Location */}
            <Section
                title="Lokasi"
                name="location"
                isOpen={openSection === "location"}
                onToggle={toggleSection}
                isMobile={isMobile}
                count={locationCount}
            >
                {/* 🔥 USE MY LOCATION */}
                <label className="flex items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        checked={filters.useMyLocation || false}
                        onChange={(e) =>
                            onChange({
                                ...filters,
                                useMyLocation: e.target.checked,
                                city: e.target.checked
                                    ? undefined
                                    : filters.city,
                            })
                        }
                    />
                    Gunakan lokasi saya
                </label>

                {/* 🔥 RADIUS (ONLY IF ENABLED) */}
                {filters.useMyLocation && (
                    <div className="pl-6 mt-2 space-y-2 text-sm">
                        {[5, 10, 25].map((r) => (
                            <label key={r} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="radius"
                                    checked={filters.radius === r}
                                    onChange={() =>
                                        onChange({ ...filters, radius: r })
                                    }
                                />
                                {r} km
                            </label>
                        ))}
                    </div>
                )}

                {/* 🔥 CITY SELECT (ONLY IF NOT USING GPS) */}
                {!filters.useMyLocation && (
                    <select
                        value={filters.city || ""}
                        onChange={(e) =>
                            onChange({
                                ...filters,
                                city: e.target.value || undefined,
                            })
                        }
                        className="
                            w-full px-3 py-2 text-sm
                            border border-[var(--color-border)]
                            rounded-lg
                        "
                    >
                        <option value="">Semua lokasi</option>
                        {loadingCities ? (
                            <option disabled>Loading...</option>
                        ) : (
                            cities.map((city) => (
                                <option key={city.id} value={city.code}>
                                    {city.name}
                                </option>
                            ))
                        )}
                    </select>
                )}
            </Section>

            <hr className="border-[var(--color-border)]" />

            {/* Price */}
            <Section
                title="Harga"
                name="price"
                isOpen={openSection === "price"}
                onToggle={toggleSection}
                isMobile={isMobile}
                count={priceActive}
            >
                <div
                    className={`
                    ${isMobile ? "flex flex-col gap-2" : "flex gap-2"}
                `}
                >
                    <input
                        type="number"
                        placeholder="Min"
                        value={filters.minPrice ?? ""}
                        onChange={(e) =>
                            update(
                                "minPrice",
                                Number(e.target.value) || undefined,
                            )
                        }
                        className="w-full px-3 py-2 text-sm border border-[var(--color-border)] rounded-lg"
                    />

                    <input
                        type="number"
                        placeholder="Max"
                        value={filters.maxPrice ?? ""}
                        onChange={(e) =>
                            update(
                                "maxPrice",
                                Number(e.target.value) || undefined,
                            )
                        }
                        className="w-full px-3 py-2 text-sm border border-[var(--color-border)] rounded-lg"
                    />
                </div>
            </Section>

            {/* Sticky Apply Button */}
            {isMobile && (
                <div
                    className="
                        fixed bottom-0 left-0 right-0
                        p-4
                        bg-[var(--color-surface)]
                        border-t border-[var(--color-border)]
                    "
                >
                    <button
                        className="
                            w-full py-3 rounded-xl
                            bg-[var(--color-primary)]
                            text-white font-semibold
                            shadow-[var(--shadow)]
                            hover:opacity-90 transition
                        "
                    >
                        Terapkan Filter
                    </button>
                </div>
            )}
        </div>
    );
}
