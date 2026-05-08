// src/modules/finance/receivables/invoices/components/InvoiceForm.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo, useState } from "react";
import CustomerSelect from "./select/CustomerSelect";
import TaxSelect from "./select/TaxSelect";

import type { InvoiceItemPayload, InvoiceCreatePayload } from "../types/invoice.types";
import { inputBase } from "@/core/ui/class/field.ui.class";
import { Button } from "@/core/ui/components";
import { formatValue } from "@/shared/utils/formatValue";

type Props = {
    loading?: boolean;
    onSubmit: (payload: InvoiceCreatePayload) => Promise<void>;
};

export default function InvoiceForm({ loading = false, onSubmit }: Props) {
    const [customerId, setCustomerId] = useState("");
    const [taxId, setTaxId] = useState("");
    const [selectedTax, setSelectedTax] = useState<any>(null);
    const [invoiceNumber, setInvoiceNumber] = useState("");
    const [invoiceDate, setInvoiceDate] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [notes, setNotes] = useState("");

    const [items, setItems] = useState<InvoiceItemPayload[]>([
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
        setItems((prev) => [...prev, { description: "", qty: 1, unit_price: 0 }]);
    }

    function removeItem(index: number) {
        setItems((prev) => prev.filter((_, i) => i !== index));
    }

    function updateItem(index: number, field: keyof InvoiceItemPayload, value: string | number) {
        setItems((prev) =>
            prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
        );
    }

    // =========================
    // FINANCIAL CALC
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

        if (!customerId) return [];

        entries.push({
            account: "Accounts Receivable",
            debit: grandTotal,
            credit: 0,
        });

        entries.push({
            account: "Sales Revenue",
            debit: 0,
            credit: subtotal,
        });

        if (taxAmount > 0) {
            entries.push({
                account: "Tax Payable",
                debit: 0,
                credit: taxAmount,
            });
        }

        return entries;
    }, [customerId, subtotal, taxAmount, grandTotal]);

    // =========================
    // SUBMIT
    // =========================

    async function handleSubmit() {
        await onSubmit({
            customer_id: customerId,
            invoice_number: invoiceNumber,
            invoice_date: invoiceDate,
            due_date: dueDate,
            tax_id: taxId || null,
            notes,
            items,
        });
    }

    // =========================
    // UI
    // =========================

    return (
        <div className="space-y-4">
            {/* =========================
                FORM SECTION
            ========================= */}
            <Section title="Invoice Information">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <CustomerSelect value={customerId} onChange={setCustomerId} />

                    <Input label="Invoice Number">
                        <input
                            value={invoiceNumber}
                            onChange={(e) => setInvoiceNumber(e.target.value)}
                            className={`${inputBase}`}
                        />
                    </Input>

                    <Input label="Invoice Date">
                        <input
                            type="date"
                            value={invoiceDate}
                            onChange={(e) => setInvoiceDate(e.target.value)}
                            className={`${inputBase}`}
                        />
                    </Input>

                    <Input label="Due Date">
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className={`${inputBase}`}
                        />
                    </Input>

                    <div className="md:col-span-2">
                        <Input label="Notes">
                            <textarea
                                rows={3}
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className={`${inputBase}`}
                            />
                        </Input>
                    </div>

                    <div className="md:col-span-2">
                        <TaxSelect
                            value={taxId}
                            onChange={(value, tax) => {
                                setTaxId(value);
                                setSelectedTax(tax || null);
                            }}
                        />
                    </div>
                </div>
            </Section>

            {/* =========================
                ITEMS
            ========================= */}
            <Section
                title="Invoice Items"
                action={
                    <Button variant="secondary" onClick={addItem}>
                        + Add Item
                    </Button>
                }
            >
                <div className="overflow-hidden rounded-xl border border-[var(--color-border)]">
                    <table className="w-full text-sm">
                        <thead
                            style={{
                                background: "var(--color-surface-alt)",
                            }}
                        >
                            <tr>
                                <th className="p-3 text-left">Description</th>
                                <th className="w-28 p-3 text-right">Qty</th>
                                <th className="w-40 p-3 text-right">Unit Price</th>
                                <th className="w-40 p-3 text-right">Total</th>
                                <th className="w-24 p-3"></th>
                            </tr>
                        </thead>

                        <tbody>
                            {items.map((item, index) => {
                                const total = item.qty * item.unit_price;

                                return (
                                    <tr
                                        key={index}
                                        style={{
                                            borderTop: "1px solid var(--color-border)",
                                        }}
                                    >
                                        <td className="p-2">
                                            <input
                                                value={item.description}
                                                onChange={(e) =>
                                                    updateItem(index, "description", e.target.value)
                                                }
                                                className={`${inputBase}`}
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

                                        <td className="p-3 text-right font-medium">
                                            {formatValue(total, { format: "number" })}
                                        </td>

                                        <td className="p-2 text-right">
                                            <Button
                                                variant="danger"
                                                size="xs"
                                                onClick={() => removeItem(index)}
                                            >
                                                Remove
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* =========================
                FINANCIAL SUMMARY
            ========================= */}
            <div className="grid gap-6 md:grid-cols-2">
                <SummaryCard subtotal={subtotal} tax={taxAmount} total={grandTotal} />

                <JournalCard entries={journalPreview} />
            </div>

            {/* =========================
                ACTIONS
            ========================= */}
            <div className="flex justify-end gap-3">
                <Button disabled={loading} onClick={handleSubmit} variant="success">
                    Save Draft
                </Button>

                {/* <Button disabled={loading}>Post Invoice</Button> */}
            </div>
        </div>
    );
}

/* =========================
   UI COMPONENTS
========================= */

function Section({ title, action, children }: any) {
    return (
        <div
            className="space-y-4 rounded-2xl border p-4"
            style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border)",
            }}
        >
            <div className="flex items-center justify-between">
                <h3 className="font-semibold">{title}</h3>
                {action}
            </div>

            {children}
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

function SummaryCard({ subtotal, tax, total }: any) {
    return (
        <div
            className="space-y-2 rounded-2xl border p-4"
            style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border)",
            }}
        >
            <h3 className="font-semibold">Summary</h3>

            <Row label="Subtotal" value={formatValue(subtotal, { format: "number" })} />
            <Row label="Tax" value={formatValue(tax, { format: "number" })} />

            <div
                className="flex justify-between border-t pt-2 text-lg font-bold"
                style={{ borderColor: "var(--color-border)" }}
            >
                <span>Total</span>
                <span>{formatValue(total, { format: "number" })}</span>
            </div>
        </div>
    );
}

function JournalCard({ entries }: any) {
    return (
        <div
            className="space-y-3 rounded-2xl border p-4"
            style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border)",
            }}
        >
            <h3 className="font-semibold">Journal Preview</h3>

            {/* HEADER ROW */}
            <div
                className="grid grid-cols-3 text-xs font-medium"
                style={{ color: "var(--text-muted)" }}
            >
                <div>Account</div>
                <div className="text-right">Debit</div>
                <div className="text-right">Credit</div>
            </div>

            {/* ROWS */}
            <div className="space-y-2">
                {entries.map((e: any, i: number) => (
                    <div key={i} className="grid grid-cols-3 items-center text-sm">
                        <div>{e.account}</div>

                        <div className="text-right tabular-nums">
                            {e.debit > 0 ? formatValue(e.debit, { format: "number" }) : "-"}
                        </div>

                        <div className="text-right tabular-nums">
                            {e.credit > 0 ? formatValue(e.credit, { format: "number" }) : "-"}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Row({ label, value }: any) {
    return (
        <div className="flex justify-between text-sm">
            <span style={{ color: "var(--text-muted)" }}>{label}</span>
            <span>{value}</span>
        </div>
    );
}
