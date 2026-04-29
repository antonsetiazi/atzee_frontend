// src/modules/booking/pages/BookingListPage.tsx

import { useEffect, useState } from "react";

import { bookingApi, type BookingItem } from "../api/booking.api";
import BookingCard from "../components/BookingCard";
import { HeaderPage, PageSkeleton } from "@/core/ui/components";
import { SmartNavigate } from "@/core/navigation/SmartNavigate";

export default function BookingListPage() {
    const [data, setData] = useState<BookingItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetch() {
            try {
                const res = await bookingApi.getMyBookings();
                setData(res || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetch();
    }, []);

    if (loading) return <PageSkeleton />;

    return (
        <>
            <HeaderPage
                title="Booking Saya"
                subtitle="Riwayat transaksi booking Anda"
            />
            <div className="p-4 space-y-4">
                {data.length === 0 ? (
                    <p className="text-sm text-gray-500">Belum ada booking</p>
                ) : (
                    data.map((b) => (
                        <BookingCard
                            key={b.id}
                            booking={b}
                            onClick={() =>
                                SmartNavigate.go(`/bookings/${b.id}`)
                            }
                        />
                    ))
                )}
            </div>
        </>
    );
}
