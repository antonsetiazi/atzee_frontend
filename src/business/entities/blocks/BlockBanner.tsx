// src/business/entities/blocks/BlockBanner.tsx

import { useEffect, useMemo, useState } from "react";
import EmptyState from "@/shared/ui/EmptyState";
import { useBreakpoint } from "@/core/ui/layout/hooks/useBreakpoint";

interface BannerItem {
    id: string | number;
    title?: string;
    subtitle?: string;
    image_url: string;
    link_url?: string;
    open_in_new_tab?: boolean;
    cta_text?: string;
}

interface Props {
    data?: BannerItem[];
    padding?: "none" | "sm" | "md" | "lg";
    margin_bottom?: "none" | "sm" | "md" | "lg";
}

const spacingMap = {
    none: "",
    sm: "px-2",
    md: "px-4",
    lg: "px-6",
};

const marginBottomMap = {
    none: "",
    sm: "mb-2",
    md: "mb-4",
    lg: "mb-6",
};

export default function BlockBanner({
    data = [],
    padding = "md",
    margin_bottom = "md",
}: Props) {
    const { isMobile } = useBreakpoint();
    const safeData = useMemo(() => (Array.isArray(data) ? data : []), [data]);
    const [current, setCurrent] = useState(0);

    // 🔥 Auto Slide
    useEffect(() => {
        if (safeData.length <= 1) return;

        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % safeData.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [safeData]);

    if (!safeData.length) {
        return <EmptyState message="Belum ada banner" />;
    }

    const handleClick = (item: BannerItem) => {
        if (item.link_url) {
            window.open(
                item.link_url,
                item.open_in_new_tab ? "_blank" : "_self",
            );
        }
    };

    return (
        <div
            className={`${spacingMap[padding]} ${marginBottomMap[margin_bottom]}`}
        >
            <div className="relative w-full overflow-hidden rounded-xl shadow-md">
                {/* 🔥 SLIDER */}
                <div
                    className="flex transition-transform duration-700 ease-out"
                    style={{
                        transform: `translateX(-${current * 100}%)`,
                    }}
                >
                    {safeData.map((item) => (
                        <div
                            key={item.id}
                            className="min-w-full relative cursor-pointer group"
                            onClick={() => handleClick(item)}
                        >
                            {item.image_url && (
                                <div className="w-full aspect-16/6 relative">
                                    <img
                                        src={item.image_url}
                                        alt={item.title}
                                        className="
                                            absolute inset-0 w-full h-full object-cover
                                            transition-transform duration-700
                                            group-hover:scale-105
                                        "
                                    />
                                    {/* 🔥 Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                                    {/* 🔥 CONTENT */}
                                    <div className="absolute bottom-6 left-6 text-white flex flex-col gap-2">
                                        {item.title && !isMobile && (
                                            <h2 className="text-lg font-bold leading-tight">
                                                {item.title}
                                            </h2>
                                        )}
                                        {item.subtitle && !isMobile && (
                                            <p className="text-sm sm:text-base opacity-90">
                                                {item.subtitle}
                                            </p>
                                        )}
                                        {item.cta_text && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleClick(item);
                                                }}
                                                className="
                                                    mt-3 w-fit
                                                    bg-primary px-4 py-2 rounded-lg
                                                    text-sm font-semibold
                                                    transition-all duration-300
                                                    hover:scale-105 hover:shadow-lg
                                                "
                                            >
                                                {item.cta_text}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* 🔥 DOTS */}
                {safeData.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                        {safeData.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrent(index)}
                                className={`
                                w-2.5 h-2.5 rounded-full transition-all duration-300
                                ${
                                    index === current
                                        ? "bg-white scale-110"
                                        : "bg-white/50"
                                }
                            `}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
