// src/modules/finance/receivables/payments/pages/PaymentDetailPage.tsx

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPaymentDetail } from "../services/payment.service";
import type { PaymentDetail } from "../types/payment.types";
import { formatValue } from "@/shared/utils/formatValue";
import { HeaderPage } from "@/core/ui/components";

export default function PaymentDetailPage() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [payment, setPayment] = useState<PaymentDetail | null>(null);

    const loadData = useCallback(async () => {
        if (!id) return;

        try {
            setLoading(true);
            const data = await getPaymentDetail(id);
            setPayment(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    if (loading) return <Skeleton />;
    if (!payment) return <Empty />;

    const totalAllocated = payment.allocations.reduce(
        (acc, item) => acc + Number(item.allocated_amount),
        0,
    );

    const remaining = Number(payment.amount) - totalAllocated;

    return (
        <>
            <HeaderPage
                title="Receivable Payment Detail"
                subtitle="Record incoming customer cash receipt"
            />

            <div
                className="space-y-4 p-4"
                style={{
                    background: "var(--color-background)",
                    color: "var(--text-primary)",
                }}
            >
                {/* =========================
                HEADER
            ========================= */}
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-xl font-semibold">Payment #{payment.payment_number}</h1>

                        <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
                            {payment.customer_name}
                        </p>
                    </div>

                    <div className="text-right">
                        <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                            Payment Date
                        </div>

                        <div className="font-medium">
                            {formatValue(payment.payment_date, {
                                format: "date",
                            })}
                        </div>
                    </div>
                </div>

                {/* =========================
                SUMMARY
            ========================= */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <SummaryCard label="Total Payment" value={payment.amount} primary />

                    <SummaryCard label="Allocated" value={totalAllocated} />

                    <SummaryCard label="Remaining" value={remaining} highlight />
                </div>

                {/* =========================
                ALLOCATION LEDGER
            ========================= */}
                <div
                    className="overflow-hidden rounded-2xl border"
                    style={{
                        background: "var(--color-surface)",
                        borderColor: "var(--color-border)",
                    }}
                >
                    <div
                        className="border-b p-4 font-semibold"
                        style={{
                            borderColor: "var(--color-border)",
                        }}
                    >
                        Invoice Allocations
                    </div>

                    {/* HEADER */}
                    <div
                        className="grid grid-cols-2 p-4 text-xs font-medium"
                        style={{ color: "var(--text-muted)" }}
                    >
                        <div>Invoice</div>
                        <div className="text-right">Allocated</div>
                    </div>

                    {/* ROWS */}
                    <div className="space-y-2 px-4 pb-4">
                        {payment.allocations.map((a) => (
                            <div
                                key={a.id}
                                className="grid grid-cols-2 py-2 text-sm"
                                style={{
                                    borderTop: "1px solid var(--color-border)",
                                }}
                            >
                                <div>{a.invoice_number}</div>

                                <div className="text-right font-medium tabular-nums">
                                    {formatValue(a.allocated_amount, {
                                        format: "currency",
                                    })}
                                </div>
                            </div>
                        ))}

                        {payment.allocations.length === 0 && (
                            <div
                                className="py-6 text-center text-sm"
                                style={{
                                    color: "var(--text-muted)",
                                }}
                            >
                                No allocations found
                            </div>
                        )}
                    </div>
                </div>

                {/* =========================
                META INFO (FINANCIAL FOOTNOTE STYLE)
            ========================= */}
                <div
                    className="space-y-3 rounded-2xl border p-4"
                    style={{
                        background: "var(--color-surface)",
                        borderColor: "var(--color-border)",
                    }}
                >
                    <MetaRow label="Payment Method" value={payment.payment_method} />

                    {payment.reference && <MetaRow label="Reference" value={payment.reference} />}

                    {payment.notes && <MetaRow label="Notes" value={payment.notes} />}
                </div>
            </div>
        </>
    );
}

/* =========================
   COMPONENTS
========================= */

function SummaryCard({ label, value, primary, highlight }: any) {
    return (
        <div
            className="rounded-xl border p-4"
            style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border)",
            }}
        >
            <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                {label}
            </div>

            <div
                className={`mt-1 text-xl font-semibold tabular-nums`}
                style={{
                    color: primary
                        ? "var(--color-primary)"
                        : highlight
                          ? "var(--color-success)"
                          : "var(--text-primary)",
                }}
            >
                {formatValue(value, {
                    format: "currency",
                })}
            </div>
        </div>
    );
}

function MetaRow({ label, value }: any) {
    return (
        <div className="flex justify-between text-sm">
            <span style={{ color: "var(--text-muted)" }}>{label}</span>
            <span className="font-medium">{value}</span>
        </div>
    );
}

function Skeleton() {
    return (
        <div className="space-y-4 p-6">
            <div className="h-6 w-1/3 animate-pulse rounded bg-gray-200" />
            <div className="h-24 animate-pulse rounded bg-gray-200" />
            <div className="h-48 animate-pulse rounded bg-gray-200" />
        </div>
    );
}

function Empty() {
    return <div className="p-6 text-center text-gray-500">Payment not found</div>;
}
