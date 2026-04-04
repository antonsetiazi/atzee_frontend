// src/modules/checkout/pages/CheckoutPage.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CheckoutView from "../components/CheckoutView";
import { useCheckout } from "../hooks/useCheckout";

import { useSnapPayment } from "@/core/payment/useSnapPayment";

const CLIENT_KEY = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;

export default function CheckoutPage() {
    const navigate = useNavigate();

    const { items, confirmPayment } = useCheckout();

    const { pay, loading: snapLoading } = useSnapPayment({
        clientKey: CLIENT_KEY,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    /* ===========================
       🔒 GUARD: EMPTY CHECKOUT
       =========================== */
    useEffect(() => {
        if (!items.length) {
            navigate("/");
        }
    }, [items, navigate]);

    /* ===========================
       🚀 HANDLE PAY
       =========================== */
    async function handlePay() {
        try {
            setIsSubmitting(true);

            const res = await confirmPayment();

            // 🔥 VALIDASI RESPONSE
            if (!res) {
                throw new Error("No response from payment API");
            }

            // 🔥 NEW: generic handler
            if (res.type === "popup" && res.payload.token) {
                pay(res.payload.token, {
                    onSuccess: () => {
                        navigate(`/payment?order_id=${res.payment_id}`);
                    },
                    onPending: () => {
                        navigate(`/payment?order_id=${res.payment_id}`);
                    },
                    onError: () => {
                        alert("Pembayaran gagal. Silakan coba lagi.");
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
                navigate(`/payment?order_id=${res.payment_id}`);
                return;
            }

            throw new Error("Invalid payment execution");
        } catch (err) {
            console.error("Payment error:", err);
            alert("Gagal memulai pembayaran. Silakan coba lagi.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <CheckoutView
            items={items}
            onPay={handlePay}
            isSubmitting={isSubmitting || snapLoading}
        />
    );
}
