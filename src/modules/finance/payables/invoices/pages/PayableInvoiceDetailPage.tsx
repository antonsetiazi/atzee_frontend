// src/modules/finance/payables/invoices/pages/PayableInvoiceDetailPage.tsx

import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { formatValue } from "@/shared/utils/formatValue";
import { getPayableInvoiceDetail } from "../services/payableInvoice.service";
import type { PayableInvoice } from "../types/payableInvoice.types";
import { postPayableInvoice } from "../services/payableInvoice.service";
import { DataTable, HeaderPage, LoadingState, SummaryCard } from "@/core/ui/components";

function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        draft: "bg-gray-500/10 text-gray-600",
        posted: "bg-blue-500/10 text-blue-600",
        partial: "bg-orange-500/10 text-orange-600",
        paid: "bg-green-500/10 text-green-600",
        cancelled: "bg-red-500/10 text-red-600",
    };

    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                styles[status] || styles.draft
            }`}
        >
            {status}
        </span>
    );
}

export default function PayableInvoiceDetailPage() {
    const { invoiceId } = useParams();
    const [loading, setLoading] = useState(true);
    const [invoice, setInvoice] = useState<PayableInvoice | null>(null);
    const [posting, setPosting] = useState(false);

    const loadData = useCallback(async () => {
        if (!invoiceId) {
            return;
        }

        try {
            setLoading(true);
            const data = await getPayableInvoiceDetail(invoiceId);
            setInvoice(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [invoiceId]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    async function handlePostInvoice() {
        if (!invoiceId) return;

        try {
            setPosting(true);

            await postPayableInvoice(invoiceId);

            await loadData();
        } catch (err) {
            console.error(err);
        } finally {
            setPosting(false);
        }
    }

    const isOverdue = useMemo(() => {
        if (!invoice) {
            return false;
        }

        if (invoice.status === "paid") {
            return false;
        }

        return new Date(invoice.due_date) < new Date();
    }, [invoice]);

    if (loading) return <LoadingState />;

    if (!invoice) {
        return (
            <div
                className="rounded-3xl border p-10 text-center"
                style={{
                    background: "var(--color-surface)",
                    borderColor: "var(--color-border)",
                }}
            >
                <div
                    className="text-sm"
                    style={{
                        color: "var(--text-secondary)",
                    }}
                >
                    Invoice not found
                </div>
            </div>
        );
    }

    return (
        <>
            <HeaderPage
                title={`Vendor Bill #${invoice.invoice_number}`}
                subtitle={invoice.partner_name}
                meta={
                    <div className="flex items-center gap-2">
                        <StatusBadge status={invoice.status} />

                        {isOverdue && (
                            <div className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-600">
                                Overdue
                            </div>
                        )}
                    </div>
                }
                actions={[
                    ...(invoice.status === "draft"
                        ? [
                              {
                                  label: posting ? "Posting..." : "Post Invoice",
                                  onClick: handlePostInvoice,
                                  disabled: posting,
                                  variant: "primary" as const,
                              },
                          ]
                        : []),
                ]}
            />
            <div className="space-y-4 p-4">
                {/* SUMMARY */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
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
                        tone={isOverdue ? "danger" : "default"}
                    />
                    <SummaryCard
                        title="Total Amount"
                        value={formatValue(invoice.total_amount, {
                            format: "currency",
                        })}
                    />
                    <SummaryCard
                        title="Balance Due"
                        value={formatValue(invoice.balance_due, {
                            format: "currency",
                        })}
                        tone={Number(invoice.balance_due) > 0 ? "danger" : "default"}
                    />
                </div>

                {/* CONTENT */}

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                    {/* ITEMS */}
                    <div className="xl:col-span-2">
                        <DataTable
                            title="Invoice Items"
                            subtitle="Detailed breakdown of vendor charges"
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
                    </div>

                    {/* SIDEBAR */}

                    <div className="space-y-6">
                        {/* TOTALS */}

                        <div
                            className="rounded-3xl border p-6"
                            style={{
                                background: "var(--color-surface)",
                                borderColor: "var(--color-border)",
                                boxShadow: "var(--shadow)",
                            }}
                        >
                            <h2
                                className="text-lg font-semibold"
                                style={{
                                    color: "var(--text-primary)",
                                }}
                            >
                                Invoice Summary
                            </h2>

                            <div
                                className="mt-6 space-y-4 text-sm"
                                style={{
                                    color: "var(--text-secondary)",
                                }}
                            >
                                <div className="flex items-center justify-between">
                                    <span>Subtotal</span>

                                    <span className="font-medium">
                                        {formatValue(invoice.subtotal, {
                                            format: "currency",
                                        })}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span>Tax</span>

                                    <span className="font-medium">
                                        {formatValue(invoice.tax_amount, {
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
                                            className="font-semibold"
                                            style={{
                                                color: "var(--text-primary)",
                                            }}
                                        >
                                            Total
                                        </span>

                                        <span
                                            className="text-xl font-bold"
                                            style={{
                                                color: "var(--text-primary)",
                                            }}
                                        >
                                            {formatValue(invoice.total_amount, {
                                                format: "currency",
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* NOTES */}

                        {invoice.notes && (
                            <div
                                className="rounded-3xl border p-6"
                                style={{
                                    background: "var(--color-surface)",
                                    borderColor: "var(--color-border)",
                                    boxShadow: "var(--shadow)",
                                }}
                            >
                                <h2
                                    className="text-lg font-semibold"
                                    style={{
                                        color: "var(--text-primary)",
                                    }}
                                >
                                    Notes
                                </h2>

                                <div
                                    className="mt-4 text-sm leading-relaxed whitespace-pre-wrap"
                                    style={{
                                        color: "var(--text-secondary)",
                                    }}
                                >
                                    {invoice.notes}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
