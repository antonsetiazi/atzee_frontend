// src/modules/finance/payables/invoices/components/PayableInvoiceForm.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo, useState } from "react";
import { formatValue } from "@/shared/utils/formatValue";
import type {
    PayableInvoiceCreatePayload,
    PayableInvoiceItemPayload,
} from "../types/payableInvoice.types";
import PartnerSelect from "./select/PartnerSelect";
import TaxSelect from "./select/TaxSelect";
import { inputBase } from "@/core/ui/class/field.ui.class";
import { Button } from "@/core/ui/components";

type Props = {
    loading?: boolean;
    onSubmit: (payload: PayableInvoiceCreatePayload) => Promise<void>;
};

export default function PayableInvoiceForm({ loading = false, onSubmit }: Props) {
    const [partnerId, setPartnerId] = useState("");
    const [invoiceNumber, setInvoiceNumber] = useState("");
    const [invoiceDate, setInvoiceDate] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [taxId, setTaxId] = useState("");
    const [selectedTax, setSelectedTax] = useState<any>(null);
    const [notes, setNotes] = useState("");
    const [items, setItems] = useState<PayableInvoiceItemPayload[]>([
        {
            description: "",
            qty: 1,
            unit_price: 0,
        },
    ]);

    // =========================
    // ITEMS
    // =========================

    function addItem() {
        setItems((prev) => [
            ...prev,
            {
                description: "",
                qty: 1,
                unit_price: 0,
            },
        ]);
    }

    function removeItem(index: number) {
        setItems((prev) => prev.filter((_, i) => i !== index));
    }

    function updateItem(
        index: number,
        field: keyof PayableInvoiceItemPayload,
        value: string | number,
    ) {
        setItems((prev) =>
            prev.map((item, i) => {
                if (i !== index) {
                    return item;
                }

                return {
                    ...item,
                    [field]: value,
                };
            }),
        );
    }

    // =========================
    // TOTALS
    // =========================
    const subtotal = useMemo(
        () => items.reduce((acc, item) => acc + item.qty * item.unit_price, 0),
        [items],
    );
    const taxRate = useMemo(() => selectedTax?.rate || 0, [selectedTax]);
    const taxAmount = useMemo(() => subtotal * (taxRate / 100), [subtotal, taxRate]);
    const grandTotal = useMemo(() => subtotal + taxAmount, [subtotal, taxAmount]);

    // =========================
    // JOURNAL PREVIEW
    // =========================
    const journalPreview = useMemo(() => {
        const entries: any[] = [];

        if (!partnerId) {
            return [];
        }

        entries.push({
            account: "Expense / Inventory",
            debit: subtotal,
            credit: 0,
        });

        if (taxAmount > 0) {
            entries.push({
                account: "Tax Payable",
                debit: taxAmount,
                credit: 0,
            });
        }

        entries.push({
            account: "Accounts Payable",
            debit: 0,
            credit: grandTotal,
        });

        return entries;
    }, [partnerId, subtotal, taxAmount, grandTotal]);

    // =========================
    // SUBMIT
    // =========================

    async function handleSubmit() {
        await onSubmit({
            partner_id: partnerId,
            invoice_number: invoiceNumber,
            invoice_date: invoiceDate,
            due_date: dueDate,
            tax_id: taxId || null,
            notes,
            items,
        });
    }

    return (
        <div
            className="space-y-6 rounded-3xl border p-6 shadow-sm"
            style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border)",
            }}
        >
            {/* HEADER */}

            <div>
                <h2
                    className="text-xl font-semibold"
                    style={{
                        color: "var(--text-primary)",
                    }}
                >
                    Vendor Bill Information
                </h2>

                <p
                    className="mt-1 text-sm"
                    style={{
                        color: "var(--text-secondary)",
                    }}
                >
                    Record supplier payable invoice
                </p>
            </div>

            {/* FORM */}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                    <PartnerSelect value={partnerId} onChange={setPartnerId} />
                </div>

                <div>
                    <label
                        className="mb-1 block text-sm font-medium"
                        style={{
                            color: "var(--text-secondary)",
                        }}
                    >
                        Invoice Number
                    </label>

                    <input
                        value={invoiceNumber}
                        onChange={(e) => setInvoiceNumber(e.target.value)}
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
                        Invoice Date
                    </label>

                    <input
                        type="date"
                        value={invoiceDate}
                        onChange={(e) => setInvoiceDate(e.target.value)}
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
                        Due Date
                    </label>

                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className={inputBase}
                    />
                </div>
            </div>

            {/* NOTES */}

            <div>
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
                    className={inputBase}
                />
            </div>

            <TaxSelect
                value={taxId}
                onChange={(value, tax) => {
                    setTaxId(value);
                    setSelectedTax(tax || null);
                }}
            />

            {/* ITEMS */}

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3
                            className="font-semibold"
                            style={{
                                color: "var(--text-primary)",
                            }}
                        >
                            Invoice Items
                        </h3>

                        <p
                            className="text-sm"
                            style={{
                                color: "var(--text-secondary)",
                            }}
                        >
                            Add products or expense lines
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={addItem}
                        className="rounded-2xl border px-4 py-2 text-sm font-medium transition"
                        style={{
                            borderColor: "var(--color-border)",
                            color: "var(--text-primary)",
                        }}
                    >
                        + Add Item
                    </button>
                </div>

                <div
                    className="overflow-hidden rounded-2xl border"
                    style={{
                        borderColor: "var(--color-border)",
                    }}
                >
                    <table className="w-full text-sm">
                        <thead
                            style={{
                                background: "var(--color-surface-alt)",
                            }}
                        >
                            <tr>
                                <th className="p-4 text-left">Description</th>
                                <th className="w-32 p-4 text-right">Qty</th>
                                <th className="w-40 p-4 text-right">Unit Price</th>
                                <th className="w-40 p-4 text-right">Total</th>
                                <th className="w-24 p-4"></th>
                            </tr>
                        </thead>

                        <tbody>
                            {items.map((item, index) => {
                                const total = item.qty * item.unit_price;

                                return (
                                    <tr
                                        key={index}
                                        className="border-t"
                                        style={{
                                            borderColor: "var(--color-border)",
                                        }}
                                    >
                                        <td className="p-2">
                                            <input
                                                value={item.description}
                                                onChange={(e) =>
                                                    updateItem(index, "description", e.target.value)
                                                }
                                                className={inputBase}
                                            />
                                        </td>

                                        <td className="p-2">
                                            <input
                                                type="number"
                                                value={item.qty}
                                                onChange={(e) =>
                                                    updateItem(index, "qty", Number(e.target.value))
                                                }
                                                className={`${inputBase} text-right`}
                                            />
                                        </td>

                                        <td className="p-2">
                                            <input
                                                type="number"
                                                value={item.unit_price}
                                                onChange={(e) =>
                                                    updateItem(
                                                        index,
                                                        "unit_price",
                                                        Number(e.target.value),
                                                    )
                                                }
                                                className={`${inputBase} text-right`}
                                            />
                                        </td>

                                        <td className="p-4 text-right font-medium">
                                            {formatValue(total, {
                                                format: "currency",
                                            })}
                                        </td>

                                        <td className="p-2 text-center">
                                            <button
                                                type="button"
                                                onClick={() => removeItem(index)}
                                                className="text-sm font-medium text-red-500"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* FOOTER */}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* JOURNAL */}

                <div
                    className="rounded-2xl border p-4"
                    style={{
                        background: "var(--color-background)",
                        borderColor: "var(--color-border)",
                    }}
                >
                    <h3
                        className="font-semibold"
                        style={{
                            color: "var(--text-primary)",
                        }}
                    >
                        Journal Preview
                    </h3>

                    <div
                        className="mt-1 text-sm"
                        style={{
                            color: "var(--text-secondary)",
                        }}
                    >
                        Accounting entries preview
                    </div>

                    <div className="mt-4 space-y-3">
                        {journalPreview.map((entry: any, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between rounded-xl border px-3 py-2"
                                style={{
                                    borderColor: "var(--color-border)",
                                }}
                            >
                                <div className="font-medium">{entry.account}</div>

                                <div className="flex gap-6 text-sm tabular-nums">
                                    <div className="w-32 text-right">
                                        <div
                                            className="text-xs"
                                            style={{
                                                color: "var(--text-secondary)",
                                            }}
                                        >
                                            Debit
                                        </div>

                                        <div className="font-medium">
                                            {formatValue(entry.debit, {
                                                format: "currency",
                                            })}
                                        </div>
                                    </div>

                                    <div className="w-32 text-right">
                                        <div
                                            className="text-xs"
                                            style={{
                                                color: "var(--text-secondary)",
                                            }}
                                        >
                                            Credit
                                        </div>

                                        <div className="font-medium">
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

                {/* TOTAL */}

                <div className="flex justify-end">
                    <div
                        className="w-full rounded-2xl border p-5 md:w-80"
                        style={{
                            background: "var(--color-background)",
                            borderColor: "var(--color-border)",
                        }}
                    >
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span
                                    style={{
                                        color: "var(--text-secondary)",
                                    }}
                                >
                                    Subtotal
                                </span>

                                <span className="font-medium">
                                    {formatValue(subtotal, {
                                        format: "currency",
                                    })}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span
                                    style={{
                                        color: "var(--text-secondary)",
                                    }}
                                >
                                    Tax
                                </span>

                                <span className="font-medium">
                                    {formatValue(taxAmount, {
                                        format: "currency",
                                    })}
                                </span>
                            </div>

                            <div
                                className="flex items-center justify-between border-t pt-3 text-lg font-bold"
                                style={{
                                    borderColor: "var(--color-border)",
                                }}
                            >
                                <span>Total</span>

                                <span
                                    style={{
                                        color: "var(--text-brand)",
                                    }}
                                >
                                    {formatValue(grandTotal, {
                                        format: "currency",
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ACTIONS */}

            <div className="flex justify-end gap-3">
                <Button type="button" onClick={handleSubmit} disabled={loading}>
                    {loading ? "Saving..." : "Save Draft"}
                </Button>
            </div>
        </div>
    );
}
