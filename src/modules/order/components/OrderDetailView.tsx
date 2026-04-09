// src/modules/order/components/OrderDetailView.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Order } from "@/business/order/order.types";
import OrderTimeline from "./OrderTimeline";
import OrderItemRow from "./OrderItemRow";
import { formatValue } from "@/shared/utils/formatValue";
import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from "@/core/config/format.config";

import { completeOrderApi } from "@/business/order/order.api";
import { orderStore } from "@/business/order/order.store";
import { HeaderPage } from "@/core/ui/components";
import { useBookingReview } from "@/modules/review/hooks/useBookingReview";
import BookingTimeline from "@/modules/booking/components/BookingTimeline";
import ReviewActionSection from "@/modules/review/components/ReviewActionSection";
import ReviewItem from "@/modules/review/components/ReviewItem";

interface Props {
    order: Order;
    booking: any;
}

function getStatusStyle(status: string) {
    switch (status) {
        case "paid":
            return "bg-green-100 text-green-600";
        case "pending":
            return "bg-yellow-100 text-yellow-600";
        case "failed":
            return "bg-red-100 text-red-600";
        case "completed":
            return "bg-blue-100 text-blue-600";
        default:
            return "bg-gray-100 text-gray-500";
    }
}

export default function OrderDetailView({ order, booking }: Props) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const { review, loading: reviewLoading } = useBookingReview(
        Number(booking?.id),
    );

    const handleComplete = async () => {
        const confirm = window.confirm(
            "Apakah Anda yakin layanan sudah selesai?",
        );

        if (!confirm) return;

        try {
            setLoading(true);
            await completeOrderApi(order.id);

            // 🔥 UPDATE LOCAL STORE
            orderStore.completeOrder(order.id);

            alert("Pesanan berhasil diselesaikan");
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert("Gagal menyelesaikan pesanan");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <HeaderPage title="Rincian Pesanan" />

            <div className="max-w-4xl mx-auto p-4 space-y-6">
                {/* ORDER CARD */}
                <div className="p-5 rounded-2xl border border-[var(--color-border)] bg-white space-y-3 shadow-sm">
                    <div className="flex justify-between items-center">
                        <h2 className="font-bold text-lg">
                            Order #
                            {order.order_number || String(order.id).slice(0, 6)}
                        </h2>

                        <span
                            className={`
                            px-3 py-1 text-xs rounded-full font-medium
                            ${getStatusStyle(order.status)}
                        `}
                        >
                            {order.status}
                        </span>
                    </div>

                    <p className="text-sm text-gray-500">
                        {formatValue(order.createdAt, { format: "datetime" })}
                    </p>

                    <div className="flex justify-between items-center pt-2 border-t border-[var(--color-border)]">
                        <p className="text-sm text-gray-500">
                            Metode Pembayaran
                        </p>
                        <p className="font-medium">{order.paymentMethod}</p>
                    </div>

                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">Total</p>
                        <p className="font-semibold text-lg">
                            {formatValue(order.total, {
                                format: "currency",
                                currency: DEFAULT_CURRENCY,
                                locale: DEFAULT_LOCALE,
                            })}
                        </p>
                    </div>
                </div>

                {/* ITEMS */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Item Pesanan</h3>

                    <div className="space-y-3">
                        {order.items.map((item) => (
                            <OrderItemRow key={item.id} item={item} />
                        ))}
                    </div>
                </div>

                {/* BOOKING INFO */}
                {booking && (
                    <div className="p-5 rounded-2xl border border-[var(--color-border)] bg-white shadow-sm space-y-4">
                        <h3 className="font-semibold">Status Booking</h3>

                        <BookingTimeline status={booking.status} />
                    </div>
                )}

                {/* TRACKING */}
                {order.partner &&
                    ["accepted", "on_going"].includes(order.status) && (
                        <div className="p-5 rounded-2xl border border-[var(--color-border)] bg-white shadow-sm">
                            <button
                                onClick={() =>
                                    navigate(`/tracking/${order.id}`)
                                }
                                className="w-full py-3 rounded-xl font-semibold bg-green-600 text-white hover:bg-green-700 transition"
                            >
                                Lacak Partner
                            </button>

                            <p className="text-xs text-gray-500 mt-2 text-center">
                                Lihat posisi partner secara real-time
                            </p>
                        </div>
                    )}

                {order.selectedPartner && !order.partner && (
                    <div className="p-5 rounded-2xl border border-[var(--color-border)] bg-white shadow-sm space-y-2">
                        <p className="text-sm text-gray-500">
                            Menunggu konfirmasi dari partner
                        </p>

                        <p className="font-semibold">
                            {order.selectedPartner.name}
                        </p>

                        <p className="text-xs text-gray-400">
                            Partner akan segera menerima pesanan kamu
                        </p>
                    </div>
                )}

                {/* TIMELINE */}
                <div className="p-5 rounded-2xl border border-[var(--color-border)] bg-white shadow-sm">
                    <OrderTimeline status={order.status} />
                </div>

                {/* 🔥 COMPLETE ACTION */}
                {order.payment_status === "paid" &&
                    ["accepted", "on_going"].includes(order.status) && (
                        <div className="p-5 rounded-2xl border border-[var(--color-border)] bg-white shadow-sm">
                            <button
                                onClick={handleComplete}
                                disabled={loading}
                                className={`
                            w-full py-3 rounded-xl font-semibold transition
                            ${
                                loading
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-blue-600 text-white hover:bg-blue-700"
                            }
                        `}
                            >
                                {loading
                                    ? "Memproses..."
                                    : "Konfirmasi Layanan Selesai"}
                            </button>

                            <p className="text-xs text-gray-500 mt-2 text-center">
                                Klik jika layanan sudah selesai dilakukan oleh
                                partner
                            </p>
                        </div>
                    )}

                {/* REVIEW */}
                {booking?.status === "COMPLETED" && (
                    <div className="p-5 rounded-2xl border border-[var(--color-border)] bg-white shadow-sm">
                        <h3 className="font-semibold mb-3">Review Layanan</h3>

                        {booking.can_review && (
                            <ReviewActionSection
                                bookingId={booking.id}
                                canReview={booking.can_review}
                                onSuccess={() => window.location.reload()}
                            />
                        )}

                        {booking.has_reviewed && review && (
                            <ReviewItem review={review} />
                        )}

                        {reviewLoading && (
                            <p className="text-sm text-gray-500">
                                Memuat review...
                            </p>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
