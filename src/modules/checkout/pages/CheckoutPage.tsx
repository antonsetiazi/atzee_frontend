// src/modules/checkout/pages/CheckoutPage.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CheckoutView from "../components/CheckoutView";
import { useCheckout } from "../hooks/useCheckout";

import { usePaymentMethods } from "@/modules/payment/hooks/usePaymentMethods";
import { useSnapPayment } from "@/core/payment/useSnapPayment";

const CLIENT_KEY = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;

export default function CheckoutPage() {
    const navigate = useNavigate();

    const {
        items,
        selectedPaymentMethodId,
        selectPaymentMethod,
        confirmPayment,
    } = useCheckout();

    const { methods, loading: paymentMethodsLoading } = usePaymentMethods();

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

            const { payment_token, order_id } = res;

            // 🔥 PRIORITAS: SNAP POPUP
            if (payment_token) {
                pay(payment_token, {
                    onSuccess: () => {
                        // ⚠️ jangan percaya penuh, tapi boleh UX
                        navigate(`/payment?order_id=${order_id}`);
                    },
                    onPending: () => {
                        navigate(`/payment?order_id=${order_id}`);
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

            // 🔥 FALLBACK (kalau token tidak ada)
            if (order_id) {
                navigate(`/payment?order_id=${order_id}`);
                return;
            }

            throw new Error("Invalid payment response");
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
            paymentMethods={methods}
            paymentMethodsLoading={paymentMethodsLoading}
            selectedPaymentMethodId={selectedPaymentMethodId}
            onSelectPayment={selectPaymentMethod}
            onPay={handlePay}
            isSubmitting={isSubmitting || snapLoading}
        />
    );
}
