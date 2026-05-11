// src/modules/finance/payables/invoices/pages/PayableInvoiceListPage.tsx

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { formatValue } from "@/shared/utils/formatValue";

import { getPayableInvoices } from "../services/payableInvoice.service";
import type { PayableInvoice } from "../types/payableInvoice.types";
import { Button, HeaderPage, SummaryCard } from "@/core/ui/components";
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

export default function PayableInvoiceListPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [rows, setRows] = useState<PayableInvoice[]>([]);

    async function loadData() {
        try {
            setLoading(true);

            const data = await getPayableInvoices();

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

    const summary = useMemo(() => {
        const totalPayables = rows.reduce((acc, item) => acc + Number(item.balance_due || 0), 0);

        const overdueInvoices = rows.filter((item) => {
            return item.status !== "paid" && new Date(item.due_date) < new Date();
        });

        const overdueAmount = overdueInvoices.reduce(
            (acc, item) => acc + Number(item.balance_due || 0),
            0,
        );

        const unpaidCount = rows.filter((item) => item.status !== "paid").length;

        return {
            totalPayables,
            overdueAmount,
            overdueCount: overdueInvoices.length,
            unpaidCount,
        };
    }, [rows]);

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
                    Loading payable invoices...
                </div>
            </div>
        );
    }

    return (
        <>
            <HeaderPage
                title="Accounts Payable"
                subtitle="Manage vendor invoices and outstanding liabilities"
                right={
                    <Button onClick={() => SmartNavigate.go("/finance/payables/invoices/create")}>
                        + Create Vendor Bill
                    </Button>
                }
            />
            <div className="space-y-4 p-4">
                {/* SUMMARY */}

                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    <SummaryCard
                        title="Outstanding Payables"
                        value={formatValue(summary.totalPayables, {
                            format: "currency",
                        })}
                    />
                    <SummaryCard
                        title="Overdue Bills"
                        value={formatValue(summary.overdueAmount, {
                            format: "currency",
                        })}
                        subtitle={`${summary.overdueCount} overdue invoices`}
                    />
                    <SummaryCard title="Open Invoices" value={String(summary.unpaidCount)} />
                    <SummaryCard title="Total Records" value={String(rows.length)} />
                </div>

                {/* TABLE */}

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
                        <div className="flex items-center justify-between">
                            <div>
                                <h2
                                    className="font-semibold"
                                    style={{
                                        color: "var(--text-primary)",
                                    }}
                                >
                                    Vendor Bills
                                </h2>

                                <div
                                    className="mt-1 text-sm"
                                    style={{
                                        color: "var(--text-secondary)",
                                    }}
                                >
                                    All payable invoices across vendors
                                </div>
                            </div>
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

                                    <th className="px-6 py-4 text-left font-semibold">Vendor</th>

                                    <th className="px-6 py-4 text-left font-semibold">
                                        Invoice Date
                                    </th>

                                    <th className="px-6 py-4 text-left font-semibold">Due Date</th>

                                    <th className="px-6 py-4 text-right font-semibold">Total</th>

                                    <th className="px-6 py-4 text-right font-semibold">Balance</th>

                                    <th className="px-6 py-4 text-center font-semibold">Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {rows.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-16 text-center">
                                            <div
                                                className="text-sm"
                                                style={{
                                                    color: "var(--text-secondary)",
                                                }}
                                            >
                                                No payable invoices found
                                            </div>
                                        </td>
                                    </tr>
                                )}

                                {rows.map((row) => (
                                    <tr
                                        key={row.id}
                                        onClick={() =>
                                            navigate(`/finance/payables/invoices/${row.id}`)
                                        }
                                        className="cursor-pointer transition-all hover:bg-black/5"
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
                                                {row.invoice_number}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div
                                                style={{
                                                    color: "var(--text-primary)",
                                                }}
                                            >
                                                {row.partner_name}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div
                                                style={{
                                                    color: "var(--text-secondary)",
                                                }}
                                            >
                                                {formatValue(row.invoice_date, {
                                                    format: "date",
                                                })}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div
                                                style={{
                                                    color: "var(--text-secondary)",
                                                }}
                                            >
                                                {formatValue(row.due_date, {
                                                    format: "date",
                                                })}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-right font-medium">
                                            {formatValue(row.total_amount, {
                                                format: "currency",
                                            })}
                                        </td>

                                        <td className="px-6 py-4 text-right font-semibold">
                                            {formatValue(row.balance_due, {
                                                format: "currency",
                                            })}
                                        </td>

                                        <td className="px-6 py-4 text-center">
                                            <StatusBadge status={row.status} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
