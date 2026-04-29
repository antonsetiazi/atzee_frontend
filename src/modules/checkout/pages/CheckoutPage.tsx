// src/modules/checkout/pages/CheckoutPage.tsx

import { useEffect, useState } from "react";

import CheckoutView from "../components/CheckoutView";
import { useCheckout } from "../hooks/useCheckout";

import { useSnapPayment } from "@/core/payment/useSnapPayment";
import { notificationService } from "@/modules/notification/services/notification.service";
import { SmartNavigate } from "@/core/navigation/SmartNavigate";

const CLIENT_KEY = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;

export default function CheckoutPage() {
    const {
        items,
        confirmPayment,
        cancelCurrentBooking,
        selectedPartnerId,
        addressId,
    } = useCheckout();

    const { pay, loading: snapLoading } = useSnapPayment({
        clientKey: CLIENT_KEY,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    /* ===========================
       🔒 GUARD: EMPTY CHECKOUT
       =========================== */
    useEffect(() => {
        if (!items.length) {
            SmartNavigate.go("/");
        }
    }, [items]);

    /* ===========================
       🚀 HANDLE PAY
       =========================== */
    async function handlePay() {
        try {
            if (!items.length) {
                notificationService.toast.error("Tidak ada item di checkout");
                return;
            }

            if (!selectedPartnerId) {
                notificationService.toast.error("Partner belum dipilih");
                return;
            }

            if (!addressId) {
                notificationService.toast.error(
                    "Silakan pilih alamat terlebih dahulu",
                );
                return;
            }

            setIsSubmitting(true);

            const res = await confirmPayment();

            // 🔥 VALIDASI RESPONSE
            if (!res) {
                throw new Error("No response from payment API");
            }

            // 🔥 WALLET (DIRECT)
            if (res.type === "direct") {
                SmartNavigate.go(`/payment?order_id=${res.payment_id}`);
                return;
            }

            // 🔥 NEW: generic handler
            if (res.type === "popup" && res.payload.token) {
                pay(res.payload.token, {
                    onSuccess: () => {
                        SmartNavigate.go(`/payment?order_id=${res.payment_id}`);
                    },
                    onPending: () => {
                        SmartNavigate.go(`/payment?order_id=${res.payment_id}`);
                    },
                    onError: () => {
                        notificationService.toast.error(
                            "Pembayaran gagal. Silakan coba lagi.",
                        );
                    },
                    onClose: () => {
                        console.log("User menutup popup pembayaran");
                    },
                });

                return;
            }

            if (res.type === "redirect" && res.payload.url) {
                window.location.href = res.payload.url;
                return;
            }

            if (res.type === "instruction") {
                SmartNavigate.go(`/payment?order_id=${res.payment_id}`);
                return;
            }

            throw new Error("Invalid payment execution");
        } catch (err) {
            console.error("Payment error:", err);
            notificationService.toast.error(
                "Gagal memulai pembayaran. Silakan coba lagi.",
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleCancelBooking() {
        try {
            await cancelCurrentBooking();
            notificationService.toast.info("Booking berhasil dibatalkan");
            SmartNavigate.go("/services");
        } catch (err) {
            console.error(err);
            notificationService.toast.error("Gagal membatalkan booking");
        }
    }

    return (
        <CheckoutView
            items={items}
            onPay={handlePay}
            onCancel={handleCancelBooking}
            isSubmitting={isSubmitting || snapLoading}
        />
    );
}
