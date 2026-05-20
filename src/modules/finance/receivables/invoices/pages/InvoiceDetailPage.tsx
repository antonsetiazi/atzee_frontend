// src/modules/finance/receivables/invoices/pages/InvoiceDetailPage.tsx

import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getInvoiceDetail, postInvoice } from "../services/invoice.service";
import type { InvoiceDetail } from "../types/invoice.types";
import { formatValue } from "@/shared/utils/formatValue";
import { DataTable, HeaderPage, LoadingState, SummaryCard } from "@/core/ui/components";

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

    if (loading) return <LoadingState />;

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
                meta={<StatusBadge status={invoice.status} />}
                actions={[
                    ...(invoice.status === "draft"
                        ? [
                              {
                                  label: posting ? "Posting..." : "Post Invoice",
                                  onClick: handlePostInvoice,
                                  disabled: posting,
                              },
                          ]
                        : []),
                ]}
            />
            <div className="space-y-4 p-4">
                {/* INFO GRID */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <SummaryCard
                        title="Invoice Date"
                        value={formatValue(invoice.invoice_date, {
                            format: "date",
                        })}
                    />
                    <SummaryCard
                        title="Due Date"
                        value={formatValue(invoice.due_date, {
                            format: "date",
                        })}
                    />
                    <SummaryCard
                        title="Balance Due"
                        value={formatValue(invoice.balance_due, {
                            format: "number",
                        })}
                    />
                </div>

                {/* ITEMS TABLE */}
                <DataTable
                    loading={loading}
                    data={invoice.items}
                    columns={[
                        {
                            key: "description",
                            title: "Description",
                            render: (row) => (
                                <span className="font-semibold">{row.description}</span>
                            ),
                        },
                        {
                            key: "qty",
                            title: "Qty",
                            align: "right",
                        },
                        {
                            key: "unit_price",
                            title: "Unit Price",
                            align: "right",
                            render: (row) => (
                                <span className="font-normal">
                                    {formatValue(row.unit_price, {
                                        format: "currency",
                                    })}
                                </span>
                            ),
                        },
                        {
                            key: "total",
                            title: "Total",
                            align: "right",
                            render: (row) => (
                                <span className="font-semibold">
                                    {formatValue(row.total, {
                                        format: "currency",
                                    })}
                                </span>
                            ),
                        },
                    ]}
                />

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
