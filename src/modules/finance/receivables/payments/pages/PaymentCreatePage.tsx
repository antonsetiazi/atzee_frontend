// src/modules/finance/receivables/payments/pages/PaymentCreatePage.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import InvoiceSelect from "../components/select/InvoiceSelect";
import CashAccountSelect from "../components/select/CashAccountSelect";
import { createReceivablePayment } from "../services/payment.service";
import type { ReceivableInvoiceOption } from "../types/payment.types";
import { Button, HeaderPage } from "@/core/ui/components";
import { inputBase } from "@/core/ui/class/field.ui.class";

export default function PaymentCreatePage() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [invoice, setInvoice] = useState<ReceivableInvoiceOption | null>(null);

    const [paymentNumber, setPaymentNumber] = useState("");
    const [paymentDate, setPaymentDate] = useState("");
    const [cashAccountId, setCashAccountId] = useState("");
    const [amount, setAmount] = useState(0);
    const [notes, setNotes] = useState("");

    const remainingBalance = useMemo(() => {
        if (!invoice) return 0;
        return invoice.balance_due;
    }, [invoice]);

    async function handleSubmit() {
        if (!invoice) {
            alert("Please select invoice");
            return;
        }

        try {
            setLoading(true);

            await createReceivablePayment({
                customer_id: invoice.customer_id,
                payment_number: paymentNumber,
                payment_date: paymentDate,
                payment_method: "cash",
                amount,
                allocations: [
                    {
                        invoice_id: invoice.id,
                        allocated_amount: amount,
                    },
                ],
                notes,
            });

            navigate("/finance/receivables/payments");
        } catch (err) {
            console.error(err);
            alert("Failed to create payment");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <HeaderPage title="Receive Payment" subtitle="Record incoming customer cash receipt" />
            <div className="space-y-4 p-4">
                {/* =========================
                FORM WRAPPER
            ========================= */}
                <div
                    className="space-y-6 rounded-2xl border p-6"
                    style={{
                        background: "var(--color-surface)",
                        borderColor: "var(--color-border)",
                        boxShadow: "var(--shadow)",
                    }}
                >
                    {/* =========================
                    INVOICE SELECT (PRIMARY CONTEXT)
                ========================= */}
                    <div>
                        <InvoiceSelect
                            value={invoice?.id || ""}
                            onChange={(selectedInvoice) => {
                                setInvoice(selectedInvoice);
                                setAmount(selectedInvoice?.balance_due || 0);
                            }}
                        />
                    </div>

                    {/* =========================
                    CONTEXT SNAPSHOT
                ========================= */}
                    {invoice && (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <SnapshotCard label="Customer" value={invoice.customer_name} />

                            <SnapshotCard label="Invoice Total" value={invoice.total_amount} />

                            <SnapshotCard
                                label="Remaining Balance"
                                value={remainingBalance}
                                highlight
                            />
                        </div>
                    )}

                    {/* =========================
                    INPUT GRID
                ========================= */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Input label="Payment Number">
                            <input
                                value={paymentNumber}
                                onChange={(e) => setPaymentNumber(e.target.value)}
                                className={`${inputBase}`}
                            />
                        </Input>

                        <Input label="Payment Date">
                            <input
                                type="date"
                                value={paymentDate}
                                onChange={(e) => setPaymentDate(e.target.value)}
                                className={`${inputBase}`}
                            />
                        </Input>
                    </div>

                    {/* =========================
                    CASH ACCOUNT (FINANCIAL CORE FIELD)
                ========================= */}
                    <CashAccountSelect value={cashAccountId} onChange={setCashAccountId} />

                    {/* =========================
                    AMOUNT (IMPORTANT FIELD)
                ========================= */}
                    <Input label="Amount Received">
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className={`${inputBase} text-right font-medium`}
                        />
                    </Input>

                    {/* =========================
                    NOTES
                ========================= */}
                    <Input label="Notes">
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={4}
                            className={`${inputBase}`}
                        />
                    </Input>

                    {/* =========================
                    ACTION BAR
                ========================= */}
                    <div className="flex justify-end gap-3 pt-2">
                        <Button onClick={() => navigate(-1)} variant="secondary">
                            Cancel
                        </Button>

                        <Button onClick={handleSubmit} disabled={loading}>
                            {loading ? "Processing..." : "Save Payment"}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

/* =========================
   UI COMPONENTS
========================= */

function SnapshotCard({ label, value, highlight }: any) {
    return (
        <div
            className="rounded-xl border p-4"
            style={{
                background: "var(--color-surface-alt)",
                borderColor: "var(--color-border)",
            }}
        >
            <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                {label}
            </div>

            <div
                className="mt-1 font-medium"
                style={{
                    color: highlight ? "var(--color-primary)" : "var(--text-primary)",
                }}
            >
                {value}
            </div>
        </div>
    );
}

function Input({ label, children }: any) {
    return (
        <div>
            <label className="text-sm" style={{ color: "var(--text-muted)" }}>
                {label}
            </label>
            {children}
        </div>
    );
}
