// src/modules/finance/payables/invoices/pages/PayableInvoiceCreatePage.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PayableInvoiceForm from "../components/PayableInvoiceForm";
import { createPayableInvoice } from "../services/payableInvoice.service";
import type { PayableInvoiceCreatePayload } from "../types/payableInvoice.types";
import { HeaderPage } from "@/core/ui/components";

export default function PayableInvoiceCreatePage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(payload: PayableInvoiceCreatePayload) {
        try {
            setLoading(true);
            const invoice = await createPayableInvoice(payload);

            navigate(`/finance/payables/invoices/${invoice.id}`);
        } catch (err) {
            console.error(err);

            alert("Failed to create payable invoice");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <HeaderPage
                title="Create Vendor Bill"
                subtitle="Record supplier invoice and generate payable journal automatically"
            />

            <div className="space-y-4 p-4">
                {/* FORM */}

                <PayableInvoiceForm loading={loading} onSubmit={handleSubmit} />
            </div>
        </>
    );
}
