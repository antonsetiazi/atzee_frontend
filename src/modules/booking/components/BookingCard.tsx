// src/modules/booking/components/BookingCard.tsx

import type { BookingItem } from "../api/booking.api";

interface Props {
    booking: BookingItem;
    onClick?: () => void;
}

export default function BookingCard({ booking, onClick }: Props) {
    const start = new Date(booking.start_time);
    const end = new Date(booking.end_time);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("id-ID", {
            weekday: "short",
            day: "numeric",
            month: "short",
        });
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const statusConfig = {
        HOLD: {
            label: "Menunggu",
            className: "bg-yellow-100 text-yellow-700",
        },
        CONFIRMED: {
            label: "Dikonfirmasi",
            className: "bg-blue-100 text-blue-700",
        },
        ONGOING: {
            label: "Berlangsung",
            className: "bg-green-100 text-green-700",
        },
        COMPLETED: {
            label: "Selesai",
            className: "bg-gray-200 text-gray-700",
        },
        CANCELED: {
            label: "Dibatalkan",
            className: "bg-red-100 text-red-700",
        },
        EXPIRED: {
            label: "Kadaluarsa",
            className: "bg-gray-100 text-gray-500",
        },
    }[booking.status] || {
        label: booking.status,
        className: "bg-gray-100 text-gray-500",
    };

    return (
        <div
            onClick={onClick}
            className="
                group
                p-5 rounded-2xl cursor-pointer
                bg-[var(--color-surface)]
                border border-[var(--color-border)]
                hover:shadow-xl hover:-translate-y-[2px]
                transition-all duration-300
            "
        >
            {/* 🔹 TOP SECTION */}
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm text-[var(--text-muted)]">
                        {formatDate(start)}
                    </p>

                    <p className="text-lg font-semibold text-[var(--text-primary)]">
                        {formatTime(start)} - {formatTime(end)}
                    </p>
                </div>

                <span
                    className={`
                        px-3 py-1 rounded-full text-xs font-semibold
                        ${statusConfig.className}
                    `}
                >
                    {statusConfig.label}
                </span>
            </div>

            {/* 🔹 DIVIDER */}
            <div className="my-4 h-px bg-[var(--color-border)]" />

            {/* 🔹 BOTTOM SECTION */}
            <div className="flex justify-between items-center">
                <p className="text-xs text-[var(--text-muted)]">
                    Booking #{booking.id}
                </p>

                <span
                    className="
                    text-sm font-semibold
                    text-[var(--color-primary)]
                    group-hover:translate-x-1
                    transition
                "
                >
                    Detail →
                </span>
            </div>
        </div>
    );
}
