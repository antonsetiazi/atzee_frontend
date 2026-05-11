// src/modules/finance/payables/payments/pages/PayablePaymentCreatePage.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PayablePaymentForm from "../components/PayablePaymentForm";
import { createPayablePayment } from "../services/payment.service";
import type { PayablePaymentCreatePayload } from "../types/payment.types";
import { HeaderPage } from "@/core/ui/components";

export default function PayablePaymentCreatePage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(payload: PayablePaymentCreatePayload) {
        try {
            setLoading(true);

            const response = await createPayablePayment(payload);

            navigate(`/finance/payables/payments/${response.id}`);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <HeaderPage
                title="Create Vendor Payment"
                subtitle="Record supplier payment and allocate outstanding invoices"
            />
            <div className="space-y-4 p-4">
                {/* FORM */}

                <PayablePaymentForm loading={loading} onSubmit={handleSubmit} />
            </div>
        </>
    );
}
