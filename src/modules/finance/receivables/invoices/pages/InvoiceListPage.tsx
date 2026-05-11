// src/modules/finance/receivables/invoices/pages/InvoiceListPage.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getInvoices } from "../services/invoice.api";
import type { ReceivableInvoice } from "../types/invoice.types";
import { formatValue } from "@/shared/utils/formatValue";
import { Button, HeaderPage } from "@/core/ui/components";
import { SmartNavigate } from "@/core/navigation/SmartNavigate";

export default function InvoiceListPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [rows, setRows] = useState<ReceivableInvoice[]>([]);

    async function loadData() {
        try {
            const data = await getInvoices();
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
                title="Receivable Invoices"
                subtitle="Manage customer invoices and billing status"
                right={
                    <Button
                        onClick={() => SmartNavigate.go("/finance/receivables/invoices/create")}
                    >
                        + Create Invoice
                    </Button>
                }
            />
            <div className="space-y-4 p-4">
                {/* TABLE WRAPPER */}
                <div
                    className="overflow-hidden rounded-2xl border"
                    style={{
                        background: "var(--color-surface)",
                        borderColor: "var(--color-border)",
                        boxShadow: "var(--shadow)",
                    }}
                >
                    {/* TABLE */}
                    <table className="w-full text-sm">
                        <thead>
                            <tr
                                style={{
                                    background: "var(--color-surface-alt)",
                                    color: "var(--text-muted)",
                                }}
                            >
                                <th className="p-4 text-left font-medium">Invoice</th>
                                <th className="p-4 text-left font-medium">Customer</th>
                                <th className="p-4 text-left font-medium">Date</th>
                                <th className="p-4 text-right font-medium">Total</th>
                                <th className="p-4 text-center font-medium">Status</th>
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
                                        style={{ color: "var(--text-muted)" }}
                                    >
                                        No invoices found
                                    </td>
                                </tr>
                            )}

                            {/* ROWS */}
                            {!loading &&
                                rows.map((row) => (
                                    <tr
                                        key={row.id}
                                        onClick={() =>
                                            navigate(`/finance/receivables/invoices/${row.id}`)
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
                                        <td className="p-4 font-medium">{row.invoice_number}</td>

                                        <td className="p-4">{row.customer_name}</td>

                                        <td
                                            className="p-4"
                                            style={{
                                                color: "var(--text-muted)",
                                            }}
                                        >
                                            {formatValue(row.invoice_date, {
                                                format: "date",
                                            })}
                                        </td>

                                        <td className="p-4 text-right font-medium">
                                            {formatValue(row.total_amount, { format: "currency" })}
                                        </td>

                                        <td className="p-4 text-center">
                                            <StatusBadge status={row.status} />
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

/* =========================
   STATUS BADGE SYSTEM
========================= */

function StatusBadge({ status }: { status: string }) {
    const map: Record<string, { bg: string; color: string }> = {
        paid: {
            bg: "rgba(34, 197, 94, 0.12)",
            color: "var(--color-success)",
        },
        partial: {
            bg: "rgba(245, 158, 11, 0.12)",
            color: "var(--color-warning)",
        },
        posted: {
            bg: "rgba(59, 130, 246, 0.12)",
            color: "var(--color-primary)",
        },
        default: {
            bg: "rgba(148, 163, 184, 0.12)",
            color: "var(--text-muted)",
        },
    };

    const style = map[status] || map.default;

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
