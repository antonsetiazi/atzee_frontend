// src/modules/finance/receivables/invoices/pages/InvoiceDetailPage.tsx

import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getInvoiceDetail, postInvoice } from "../services/invoice.service";
import type { InvoiceDetail } from "../types/invoice.types";
import { formatValue } from "@/shared/utils/formatValue";
import { HeaderPage } from "@/core/ui/components";

export default function InvoiceDetailPage() {
    const { invoiceId } = useParams();
    const [loading, setLoading] = useState(true);
    const [posting, setPosting] = useState(false);
    const [invoice, setInvoice] = useState<InvoiceDetail | null>(null);

    const loadData = useCallback(async () => {
        if (!invoiceId) return;

        try {
            setLoading(true);
            const data = await getInvoiceDetail(invoiceId);
            setInvoice(data);
        } finally {
            setLoading(false);
        }
    }, [invoiceId]);

    async function handlePostInvoice() {
        if (!invoice) return;

        try {
            setPosting(true);
            const updated = await postInvoice(invoice.id);
            setInvoice(updated);
        } catch (err) {
            console.error(err);
            alert("Failed to post invoice");
        } finally {
            setPosting(false);
        }
    }

    useEffect(() => {
        loadData();
    }, [loadData]);

    if (loading) {
        return (
            <div className="space-y-4 p-6">
                <div
                    className="h-6 w-1/3 animate-pulse rounded"
                    style={{ background: "var(--color-surface-alt)" }}
                />
                <div
                    className="h-40 animate-pulse rounded-2xl"
                    style={{ background: "var(--color-surface-alt)" }}
                />
            </div>
        );
    }

    if (!invoice) {
        return (
            <div className="p-6" style={{ color: "var(--text-muted)" }}>
                Invoice not found
            </div>
        );
    }

    return (
        <>
            <HeaderPage
                title={`Invoice #${invoice.invoice_number}`}
                subtitle={`Customer: ${invoice.customer_name}`}
            />
            <div
                className="space-y-4 p-4"
                style={{
                    background: "var(--color-background)",
                    color: "var(--text-primary)",
                }}
            >
                {/* HEADER */}
                <div className="flex gap-3">
                    <StatusBadge status={invoice.status} />

                    {invoice.status === "draft" && (
                        <button
                            onClick={handlePostInvoice}
                            disabled={posting}
                            className="rounded-xl px-4 py-2 text-sm transition hover:opacity-80"
                            style={{
                                background: "var(--color-primary)",
                                color: "#fff",
                            }}
                        >
                            {posting ? "Posting..." : "Post Invoice"}
                        </button>
                    )}
                </div>

                {/* INFO GRID */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <InfoCard
                        label="Invoice Date"
                        value={formatValue(invoice.invoice_date, {
                            format: "date",
                        })}
                    />
                    <InfoCard
                        label="Due Date"
                        value={formatValue(invoice.due_date, {
                            format: "date",
                        })}
                    />
                    <InfoCard
                        label="Balance Due"
                        value={formatValue(invoice.balance_due, {
                            format: "number",
                        })}
                        highlight
                    />
                </div>

                {/* ITEMS TABLE */}
                <div
                    className="overflow-hidden rounded-2xl border"
                    style={{
                        background: "var(--color-surface)",
                        borderColor: "var(--color-border)",
                    }}
                >
                    <table className="w-full text-sm">
                        <thead>
                            <tr
                                style={{
                                    background: "var(--color-surface-alt)",
                                    color: "var(--text-muted)",
                                }}
                            >
                                <th className="p-4 text-left font-medium">Description</th>
                                <th className="w-32 p-4 text-right font-medium">Qty</th>
                                <th className="w-40 p-4 text-right font-medium">Unit Price</th>
                                <th className="w-40 p-4 text-right font-medium">Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            {invoice.items.map((item) => (
                                <tr
                                    key={item.id}
                                    style={{
                                        borderTop: "1px solid var(--color-border)",
                                    }}
                                >
                                    <td className="p-4">{item.description}</td>

                                    <td className="p-4 text-right">{item.qty}</td>

                                    <td className="p-4 text-right">
                                        {formatValue(item.unit_price, {
                                            format: "number",
                                        })}
                                    </td>

                                    <td className="p-4 text-right font-medium">
                                        {formatValue(item.total, {
                                            format: "number",
                                        })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* TOTALS */}
                <div className="flex justify-end">
                    <div
                        className="w-full space-y-2 rounded-2xl border p-4 md:w-80"
                        style={{
                            background: "var(--color-surface)",
                            borderColor: "var(--color-border)",
                            boxShadow: "var(--shadow)",
                        }}
                    >
                        <TotalRow
                            label="Subtotal"
                            value={formatValue(invoice.subtotal, {
                                format: "number",
                            })}
                        />
                        <TotalRow
                            label="Tax"
                            value={formatValue(invoice.tax_amount, {
                                format: "number",
                            })}
                        />

                        <div
                            className="flex justify-between pt-2 text-lg font-semibold"
                            style={{
                                borderTop: "1px solid var(--color-border)",
                            }}
                        >
                            <span>Total</span>
                            <span>
                                {formatValue(invoice.total_amount, {
                                    format: "number",
                                })}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

/* =========================
   UI COMPONENTS
========================= */

function InfoCard({
    label,
    value,
    highlight,
}: {
    label: string;
    value: string | number;
    highlight?: boolean;
}) {
    return (
        <div
            className="rounded-2xl border p-4"
            style={{
                background: "var(--color-surface)",
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

function TotalRow({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="flex justify-between text-sm">
            <span style={{ color: "var(--text-muted)" }}>{label}</span>
            <span>{value}</span>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const map: Record<string, { bg: string; color: string }> = {
        posted: {
            bg: "rgba(59, 130, 246, 0.12)",
            color: "var(--color-primary)",
        },
        draft: {
            bg: "rgba(148, 163, 184, 0.12)",
            color: "var(--text-muted)",
        },
        paid: {
            bg: "rgba(34, 197, 94, 0.12)",
            color: "var(--color-success)",
        },
    };

    const style = map[status] || map.draft;

    return (
        <span
            className="rounded-full px-3 py-1 text-xs font-medium"
            style={{
                background: style.bg,
                color: style.color,
            }}
        >
            {status}
        </span>
    );
}
