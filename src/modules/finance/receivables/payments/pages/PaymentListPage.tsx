// src/modules/finance/receivables/payments/pages/PaymentListPage.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getReceivablePayments } from "../services/payment.service";
import type { ReceivablePayment } from "../types/payment.types";
import { formatValue } from "@/shared/utils/formatValue";
import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from "@/core/config/format.config";
import { HeaderPage } from "@/core/ui/components";

export default function PaymentListPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [rows, setRows] = useState<ReceivablePayment[]>([]);

    async function loadData() {
        try {
            setLoading(true);
            const data = await getReceivablePayments();
            setRows(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <HeaderPage
                title="Receivable Payments"
                subtitle="Manage customer cash inflows and allocations"
            />
            <div
                className="space-y-6 p-6"
                style={{
                    background: "var(--color-background)",
                    color: "var(--text-primary)",
                }}
            >
                {/* =========================
                TABLE WRAPPER
            ========================= */}
                <button
                    onClick={() => navigate("/finance/receivables/payments/create")}
                    className="rounded-xl px-4 py-2 text-sm transition hover:opacity-80"
                    style={{
                        background: "var(--color-primary)",
                        color: "#fff",
                    }}
                >
                    + Receive Payment
                </button>
                <div
                    className="overflow-hidden rounded-2xl border"
                    style={{
                        background: "var(--color-surface)",
                        borderColor: "var(--color-border)",
                        boxShadow: "var(--shadow)",
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
                                <th className="p-4 text-left font-medium">Payment No</th>
                                <th className="p-4 text-left font-medium">Customer</th>
                                <th className="p-4 text-left font-medium">Invoice(s)</th>
                                <th className="p-4 text-left font-medium">Date</th>
                                <th className="p-4 text-right font-medium">Amount</th>
                            </tr>
                        </thead>

                        <tbody>
                            {/* LOADING */}
                            {loading && (
                                <tr>
                                    <td colSpan={5} className="p-6">
                                        <div className="space-y-3">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="h-10 animate-pulse rounded-lg"
                                                    style={{
                                                        background: "var(--color-surface-alt)",
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            )}

                            {/* EMPTY STATE */}
                            {!loading && rows.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="p-10 text-center"
                                        style={{
                                            color: "var(--text-muted)",
                                        }}
                                    >
                                        No payments found
                                    </td>
                                </tr>
                            )}

                            {/* ROWS */}
                            {!loading &&
                                rows.map((row) => (
                                    <tr
                                        key={row.id}
                                        onClick={() =>
                                            navigate(`/finance/receivables/payments/${row.id}`)
                                        }
                                        className="cursor-pointer transition"
                                        style={{
                                            borderTop: "1px solid var(--color-border)",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background =
                                                "var(--color-surface-alt)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = "transparent";
                                        }}
                                    >
                                        <td className="p-4 font-medium">{row.payment_number}</td>

                                        <td className="p-4">{row.customer_name}</td>

                                        {/* ALLOCATION VIEW */}
                                        <td
                                            className="p-4"
                                            style={{
                                                color: "var(--text-muted)",
                                            }}
                                        >
                                            {row.allocations?.length
                                                ? row.allocations
                                                      .map((a) => a.invoice_number)
                                                      .join(", ")
                                                : "-"}
                                        </td>

                                        <td
                                            className="p-4"
                                            style={{
                                                color: "var(--text-muted)",
                                            }}
                                        >
                                            {formatValue(row.payment_date, {
                                                format: "date",
                                            })}
                                        </td>

                                        <td className="p-4 text-right font-semibold">
                                            {formatValue(row.amount, {
                                                format: "currency",
                                                currency: DEFAULT_CURRENCY,
                                                locale: DEFAULT_LOCALE,
                                            })}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
