/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/entities/blocks/BlockImageGallery.tsx

import { useState, useEffect, useMemo } from "react";
import EmptyState from "@/shared/ui/EmptyState";

interface Props {
    pageData?: any[];
}

export default function BlockImageGallery({ pageData }: Props) {
    const images = useMemo(() => {
        return Array.isArray(pageData) ? pageData : [pageData];
    }, [pageData]);

    const [current, setCurrent] = useState(0);

    // 🔹 Auto slide jika multiple images
    useEffect(() => {
        if (images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images]);

    if (!images.length) {
        return <EmptyState message="Belum ada foto" />;
    }

    return (
        <div className="relative w-full overflow-hidden rounded-2xl shadow-sm">
            {/* Slides */}
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                    transform: `translateX(-${current * 100}%)`,
                }}
            >
                {images.map((url, index) => (
                    <div
                        key={index}
                        className="min-w-full relative cursor-pointer"
                        onClick={() => window.open(url, "_blank")}
                    >
                        {/* Wrapper persegi seperti CardList */}
                        <div className="w-full aspect-[4/3] overflow-hidden rounded-xl">
                            <img
                                src={url}
                                alt={`image-${index}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Dots */}
            {images.length > 1 && (
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrent(idx)}
                            className={`w-3 h-3 rounded-full transition ${
                                idx === current ? "bg-white" : "bg-white/50"
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
