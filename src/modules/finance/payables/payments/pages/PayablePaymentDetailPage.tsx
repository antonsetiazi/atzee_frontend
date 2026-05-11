// src/modules/finance/payables/payments/pages/PayablePaymentDetailPage.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { formatValue } from "@/shared/utils/formatValue";
import { getPayablePaymentDetail, postPayablePayment } from "../services/payment.service";
import { HeaderPage, SummaryCard } from "@/core/ui/components";

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
    const [payment, setPayment] = useState<any>(null);

    const loadData = useCallback(async () => {
        if (!paymentId) {
            return;
        }

        try {
            setLoading(true);

            const data = await getPayablePaymentDetail(paymentId);

            setPayment(data);
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

    if (loading) {
        return (
            <div
                className="flex h-64 items-center justify-center rounded-3xl border"
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
                    Loading payment...
                </div>
            </div>
        );
    }

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
                right={
                    <div>
                        <StatusBadge status={payment.status} />

                        {payment.status === "draft" && (
                            <button
                                type="button"
                                onClick={handlePostPayment}
                                className="rounded-2xl px-5 py-3 font-semibold text-white"
                                style={{
                                    background: "var(--color-primary)",
                                }}
                            >
                                Post Payment
                            </button>
                        )}
                    </div>
                }
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

                <div
                    className="overflow-hidden rounded-3xl border"
                    style={{
                        background: "var(--color-surface)",
                        borderColor: "var(--color-border)",
                        boxShadow: "var(--shadow)",
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
                            Invoice Allocations
                        </h2>

                        <div
                            className="mt-1 text-sm"
                            style={{
                                color: "var(--text-secondary)",
                            }}
                        >
                            Payment allocation details
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[900px] text-sm">
                            <thead
                                style={{
                                    background: "var(--color-surface-alt)",
                                }}
                            >
                                <tr>
                                    <th className="px-6 py-4 text-left font-semibold">Invoice</th>

                                    <th className="px-6 py-4 text-left font-semibold">
                                        Invoice Date
                                    </th>

                                    <th className="px-6 py-4 text-right font-semibold">
                                        Invoice Total
                                    </th>

                                    <th className="px-6 py-4 text-right font-semibold">
                                        Allocated Amount
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {payment.allocations?.map((allocation: any) => (
                                    <tr
                                        key={allocation.id}
                                        style={{
                                            borderTop: "1px solid var(--color-border)",
                                        }}
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="font-medium"
                                                    style={{
                                                        color: "var(--text-primary)",
                                                    }}
                                                >
                                                    {allocation.invoice_number}
                                                </div>

                                                <StatusBadge status={allocation.invoice_status} />
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            {formatValue(allocation.invoice_date, {
                                                format: "date",
                                            })}
                                        </td>

                                        <td className="px-6 py-4 text-right font-medium">
                                            {formatValue(allocation.invoice_total, {
                                                format: "currency",
                                            })}
                                        </td>

                                        <td className="px-6 py-4 text-right font-semibold">
                                            {formatValue(allocation.allocated_amount, {
                                                format: "currency",
                                            })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

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
