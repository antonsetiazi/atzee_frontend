// src/modules/finance/payables/payments/pages/PayablePaymentListPage.tsx

import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { formatValue } from "@/shared/utils/formatValue";
import type { PayablePayment } from "../types/payment.types";
import { getPayablePayments } from "../services/payment.service";
import { Button, HeaderPage } from "@/core/ui/components";
import { SmartNavigate } from "@/core/navigation/SmartNavigate";

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

export default function PayablePaymentListPage() {
    const [loading, setLoading] = useState(true);

    const [payments, setPayments] = useState<PayablePayment[]>([]);

    const loadData = useCallback(async () => {
        try {
            setLoading(true);

            const data = await getPayablePayments();

            setPayments(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    return (
        <>
            <HeaderPage
                title="Vendor Payments"
                subtitle="Manage supplier payments and allocations"
                right={
                    <Button onClick={() => SmartNavigate.go("/finance/payables/payments/create")}>
                        Create Payment
                    </Button>
                }
            />
            <div className="space-y-4 p-4">
                {/* TABLE */}

                <div
                    className="overflow-hidden rounded-3xl border"
                    style={{
                        background: "var(--color-surface)",
                        borderColor: "var(--color-border)",
                        boxShadow: "var(--shadow)",
                    }}
                >
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1100px] text-sm">
                            <thead
                                style={{
                                    background: "var(--color-surface-alt)",
                                }}
                            >
                                <tr>
                                    <th className="px-6 py-4 text-left font-semibold">Reference</th>

                                    <th className="px-6 py-4 text-left font-semibold">Vendor</th>

                                    <th className="px-6 py-4 text-left font-semibold">
                                        Payment Date
                                    </th>

                                    <th className="px-6 py-4 text-right font-semibold">Amount</th>

                                    <th className="px-6 py-4 text-center font-semibold">Status</th>

                                    <th className="px-6 py-4 text-right font-semibold">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="px-6 py-10 text-center"
                                            style={{
                                                color: "var(--text-secondary)",
                                            }}
                                        >
                                            Loading payments...
                                        </td>
                                    </tr>
                                ) : payments.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="px-6 py-10 text-center"
                                            style={{
                                                color: "var(--text-secondary)",
                                            }}
                                        >
                                            No payments found
                                        </td>
                                    </tr>
                                ) : (
                                    payments.map((payment) => (
                                        <tr
                                            key={payment.id}
                                            style={{
                                                borderTop: "1px solid var(--color-border)",
                                            }}
                                        >
                                            <td className="px-6 py-4">
                                                <div
                                                    className="font-semibold"
                                                    style={{
                                                        color: "var(--text-primary)",
                                                    }}
                                                >
                                                    {payment.payment_number}
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div
                                                    className="font-medium"
                                                    style={{
                                                        color: "var(--text-primary)",
                                                    }}
                                                >
                                                    {payment.partner_name}
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                {formatValue(payment.payment_date, {
                                                    format: "date",
                                                })}
                                            </td>

                                            <td className="px-6 py-4 text-right font-semibold">
                                                {formatValue(payment.amount, {
                                                    format: "currency",
                                                })}
                                            </td>

                                            <td className="px-6 py-4 text-center">
                                                <StatusBadge status={payment.status} />
                                            </td>

                                            <td className="px-6 py-4 text-right">
                                                <Link
                                                    to={`/finance/payables/payments/${payment.id}`}
                                                    className="text-sm font-medium"
                                                    style={{
                                                        color: "var(--text-brand)",
                                                    }}
                                                >
                                                    View Detail
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
