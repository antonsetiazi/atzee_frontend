// src/modules/payment/pages/PaymentPage.tsx

import { useSearchParams } from "react-router-dom";

import { usePayment } from "../hooks/usePayment";

import PaymentLoadingView from "../components/PaymentLoadingView";
import PaymentSuccessView from "../components/PaymentSuccessView";
import PaymentFailedView from "../components/PaymentFailedView";
import { SmartNavigate } from "@/core/navigation/SmartNavigate";

export default function PaymentPage() {
    const [params] = useSearchParams();

    const orderId = params.get("order_id");

    const { status } = usePayment(orderId);

    if (!orderId) {
        return <div className="p-4 text-center">Invalid payment request</div>;
    }

    if (status === "loading") {
        return <PaymentLoadingView />;
    }

    if (status === "success") {
        return (
            <PaymentSuccessView onDone={() => SmartNavigate.go("/orders")} />
        );
    }

    if (status === "failed") {
        return (
            <PaymentFailedView onRetry={() => SmartNavigate.go("/checkout")} />
        );
    }

    return null;
}
