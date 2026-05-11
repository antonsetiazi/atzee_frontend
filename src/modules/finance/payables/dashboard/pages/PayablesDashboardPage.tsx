// src/modules/finance/payables/dashboard/pages/PayablesDashboardPage.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getPayablesDashboard } from "../services/dashboard.service";

import { formatValue } from "@/shared/utils/formatValue";
import { Button, HeaderPage, SummaryCard } from "@/core/ui/components";
import { SmartNavigate } from "@/core/navigation/SmartNavigate";

type DashboardData = {
    summary: {
        total_payable: number;
        overdue_amount: number;
        overdue_count: number;
        paid_this_month: number;
        draft_count: number;
    };

    recent_invoices: any[];

    recent_payments: any[];
};

export default function PayablesDashboardPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<DashboardData | null>(null);

    async function load() {
        try {
            setLoading(true);
            const res = await getPayablesDashboard();
            setData(res);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    if (loading) {
        return (
            <div
                className="flex h-[300px] items-center justify-center rounded-3xl border"
                style={{
                    background: "var(--color-surface)",
                    borderColor: "var(--color-border)",
                }}
            >
                <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    Loading dashboard...
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div
                className="rounded-3xl border p-10 text-center"
                style={{
                    background: "var(--color-surface)",
                    borderColor: "var(--color-border)",
                    color: "var(--text-secondary)",
                }}
            >
                No dashboard data available
            </div>
        );
    }

    const s = data.summary;

    return (
        <>
            <HeaderPage
                title="Accounts Payable"
                subtitle="Overview of vendor liabilities and outgoing payments"
                right={
                    <div className="flex gap-2">
                        <Button
                            onClick={() => SmartNavigate.go("/finance/payables/invoices/create")}
                        >
                            + Create Bill
                        </Button>

                        <Button
                            onClick={() => SmartNavigate.go("/finance/payables/payments/create")}
                        >
                            Record Payment
                        </Button>
                    </div>
                }
            />
            <div className="space-y-4 p-4">
                {/* SUMMARY */}

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <SummaryCard
                        title="Total Payable"
                        value={formatValue(s.total_payable, {
                            format: "currency",
                        })}
                        tone="default"
                    />

                    <SummaryCard
                        title="Overdue Bills"
                        value={formatValue(s.overdue_amount, {
                            format: "currency",
                        })}
                        subtitle={`${s.overdue_count} unpaid invoices`}
                        tone="danger"
                    />

                    <SummaryCard
                        title="Paid This Month"
                        value={formatValue(s.paid_this_month, {
                            format: "currency",
                        })}
                        tone="success"
                    />

                    <SummaryCard title="Draft Bills" value={String(s.draft_count)} tone="warning" />
                </div>

                {/* CONTENT GRID */}

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    {/* RECENT BILLS */}

                    <SectionCard
                        title="Recent Bills"
                        actionLabel="View All"
                        onAction={() => navigate("/finance/payables/invoices")}
                    >
                        {data.recent_invoices.length === 0 ? (
                            <EmptyState text="No payable invoices found" />
                        ) : (
                            <div
                                className="divide-y"
                                style={{
                                    borderColor: "var(--color-border)",
                                }}
                            >
                                {data.recent_invoices.map((inv) => (
                                    <button
                                        key={inv.id}
                                        onClick={() =>
                                            navigate(`/finance/payables/invoices/${inv.id}`)
                                        }
                                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-all hover:opacity-80"
                                    >
                                        <div className="min-w-0">
                                            <div
                                                className="truncate font-medium"
                                                style={{
                                                    color: "var(--text-primary)",
                                                }}
                                            >
                                                {inv.invoice_number}
                                            </div>

                                            <div
                                                className="mt-1 text-sm"
                                                style={{
                                                    color: "var(--text-secondary)",
                                                }}
                                            >
                                                {inv.partner_name}
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <div
                                                className="font-semibold"
                                                style={{
                                                    color: "var(--text-primary)",
                                                }}
                                            >
                                                {formatValue(inv.total_amount, {
                                                    format: "currency",
                                                })}
                                            </div>

                                            <StatusBadge status={inv.status} />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </SectionCard>

                    {/* RECENT PAYMENTS */}

                    <SectionCard
                        title="Recent Payments"
                        actionLabel="View All"
                        onAction={() => navigate("/finance/payables/payments")}
                    >
                        {data.recent_payments.length === 0 ? (
                            <EmptyState text="No payments recorded" />
                        ) : (
                            <div
                                className="divide-y"
                                style={{
                                    borderColor: "var(--color-border)",
                                }}
                            >
                                {data.recent_payments.map((pay) => (
                                    <button
                                        key={pay.id}
                                        onClick={() =>
                                            navigate(`/finance/payables/payments/${pay.id}`)
                                        }
                                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-all hover:opacity-80"
                                    >
                                        <div className="min-w-0">
                                            <div
                                                className="truncate font-medium"
                                                style={{
                                                    color: "var(--text-primary)",
                                                }}
                                            >
                                                {pay.payment_number}
                                            </div>

                                            <div
                                                className="mt-1 text-sm"
                                                style={{
                                                    color: "var(--text-secondary)",
                                                }}
                                            >
                                                {pay.partner_name}
                                            </div>
                                        </div>

                                        <div
                                            className="text-right text-lg font-semibold"
                                            style={{
                                                color: "var(--color-success)",
                                            }}
                                        >
                                            {formatValue(pay.amount, {
                                                format: "currency",
                                            })}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </SectionCard>
                </div>
            </div>
        </>
    );
}

/* =========================
   COMPONENTS
========================= */

function SectionCard({
    title,
    children,
    actionLabel,
    onAction,
}: {
    title: string;
    children: React.ReactNode;
    actionLabel?: string;
    onAction?: () => void;
}) {
    return (
        <div
            className="overflow-hidden rounded-3xl border"
            style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border)",
                boxShadow: "var(--shadow)",
            }}
        >
            <div
                className="flex items-center justify-between border-b px-5 py-4"
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
                    {title}
                </h2>

                {actionLabel && (
                    <button
                        onClick={onAction}
                        className="text-sm font-medium"
                        style={{
                            color: "var(--color-primary)",
                        }}
                    >
                        {actionLabel}
                    </button>
                )}
            </div>

            {children}
        </div>
    );
}

function EmptyState({ text }: { text: string }) {
    return (
        <div
            className="p-10 text-center text-sm"
            style={{
                color: "var(--text-secondary)",
            }}
        >
            {text}
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const map: Record<
        string,
        {
            bg: string;
            color: string;
            label: string;
        }
    > = {
        paid: {
            bg: "rgba(34,197,94,0.12)",
            color: "var(--color-success)",
            label: "Paid",
        },

        partial: {
            bg: "rgba(249,115,22,0.12)",
            color: "var(--color-warning)",
            label: "Partial",
        },

        posted: {
            bg: "rgba(59,130,246,0.12)",
            color: "#2563eb",
            label: "Posted",
        },

        draft: {
            bg: "rgba(148,163,184,0.12)",
            color: "var(--text-secondary)",
            label: "Draft",
        },
    };

    const item = map[status] || map.draft;

    return (
        <div
            className="mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-medium"
            style={{
                background: item.bg,
                color: item.color,
            }}
        >
            {item.label}
        </div>
    );
}
