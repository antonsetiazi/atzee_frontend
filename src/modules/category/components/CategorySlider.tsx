// src/modules/category/components/CategorySlider.tsx

import { useRef } from "react";
import CategoryCard from "./CategoryCard";
import { useDashboardCategories } from "../hooks/useDashboardCategories";
import { useBreakpoint } from "@/core/ui/layout/hooks/useBreakpoint";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LoadingState } from "@/core/ui/components";

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

    if (loading) return <LoadingState />;

    return (
        <section className={isMobile ? "px-1" : "px-6 py-2"}>
            <div className="mb-4 flex items-center justify-between">
                <h2 className={`font-semibold ${isMobile ? "text-xs" : "text-2xl"}`}>{title}</h2>

                {/* Desktop Arrow Controls */}
                {!isMobile && (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={scrollLeft}
                            className="left-0 z-10 rounded-full border border-gray-200 bg-white/90 p-2 shadow-md backdrop-blur transition hover:scale-105 hover:shadow-lg"
                        >
                            <ChevronLeft size={20} strokeWidth={2.5} />
                        </button>

                        {/* Right Arrow */}
                        <button
                            onClick={scrollRight}
                            className="right-0 z-10 rounded-full border border-gray-200 bg-white/90 p-2 shadow-md backdrop-blur transition hover:scale-105 hover:shadow-lg"
                        >
                            <ChevronRight size={20} strokeWidth={2.5} />
                        </button>
                    </div>
                )}
            </div>

            <div
                ref={sliderRef}
                className={`flex snap-x snap-mandatory pb-2 ${
                    isMobile ? "scrollbar-hide gap-3 overflow-x-auto" : "gap-5 overflow-hidden"
                } `}
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
