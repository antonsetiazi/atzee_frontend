// src/modules/finance/payables/payments/components/PayablePaymentForm.tsx

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useMemo, useState } from "react";

import { formatValue } from "@/shared/utils/formatValue";

import PartnerSelect from "@/modules/finance/payables/invoices/components/select/PartnerSelect";

import type { PayableAllocationPayload, PayablePaymentCreatePayload } from "../types/payment.types";
import type { OutstandingPayableInvoice } from "../../invoices/types/payableInvoice.types";
import { getOutstandingPayableInvoices } from "../../invoices/services/payableInvoice.service";
import { inputBase } from "@/core/ui/class/field.ui.class";

type Props = {
    loading?: boolean;

    onSubmit: (payload: PayablePaymentCreatePayload) => Promise<void>;
};

export default function PayablePaymentForm({ loading = false, onSubmit }: Props) {
    const [partnerId, setPartnerId] = useState("");
    const [paymentDate, setPaymentDate] = useState("");
    const [paymentNumber, setPaymentNumber] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("bank_transfer");
    const [reference, setReference] = useState("");
    const [notes, setNotes] = useState("");
    const [invoices, setInvoices] = useState<OutstandingPayableInvoice[]>([]);
    const [allocations, setAllocations] = useState<PayableAllocationPayload[]>([]);

    // =========================================
    // LOAD OUTSTANDING INVOICES
    // =========================================

    useEffect(() => {
        async function loadInvoices() {
            if (!partnerId) {
                setInvoices([]);
                return;
            }

            try {
                const data = await getOutstandingPayableInvoices();

                const filtered = data.filter(
                    (invoice) => String(invoice.partner_id) === String(partnerId),
                );

                setInvoices(filtered);

                setAllocations(
                    filtered.map((invoice) => ({
                        invoice_id: invoice.id,
                        allocated_amount: Number(invoice.balance_due),
                    })),
                );
            } catch (err) {
                console.error(err);
            }
        }

        loadInvoices();
    }, [partnerId]);

    // =========================================
    // UPDATE ALLOCATION
    // =========================================
    function updateAllocation(invoiceId: string, value: number) {
        setAllocations((prev) =>
            prev.map((allocation) => {
                if (allocation.invoice_id !== invoiceId) {
                    return allocation;
                }

                return {
                    ...allocation,
                    allocated_amount: value,
                };
            }),
        );
    }

    // =========================================
    // TOTAL
    // =========================================
    const totalAmount = useMemo(() => {
        return allocations.reduce((acc, item) => acc + Number(item.allocated_amount || 0), 0);
    }, [allocations]);

    // =========================================
    // JOURNAL PREVIEW
    // =========================================
    const journalPreview = useMemo(() => {
        if (!partnerId || totalAmount <= 0) {
            return [];
        }

        return [
            {
                account: "Accounts Payable",
                debit: totalAmount,
                credit: 0,
            },
            {
                account: "Bank BCA",
                debit: 0,
                credit: totalAmount,
            },
        ];
    }, [partnerId, totalAmount]);

    // =========================================
    // SUBMIT
    // =========================================

    async function handleSubmit() {
        await onSubmit({
            partner_id: Number(partnerId),
            payment_date: paymentDate,
            payment_number: paymentNumber,
            payment_method: paymentMethod,
            reference,
            notes,
            amount: totalAmount,
            allocations: allocations.filter((item) => Number(item.allocated_amount) > 0),
        });
    }

    return (
        <div className="space-y-6">
            {/* =========================================
                PAYMENT INFO
            ========================================= */}

            <div
                className="rounded-3xl border p-6"
                style={{
                    background: "var(--color-surface)",
                    borderColor: "var(--color-border)",
                }}
            >
                <div className="mb-6">
                    <h2
                        className="text-xl font-semibold"
                        style={{
                            color: "var(--text-primary)",
                        }}
                    >
                        Payment Information
                    </h2>

                    <p
                        className="mt-1 text-sm"
                        style={{
                            color: "var(--text-secondary)",
                        }}
                    >
                        Record supplier payment
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <PartnerSelect value={partnerId} onChange={setPartnerId} />

                    <div>
                        <label
                            className="mb-1 block text-sm font-medium"
                            style={{
                                color: "var(--text-secondary)",
                            }}
                        >
                            Payment Date
                        </label>

                        <input
                            type="date"
                            value={paymentDate}
                            onChange={(e) => setPaymentDate(e.target.value)}
                            className={inputBase}
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">Payment Number</label>

                        <input
                            value={paymentNumber}
                            onChange={(e) => setPaymentNumber(e.target.value)}
                            className={inputBase}
                        />
                    </div>

                    <div>
                        <label
                            className="mb-1 block text-sm font-medium"
                            style={{
                                color: "var(--text-secondary)",
                            }}
                        >
                            Payment Method
                        </label>

                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className={inputBase}
                        >
                            <option value="bank_transfer">Bank Transfer</option>
                            <option value="cash">Cash</option>
                            <option value="giro">Giro</option>
                        </select>
                    </div>

                    <div>
                        <label
                            className="mb-1 block text-sm font-medium"
                            style={{
                                color: "var(--text-secondary)",
                            }}
                        >
                            Reference
                        </label>

                        <input
                            value={reference}
                            onChange={(e) => setReference(e.target.value)}
                            className={inputBase}
                        />
                    </div>

                    <div className="">
                        <label
                            className="mb-1 block text-sm font-medium"
                            style={{
                                color: "var(--text-secondary)",
                            }}
                        >
                            Notes
                        </label>

                        <textarea
                            rows={4}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="w-full rounded-2xl border px-4 py-3 outline-none"
                            style={{
                                background: "var(--color-background)",
                                borderColor: "var(--color-border)",
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* =========================================
                ALLOCATION
            ========================================= */}

            <div
                className="overflow-hidden rounded-3xl border"
                style={{
                    background: "var(--color-surface)",
                    borderColor: "var(--color-border)",
                }}
            >
                <div
                    className="border-b px-6 py-4"
                    style={{
                        borderColor: "var(--color-border)",
                    }}
                >
                    <h2
                        className="font-semibold"
                        style={{
                            color: "var(--text-primary)",
                        }}
                    >
                        Outstanding Invoices
                    </h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px] text-sm">
                        <thead
                            style={{
                                background: "var(--color-surface-alt)",
                            }}
                        >
                            <tr>
                                <th className="px-6 py-4 text-left">Invoice</th>

                                <th className="px-6 py-4 text-right">Total</th>

                                <th className="px-6 py-4 text-right">Paid</th>

                                <th className="px-6 py-4 text-right">Balance</th>

                                <th className="px-6 py-4 text-right">Allocate</th>
                            </tr>
                        </thead>

                        <tbody>
                            {invoices.map((invoice) => {
                                const allocation = allocations.find(
                                    (a) => a.invoice_id === invoice.id,
                                );

                                return (
                                    <tr
                                        key={invoice.id}
                                        style={{
                                            borderTop: "1px solid var(--color-border)",
                                        }}
                                    >
                                        <td className="px-6 py-4 font-medium">
                                            {invoice.invoice_number}
                                        </td>

                                        <td className="px-6 py-4 text-right">
                                            {formatValue(invoice.total_amount, {
                                                format: "currency",
                                            })}
                                        </td>

                                        <td className="px-6 py-4 text-right">
                                            {formatValue(invoice.paid_amount, {
                                                format: "currency",
                                            })}
                                        </td>

                                        <td className="px-6 py-4 text-right font-semibold">
                                            {formatValue(invoice.balance_due, {
                                                format: "currency",
                                            })}
                                        </td>

                                        <td className="px-6 py-4">
                                            <input
                                                type="number"
                                                value={allocation?.allocated_amount || 0}
                                                onChange={(e) =>
                                                    updateAllocation(
                                                        invoice.id,
                                                        Number(e.target.value),
                                                    )
                                                }
                                                className="w-full rounded-xl border px-3 py-2 text-right"
                                                style={{
                                                    background: "var(--color-background)",
                                                    borderColor: "var(--color-border)",
                                                }}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* =========================================
                FOOTER
            ========================================= */}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* JOURNAL */}

                <div
                    className="rounded-3xl border p-5"
                    style={{
                        background: "var(--color-surface)",
                        borderColor: "var(--color-border)",
                    }}
                >
                    <h2
                        className="font-semibold"
                        style={{
                            color: "var(--text-primary)",
                        }}
                    >
                        Journal Preview
                    </h2>

                    <div className="mt-4 space-y-3">
                        {journalPreview.map((entry: any, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between rounded-2xl border px-4 py-3"
                                style={{
                                    borderColor: "var(--color-border)",
                                }}
                            >
                                <div className="font-medium">{entry.account}</div>

                                <div className="flex gap-8 text-sm">
                                    <div className="text-right">
                                        <div
                                            style={{
                                                color: "var(--text-secondary)",
                                            }}
                                        >
                                            Debit
                                        </div>

                                        <div className="font-semibold">
                                            {formatValue(entry.debit, {
                                                format: "currency",
                                            })}
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <div
                                            style={{
                                                color: "var(--text-secondary)",
                                            }}
                                        >
                                            Credit
                                        </div>

                                        <div className="font-semibold">
                                            {formatValue(entry.credit, {
                                                format: "currency",
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SUMMARY */}

                <div className="flex justify-end">
                    <div
                        className="w-full rounded-3xl border p-6 md:w-96"
                        style={{
                            background: "var(--color-surface)",
                            borderColor: "var(--color-border)",
                        }}
                    >
                        <h2
                            className="text-lg font-semibold"
                            style={{
                                color: "var(--text-primary)",
                            }}
                        >
                            Payment Summary
                        </h2>

                        <div className="mt-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <span
                                    style={{
                                        color: "var(--text-secondary)",
                                    }}
                                >
                                    Total Allocation
                                </span>

                                <span className="font-semibold">
                                    {formatValue(totalAmount, {
                                        format: "currency",
                                    })}
                                </span>
                            </div>

                            <div
                                className="border-t pt-4"
                                style={{
                                    borderColor: "var(--color-border)",
                                }}
                            >
                                <div className="flex items-center justify-between">
                                    <span
                                        className="text-lg font-bold"
                                        style={{
                                            color: "var(--text-primary)",
                                        }}
                                    >
                                        Payment Total
                                    </span>

                                    <span
                                        className="text-2xl font-bold"
                                        style={{
                                            color: "var(--text-brand)",
                                        }}
                                    >
                                        {formatValue(totalAmount, {
                                            format: "currency",
                                        })}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading || totalAmount <= 0}
                            className="mt-6 w-full rounded-2xl px-5 py-3 font-semibold text-white transition"
                            style={{
                                background: "var(--color-primary)",
                            }}
                        >
                            {loading ? "Saving..." : "Save Payment"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
