// src/modules/finance/payables/payments/pages/PayablePaymentDetailPage.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { formatValue } from "@/shared/utils/formatValue";
import { getPayablePaymentDetail, postPayablePayment } from "../services/payment.service";
import { DataTable, HeaderPage, LoadingState, SummaryCard } from "@/core/ui/components";
import useDataTable from "@/core/ui/components/data_table/hooks/useDataTable";
import type { PayablePayment, PayablePaymentAllocation } from "../types/payment.types";

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

export default function PayablePaymentDetailPage() {
    const { paymentId } = useParams();
    const [loading, setLoading] = useState(true);
    const [payment, setPayment] = useState<PayablePayment>();
    const [rows, setRows] = useState<PayablePaymentAllocation[]>([]);
    const table = useDataTable();

    const loadData = useCallback(async () => {
        if (!paymentId) {
            return;
        }

        try {
            setLoading(true);
            const data = await getPayablePaymentDetail(paymentId);
            setPayment(data);
            setRows(data.allocations);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [paymentId]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    async function handlePostPayment() {
        if (!paymentId) {
            return;
        }

        try {
            await postPayablePayment(paymentId);

            await loadData();
        } catch (err) {
            console.error(err);
        }
    }

    const totalAllocated = useMemo(() => {
        if (!payment?.allocations) {
            return 0;
        }

        return payment.allocations.reduce(
            (acc: number, item: any) => acc + Number(item.allocated_amount || 0),
            0,
        );
    }, [payment]);

    if (loading) return <LoadingState />;

    if (!payment) {
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
                    Payment not found
                </div>
            </div>
        );
    }

    return (
        <>
            <HeaderPage
                title={`Vendor Payment #${payment.payment_number}`}
                subtitle={payment.partner_name}
                meta={<StatusBadge status={payment.status} />}
                actions={[
                    ...(payment.status === "draft"
                        ? [
                              {
                                  label: "Post Payment",
                                  onClick: handlePostPayment,
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
                        title="Payment Date"
                        value={formatValue(payment.payment_date, {
                            format: "date",
                        })}
                    />
                    <SummaryCard title="Payment Method" value={payment.payment_method} />
                    <SummaryCard
                        title="Amount"
                        value={formatValue(payment.amount, {
                            format: "currency",
                        })}
                    />
                    <SummaryCard
                        title="Allocated"
                        value={formatValue(totalAllocated, {
                            format: "currency",
                        })}
                    />
                </div>

                {/* ALLOCATIONS */}
                <DataTable
                    title="Invoice Allocations"
                    subtitle="Payment allocation details"
                    loading={loading}
                    data={rows}
                    columns={[
                        {
                            key: "invoice_number",
                            title: "Invoice",
                            render: (row) => (
                                <div className="flex gap-2">
                                    <span className="font-semibold">{row.invoice_number}</span>
                                    <StatusBadge status={row.invoice_status} />
                                </div>
                            ),
                        },
                        {
                            key: "invoice_date",
                            title: "Invoice Date",
                            render: (row) => (
                                <span className="text-muted text-xs">
                                    {formatValue(row.invoice_date, {
                                        format: "date",
                                    })}
                                </span>
                            ),
                        },
                        {
                            key: "invoice_total",
                            title: "Invoice Total",
                            align: "right",
                            render: (row) => (
                                <span className="font-semibold">
                                    {formatValue(row.invoice_total, {
                                        format: "currency",
                                    })}
                                </span>
                            ),
                        },
                        {
                            key: "allocated_amount",
                            title: "Allocated Amount",
                            align: "right",
                            render: (row) => (
                                <span className="font-semibold">
                                    {formatValue(row.allocated_amount, {
                                        format: "currency",
                                    })}
                                </span>
                            ),
                        },
                    ]}
                    pagination={{
                        page: table.page,
                        totalPages: 1,
                        totalItems: rows.length,
                        onPageChange: table.setPage,
                    }}
                />

                {/* NOTES */}
                {payment.notes && (
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
                            {payment.notes}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
