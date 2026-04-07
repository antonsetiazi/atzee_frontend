// src/modules/partner_schedule/components/ScheduleCard.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useNavigate } from "react-router-dom";

export default function ScheduleCard({ item }: { item: any }) {
    const navigate = useNavigate();

    const start = new Date(item.start_time);
    const end = new Date(item.end_time);
    const now = new Date();

    // 🔥 STATUS DINAMIS
    let badge = "";
    let color = "";

    if (item.status === "completed") {
        badge = "DONE";
        color = "text-gray-400";
    } else if (now >= start && now <= end) {
        badge = "ONGOING";
        color = "text-green-600";
    } else if (now < start) {
        badge = "UPCOMING";
        color = "text-blue-600";
    } else {
        badge = "MISSED"; // 🔥 ini lebih jujur dari DONE
        color = "text-red-500";
    }

    const time = `${start.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    })} - ${end.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    })}`;

    return (
        <div
            onClick={() => navigate(`/partner/orders/${item.id}`)}
            className="p-4 rounded-2xl border border-[var(--color-border)] bg-white space-y-2 cursor-pointer"
        >
            <div className="flex justify-between items-center">
                <p className="font-medium">{time}</p>

                {/* 🔥 STATUS BADGE */}
                <span className={`text-xs font-medium ${color}`}>{badge}</span>
            </div>

            {/* 🔥 TITLE */}
            <p className="text-sm font-semibold">{item.title || "Jadwal"}</p>

            {/* 🔥 ORDER NUMBER */}
            {item.order_number && (
                <p className="text-xs text-gray-400">#{item.order_number}</p>
            )}
        </div>
    );
}
