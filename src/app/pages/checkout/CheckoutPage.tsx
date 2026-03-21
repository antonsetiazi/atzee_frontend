// src/app/pages/checkout/CheckoutPage.tsx

import { useEffect, useRef } from "react";
import CheckoutView from "@/core/ui/views/checkout/CheckoutView";
import PaymentResultView from "@/core/ui/views/checkout/PaymentResultView";
import { useCheckout } from "@/business/checkout/checkout.hooks";
import { useNavigate } from "react-router-dom";
import { useOrders } from "@/business/order/order.hooks";
export default function CheckoutPage() {
    const navigate = useNavigate();
    const { createFromCheckout } = useOrders();

    const {
        items,
        selectedPaymentMethodId,
        selectPaymentMethod,
        confirmPayment,
        paymentStatus,
    } = useCheckout();

    const hasCreatedRef = useRef(false);

    // ✅ FIX: effect harus di atas
    useEffect(() => {
        if (paymentStatus === "paid" && !hasCreatedRef.current) {
            createFromCheckout();
            hasCreatedRef.current = true;
        }
    }, [paymentStatus, createFromCheckout]);

    // ✅ baru conditional render
    if (paymentStatus !== "idle") {
        return (
            <PaymentResultView
                status={paymentStatus}
                onBackHome={() => navigate("/")}
            />
        );
    }

    return (
        <CheckoutView
            items={items}
            paymentMethods={[
                { id: "bca", label: "Transfer BCA" },
                { id: "gopay", label: "GoPay" },
            ]}
            selectedPaymentMethodId={selectedPaymentMethodId}
            onSelectPayment={selectPaymentMethod}
            onPay={() => {
                confirmPayment();
            }}
        />
    );
}
