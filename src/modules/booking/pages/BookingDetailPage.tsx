// src/modules/booking/pages/BookingDetailPage.tsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { bookingApi, type BookingItem } from "../api/booking.api";
import BookingTimeline from "../components/BookingTimeline";

export default function BookingDetailPage() {
    const { id } = useParams();

    const [data, setData] = useState<BookingItem | null>(null);

    useEffect(() => {
        async function fetch() {
            if (!id) return;

            const res = await bookingApi.getDetail(id);
            setData(res);
        }

        fetch();
    }, [id]);

    if (!data) {
        return (
            <div className="p-6 text-center text-[var(--text-muted)]">
                Memuat detail booking...
            </div>
        );
    }

    const start = new Date(data.start_time);
    const end = new Date(data.end_time);

    const formatDate = (date: Date) =>
        date.toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });

    const formatTime = (date: Date) =>
        date.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
        });

    const statusConfig = {
        HOLD: {
            label: "Menunggu Pembayaran",
            className: "bg-yellow-500",
        },
        CONFIRMED: {
            label: "Dikonfirmasi",
            className: "bg-blue-500",
        },
        ONGOING: {
            label: "Sedang Berlangsung",
            className: "bg-green-500",
        },
        COMPLETED: {
            label: "Selesai",
            className: "bg-gray-500",
        },
        CANCELED: {
            label: "Dibatalkan",
            className: "bg-red-500",
        },
        EXPIRED: {
            label: "Kadaluarsa",
            className: "bg-gray-400",
        },
    }[data.status] || {
        label: data.status,
        className: "bg-gray-400",
    };

    return (
        <div className="p-4 space-y-6">
            {/* 🔹 HEADER */}
            <div className="space-y-1">
                <h1 className="text-xl font-semibold">Detail Booking</h1>
                <p className="text-sm text-[var(--text-muted)]">
                    ID #{data.id}
                </p>
            </div>

            {/* 🔥 HERO STATUS CARD */}
            <div
                className={`
                    p-5 rounded-2xl text-white
                    shadow-md
                    ${statusConfig.className}
                `}
            >
                <p className="text-sm opacity-80">Status</p>
                <p className="text-lg font-semibold">{statusConfig.label}</p>
            </div>

            {/* 🕒 TIME CARD */}
            <div
                className="
                    p-5 rounded-2xl
                    border border-[var(--color-border)]
                    bg-[var(--color-surface)]
                    shadow-sm
                "
            >
                <p className="text-sm text-[var(--text-muted)] mb-1">Jadwal</p>

                <p className="font-semibold text-[var(--text-primary)]">
                    {formatDate(start)}
                </p>

                <p className="text-sm text-[var(--text-muted)] mt-1">
                    {formatTime(start)} - {formatTime(end)}
                </p>
            </div>

            {/* 🔄 TIMELINE CARD */}
            <div
                className="
                    p-5 rounded-2xl
                    border border-[var(--color-border)]
                    bg-[var(--color-surface)]
                    shadow-sm
                "
            >
                <p className="text-sm text-[var(--text-muted)] mb-3">
                    Progress Booking
                </p>

                <BookingTimeline status={data.status} />
            </div>
        </div>
    );
}
