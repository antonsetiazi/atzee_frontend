// src/modules/category/components/CategorySlider.tsx

import { useRef } from "react";
import CategoryCard from "./CategoryCard";
import { useDashboardCategories } from "../hooks/useDashboardCategories";
import { useBreakpoint } from "@/core/ui/layout/hooks/useBreakpoint";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
    title?: string;
    scope?: string;
}

export default function CategorySlider({
    title = "Kategori",
    scope = "partners.service_category",
}: Props) {
    const { items, loading } = useDashboardCategories(scope);
    const { isMobile } = useBreakpoint();

    const sliderRef = useRef<HTMLDivElement>(null);

    function scrollLeft() {
        sliderRef.current?.scrollBy({
            left: -320,
            behavior: "smooth",
        });
    }

    function scrollRight() {
        sliderRef.current?.scrollBy({
            left: 320,
            behavior: "smooth",
        });
    }

    if (loading) {
        return (
            <div className="px-4 py-6 text-sm text-gray-500">Loading...</div>
        );
    }

    return (
        <section className={isMobile ? "px-1" : "px-6 py-2"}>
            <div className="flex items-center justify-between mb-4">
                <h2
                    className={`font-semibold ${
                        isMobile ? "text-xs" : "text-2xl"
                    }`}
                >
                    {title}
                </h2>

                {/* Desktop Arrow Controls */}
                {!isMobile && (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={scrollLeft}
                            className="
                                left-0 
                                z-10 bg-white/90 backdrop-blur
                                border border-gray-200
                                rounded-full shadow-md
                                p-2 hover:scale-105 hover:shadow-lg
                                transition
                            "
                        >
                            <ChevronLeft size={20} strokeWidth={2.5} />
                        </button>

                        {/* Right Arrow */}
                        <button
                            onClick={scrollRight}
                            className="
                                right-0 
                                z-10 bg-white/90 backdrop-blur
                                border border-gray-200
                                rounded-full shadow-md
                                p-2 hover:scale-105 hover:shadow-lg
                                transition
                            "
                        >
                            <ChevronRight size={20} strokeWidth={2.5} />
                        </button>
                    </div>
                )}
            </div>

            <div
                ref={sliderRef}
                className={`
                    flex pb-2 snap-x snap-mandatory
                    ${
                        isMobile
                            ? "gap-3 overflow-x-auto scrollbar-hide"
                            : "gap-5 overflow-hidden"
                    }
                `}
            >
                {items.map((item) => (
                    <div key={item.id} className="snap-start">
                        <CategoryCard item={item} isMobile={isMobile} />
                    </div>
                ))}
            </div>
        </section>
    );
}
