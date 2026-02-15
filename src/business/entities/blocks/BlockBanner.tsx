/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/entities/blocks/BlockBanner.tsx

import { useCallback, useEffect, useState } from "react";
import { fetchTableData } from "./../entity.api";
import type { EntityQuery } from "./../entity.query.types";
import EmptyState from "@/shared/ui/EmptyState";

interface Props {
    schema: any;
    block: any;
}

export default function BlockBanner({ schema, block }: Props) {
    const [data, setData] = useState<any[]>([]);
    const [loadingData, setLoadingData] = useState(true);
    const [current, setCurrent] = useState(0);

    const [query] = useState<EntityQuery>({
        page: 1,
        pageSize: 10,
    });

    const refreshData = useCallback(async () => {
        if (!block?.data_source) return;

        setLoadingData(true);
        try {
            const res = await fetchTableData(schema.entity, block.data_source, {
                ...(block.query || {}),
                ...query,
            });

            setData(res.items);
        } catch (err) {
            console.error("Failed to fetch banners:", err);
            setData([]);
        } finally {
            setLoadingData(false);
        }
    }, [schema.entity, block, query]);

    useEffect(() => {
        refreshData();
    }, [refreshData]);

    // 🔥 Auto Slide
    useEffect(() => {
        if (data.length <= 1) return;

        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % data.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [data]);

    if (loadingData) {
        return (
            <div className="bg-white rounded shadow p-6">
                <div className="text-sm text-gray-500">Loading banners...</div>
            </div>
        );
    }

    if (!data.length) {
        return <EmptyState />;
    }

    return (
        <div className="relative w-full overflow-hidden rounded shadow-lg">
            {/* Slides */}
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                    transform: `translateX(-${current * 100}%)`,
                }}
            >
                {data.map((item) => (
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

                        {/* Overlay */}
                        {/* <div className="absolute inset-0 bg-black/30 flex items-end">
                            <div className="p-6 text-white">
                                <h2 className="text-xl md:text-2xl font-semibold">
                                    {item.title}
                                </h2>
                            </div>
                        </div> */}
                    </div>
                ))}
            </div>

            {/* Dots */}
            {data.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {data.map((_, index) => (
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
