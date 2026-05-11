// src/modules/finance/receivables/dashboard/pages/ReceivableDashboardPage.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { getReceivableDashboard } from "../services/dashboard.service";
import { formatValue } from "@/shared/utils/formatValue";
import { HeaderPage, SummaryCard } from "@/core/ui/components";

export default function ReceivableDashboardPage() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);

    async function load() {
        try {
            setLoading(true);
            const res = await getReceivableDashboard();
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

    const s = data?.summary;

    return (
        <>
            <HeaderPage
                title="Receivable Dashboard"
                subtitle="Overview of customer receivables performance"
            />

            <div
                className="space-y-4 p-4"
                style={{
                    color: "var(--text-primary)",
                    background: "var(--color-background)",
                }}
            >
                {/* LOADING STATE */}
                {loading && (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-24 animate-pulse rounded-2xl border"
                                style={{
                                    background: "var(--color-surface)",
                                    borderColor: "var(--color-border)",
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* SUMMARY CARDS */}
                {!loading && data && (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                        <SummaryCard
                            title="Total Receivable"
                            value={formatValue(s.total_receivable, { format: "currency" })}
                        />
                        <SummaryCard
                            title="Overdue"
                            value={formatValue(s.overdue_amount, { format: "currency" })}
                            subtitle={`${s.overdue_count} invoices`}
                            tone="danger"
                        />
                        <SummaryCard
                            title="Paid This Month"
                            value={formatValue(s.paid_this_month, { format: "currency" })}
                            tone="success"
                        />
                        <SummaryCard title="Draft Invoices" value={s.draft_count} />
                    </div>
                )}

                {/* RECENT INVOICES */}
                {!loading && data && (
                    <Section title="Recent Invoices">
                        {data.recent_invoices?.map((inv: any) => (
                            <Row key={inv.id}>
                                <div>
                                    <div className="font-medium">{inv.invoice_number}</div>
                                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                                        {inv.customer_name}
                                    </div>
                                </div>

                                <div className="font-medium">
                                    {formatValue(inv.total_amount, { format: "currency" })}
                                </div>
                            </Row>
                        ))}
                    </Section>
                )}

                {/* RECENT PAYMENTS */}
                {!loading && data && (
                    <Section title="Recent Payments">
                        {data.recent_payments?.map((pay: any) => (
                            <Row key={pay.id}>
                                <div>
                                    <div className="font-medium">{pay.payment_number}</div>
                                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                                        {pay.customer_name}
                                    </div>
                                </div>

                                <div
                                    className="font-medium"
                                    style={{ color: "var(--color-success)" }}
                                >
                                    {formatValue(pay.amount, { format: "currency" })}
                                </div>
                            </Row>
                        ))}
                    </Section>
                )}
            </div>
        </>
    );
}

/* =========================
   UI COMPONENTS (LOCAL)
========================= */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div
            className="overflow-hidden rounded-2xl border"
            style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border)",
            }}
        >
            <div
                className="border-b px-4 py-3 font-medium"
                style={{
                    borderColor: "var(--color-border)",
                }}
            >
                {title}
            </div>

            <div className="divide-y divide-[var(--color-border)]">{children}</div>
        </div>
    );
}

function Row({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between px-4 py-3 text-sm transition hover:opacity-80">
            {children}
        </div>
    );
}
