// src/modules/finance/receivables/invoices/pages/InvoiceCreatePage.tsx

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import InvoiceForm from "../components/InvoiceForm";

import { createInvoice } from "../services/invoice.api";

import type { InvoiceCreatePayload } from "../types/invoice.types";
import { HeaderPage } from "@/core/ui/components";

export default function InvoiceCreatePage() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    async function handleSubmit(payload: InvoiceCreatePayload) {
        try {
            setLoading(true);

            await createInvoice(payload);

            alert("Invoice created");

            navigate("/finance/receivables/invoices");
        } catch (err) {
            console.error(err);

            alert("Failed create invoice");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <HeaderPage
                title="Create Receivable Invoice"
                subtitle="Create customer invoice transaction"
            />
            <div className="space-y-4 p-4">
                <InvoiceForm loading={loading} onSubmit={handleSubmit} />
            </div>
        </>
    );
}
