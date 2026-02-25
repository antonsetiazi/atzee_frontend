/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/entities/blocks/BlockBanner.tsx

import { useEffect, useMemo, useState } from "react";
import EmptyState from "@/shared/ui/EmptyState";

interface Props {
    data?: any[];
}

export default function BlockBanner({ data = [] }: Props) {
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
        return <EmptyState />;
    }

    return (
        <div className="relative w-full overflow-hidden rounded-2xl shadow-lg">
            {/* Slides */}
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                    transform: `translateX(-${current * 100}%)`,
                }}
            >
                {safeData.map((item) => (
                    <div
                        key={item.id}
                        className="min-w-full relative cursor-pointer"
                        onClick={() => {
                            if (item.link_url) {
                                window.open(
                                    item.link_url,
                                    item.open_in_new_tab ? "_blank" : "_self",
                                );
                            }
                        }}
                    >
                        {item.image_url && (
                            <div className="w-full aspect-16/6 relative">
                                <img
                                    src={item.image_url}
                                    alt={item.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Dots */}
            {safeData.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {safeData.map((_: any, index: number) => (
                        <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`w-3 h-3 rounded-full transition ${
                                index === current ? "bg-white" : "bg-white/50"
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
