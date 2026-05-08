// src/modules/finance/receivables/payments/components/select/InvoiceSelect.tsx

import { useEffect, useState } from "react";
import { getOutstandingInvoices } from "../../services/payment.service";
import type { ReceivableInvoiceOption } from "../../types/payment.types";
import { inputBase } from "@/core/ui/class/field.ui.class";

type Props = {
    value?: string;

    onChange: (invoice: ReceivableInvoiceOption | null) => void;
};

export default function InvoiceSelect({ value, onChange }: Props) {
    const [loading, setLoading] = useState(true);

    const [rows, setRows] = useState<ReceivableInvoiceOption[]>([]);

    async function loadData() {
        try {
            setLoading(true);

            const data = await getOutstandingInvoices();

            setRows(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    function handleChange(invoiceId: string) {
        const selected = rows.find((x) => x.id === invoiceId) || null;

        onChange(selected);
    }

    return (
        <div>
            <label className="mb-1 block text-sm">Invoice</label>

            <select
                value={value}
                onChange={(e) => handleChange(e.target.value)}
                className={`${inputBase}`}
            >
                <option value="">Select Invoice</option>

                {rows.map((row) => (
                    <option key={row.id} value={row.id}>
                        {row.invoice_number}
                        {" — "}
                        {row.customer_name}
                        {" — "}
                        {row.balance_due}
                    </option>
                ))}
            </select>

            {loading && <div className="mt-1 text-xs text-gray-500">Loading invoices...</div>}
        </div>
    );
}
