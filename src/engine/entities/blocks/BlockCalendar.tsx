// src/business/entities/blocks/BlockCalendar.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { fetchEntityDetail } from "@/engine/entities/api/entity.api";
import { LoadingState } from "@/core/ui/components";

interface Props {
    block: any;
    entityKey: string;
    context?: Record<string, any>;
}

function resolvePath(path: string, ctx: Record<string, any>) {
    return path.replace(/\{(.*?)\}/g, (_, key) => ctx[key] ?? "");
}

export default function BlockCalendar({ block, context = {} }: Props) {
    const [loading, setLoading] = useState(true);
    const [slots, setSlots] = useState<any[]>([]);
    const [selected, setSelected] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState(() => {
        return new Date().toISOString().split("T")[0];
    });

    useEffect(() => {
        async function load() {
            if (!block.data_source) return;

            setLoading(true);

            try {
                const baseUrl = resolvePath(block.data_source, context);

                const queryString = resolveQueryParams(block.query_params, context, selectedDate);

                const finalUrl = queryString ? `${baseUrl}?${queryString}` : baseUrl;

                const res = await fetchEntityDetail(finalUrl);

                // 🔥 backend return { date, slots }
                setSlots(res?.slots ?? []);
            } catch (err) {
                console.error("Failed to load availability:", err);
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [block.data_source, block.query_params, context, selectedDate]);

    function handleSelect(datetime: string) {
        setSelected(datetime);

        // 🔥 Emit event to form
        window.dispatchEvent(
            new CustomEvent("calendar:selected", {
                detail: {
                    field: block.bind_to_field,
                    value: datetime,
                },
            }),
        );
    }

    const availableCount = slots.filter((s) => s.available).length;

    if (loading) return <LoadingState />;

    // console.log(slots);
    // console.log(block);

    return (
        <div className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            {/* Header */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                    {block.title ?? "Select Schedule"}
                </h3>
                {block.description && (
                    <p className="mt-1 text-sm text-gray-500">{block.description}</p>
                )}
            </div>

            {/* Date Picker */}
            <div className="mb-6 flex items-center justify-between">
                <div className="flex flex-col">
                    <label className="mb-1 text-xs text-gray-500">Select Date</label>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="rounded-xl border border-gray-300 px-4 py-2 text-sm transition focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                <div className="text-sm text-gray-500">{availableCount} available slots</div>
            </div>

            {/* Slots */}
            {slots.length === 0 ? (
                <div className="py-12 text-center text-sm text-gray-400">
                    No schedule available for this date
                </div>
            ) : (
                <div
                    className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5"
                    style={{
                        maxHeight: block.height ?? 600,
                        overflowY: "auto",
                    }}
                >
                    {slots.map((slot, idx) => {
                        const disabled = !slot.available;
                        const isSelected = selected === slot.datetime;

                        return (
                            <button
                                key={idx}
                                disabled={disabled}
                                onClick={() => handleSelect(slot.datetime)}
                                className={`relative rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-200 ${
                                    isSelected
                                        ? "scale-105 border-blue-600 bg-blue-600 text-white shadow-lg"
                                        : "border-gray-200 bg-white"
                                } ${
                                    disabled
                                        ? "cursor-not-allowed opacity-40"
                                        : "hover:border-blue-400 hover:shadow-md"
                                } `}
                            >
                                <div className="flex items-center justify-center">
                                    {new Date(slot.datetime).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </div>

                                {!disabled && !isSelected && (
                                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-green-500"></span>
                                )}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

function resolveQueryParams(
    params: Record<string, string> = {},
    context: Record<string, any>,
    selectedDate: string,
) {
    const resolved: Record<string, string> = {};

    Object.entries(params).forEach(([key, value]) => {
        if (value === "$selected_date") {
            resolved[key] = selectedDate;
        } else if (value.startsWith("$form.")) {
            const field = value.replace("$form.", "");
            resolved[key] = context?.form?.[field] ?? "";
        } else {
            resolved[key] = value;
        }
    });

    return new URLSearchParams(resolved).toString();
}
