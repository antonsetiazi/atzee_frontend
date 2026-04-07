// src/modules/partner_schedule/components/WeeklyCalendar.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo } from "react";

const HOURS = Array.from({ length: 12 }, (_, i) => i + 8); // 08–19
const DAYS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

export default function WeeklyCalendar({ items }: { items: any[] }) {
    const weekDays = useMemo(() => {
        const today = new Date();
        const day = today.getDay();

        const monday = new Date(today);
        monday.setDate(today.getDate() - ((day + 6) % 7));

        return Array.from({ length: 7 }).map((_, i) => {
            const d = new Date(monday);
            d.setDate(monday.getDate() + i);
            return d;
        });
    }, []);

    return (
        <div className="overflow-auto bg-white shadow-sm border border-gray-100">
            {/* ================= HEADER ================= */}
            <div className="grid grid-cols-8 border-b border-gray-100 bg-gray-50/70 backdrop-blur">
                <div />

                {weekDays.map((d, i) => (
                    <div key={i} className="py-3 text-center">
                        <p className="text-xs font-medium text-gray-600">
                            {DAYS[i]}
                        </p>
                        <p className="text-[11px] text-gray-400">
                            {d.getDate()}
                        </p>
                    </div>
                ))}
            </div>

            {/* ================= BODY ================= */}
            {HOURS.map((hour) => (
                <div key={hour} className="grid grid-cols-8">
                    {/* JAM */}
                    <div className="px-2 py-3 text-[11px] text-gray-400 border-t border-gray-100">
                        {hour}:00
                    </div>

                    {/* KOLOM HARI */}
                    {weekDays.map((day, i) => {
                        const cellItems = items.filter((item) => {
                            const start = new Date(item.start_time);

                            return (
                                start.toDateString() === day.toDateString() &&
                                start.getHours() === hour
                            );
                        });

                        return (
                            <div
                                key={i}
                                className="h-20 border-t border-l border-gray-100 relative bg-white hover:bg-gray-50 transition"
                            >
                                {cellItems.map((item) => {
                                    const start = new Date(item.start_time);

                                    const top = (start.getMinutes() / 60) * 64;

                                    return (
                                        <div
                                            key={item.id}
                                            className="absolute left-1 right-1 rounded-lg px-2 py-1 text-[11px] shadow-sm backdrop-blur"
                                            style={{
                                                top: `${top}px`,
                                                backgroundColor:
                                                    "rgba(59,130,246,0.9)",
                                            }}
                                        >
                                            <p className="font-medium text-white leading-tight">
                                                {item.title}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
