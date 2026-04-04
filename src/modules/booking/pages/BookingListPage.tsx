// src/modules/booking/pages/BookingListPage.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { bookingApi, type BookingItem } from "../api/booking.api";
import BookingCard from "../components/BookingCard";

export default function BookingListPage() {
    const [data, setData] = useState<BookingItem[]>([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

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

    if (loading) {
        return <div className="p-6">Memuat booking...</div>;
    }

    return (
        <div className="p-4 space-y-4">
            <h1 className="text-xl font-semibold">Booking Saya</h1>

            {data.length === 0 ? (
                <p className="text-sm text-gray-500">Belum ada booking</p>
            ) : (
                data.map((b) => (
                    <BookingCard
                        key={b.id}
                        booking={b}
                        onClick={() => navigate(`/bookings/${b.id}`)}
                    />
                ))
            )}
        </div>
    );
}
