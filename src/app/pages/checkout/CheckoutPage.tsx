// src/app/pages/checkout/CheckoutPage.tsx

import CheckoutView from "@/core/ui/views/checkout/CheckoutView";
import PaymentResultView from "@/core/ui/views/checkout/PaymentResultView";
import { useCheckout } from "@/business/checkout/checkout.hooks";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
    const navigate = useNavigate();

    const {
        items,
        selectedPaymentMethodId,
        selectPaymentMethod,
        confirmPayment,
        paymentStatus,
    } = useCheckout();

    // ✅ baru conditional render
    if (paymentStatus !== "idle") {
        return (
            <PaymentResultView
                status={paymentStatus}
                onBackHome={() => navigate("/")}
            />
        );
    }

    // tambahan:
    if (!items.length) {
        navigate("/");
        return null;
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
