export default function PremiumFinanceDashboard() {
    const metrics = [
        {
            label: "Cash Balance",
            value: "Rp 12.4B",
            growth: "+12.8%",
        },
        {
            label: "Accounts Receivable",
            value: "Rp 4.1B",
            growth: "+4.2%",
        },
        {
            label: "Accounts Payable",
            value: "Rp 2.7B",
            growth: "-2.4%",
        },
        {
            label: "Net Profit",
            value: "Rp 1.9B",
            growth: "+18.6%",
        },
    ];

    const activities = [
        {
            title: "Monthly depreciation posted",
            description: "47 fixed assets depreciated successfully.",
            time: "5 minutes ago",
        },
        {
            title: "Large payment received",
            description: "PT Nusantara Abadi paid invoice INV-2026-00124.",
            time: "18 minutes ago",
        },
        {
            title: "Asset disposed",
            description: "Toyota Innova 2018 disposed with loss recorded.",
            time: "1 hour ago",
        },
    ];

    const invoices = [
        {
            customer: "PT Sentra Logistik",
            invoice: "INV-2026-00081",
            amount: "Rp 148.000.000",
            status: "Paid",
        },
        {
            customer: "CV Maju Bersama",
            invoice: "INV-2026-00082",
            amount: "Rp 87.500.000",
            status: "Pending",
        },
        {
            customer: "PT Digital Asia",
            invoice: "INV-2026-00083",
            amount: "Rp 230.000.000",
            status: "Overdue",
        },
    ];

    return (
        <div
            className="min-h-screen p-6 lg:p-8"
            style={{
                background: "linear-gradient(180deg, #07111f 0%, #0b1728 100%)",
            }}
        >
            {/* HERO */}
            <div
                className="relative overflow-hidden rounded-[32px] border p-8 lg:p-10"
                style={{
                    background: "linear-gradient(135deg, rgba(17,24,39,0.95), rgba(15,23,42,0.82))",
                    borderColor: "rgba(255,255,255,0.08)",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
                }}
            >
                <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
                <div className="absolute bottom-0 left-1/3 h-52 w-52 rounded-full bg-indigo-500/20 blur-3xl" />

                <div className="relative z-10 flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-xs font-medium tracking-wide text-cyan-300">
                            ENTERPRISE FINANCE OVERVIEW
                        </div>

                        <h1 className="mt-6 text-4xl leading-tight font-black tracking-tight text-white lg:text-6xl">
                            Real-Time Financial Intelligence
                        </h1>

                        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 lg:text-lg">
                            Monitor cash flow, fixed assets, receivables, profitability, and
                            accounting activities across your organization from a single control
                            center.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <button className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-all hover:scale-[1.02]">
                                Open Financial Reports
                            </button>

                            <button className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white/10">
                                Run Depreciation
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 xl:w-[460px]">
                        {metrics.map((metric) => (
                            <div
                                key={metric.label}
                                className="rounded-3xl border p-5 backdrop-blur-xl"
                                style={{
                                    background: "rgba(255,255,255,0.05)",
                                    borderColor: "rgba(255,255,255,0.08)",
                                }}
                            >
                                <div className="text-xs tracking-wide text-slate-400 uppercase">
                                    {metric.label}
                                </div>

                                <div className="mt-3 text-2xl font-bold text-white lg:text-3xl">
                                    {metric.value}
                                </div>

                                <div className="mt-3 inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                                    {metric.growth}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* MAIN GRID */}
            <div className="mt-8 grid grid-cols-1 gap-6 2xl:grid-cols-[1.4fr_0.9fr]">
                {/* LEFT */}
                <div className="space-y-6">
                    {/* CASHFLOW */}
                    <div
                        className="rounded-[28px] border p-6"
                        style={{
                            background: "rgba(15,23,42,0.78)",
                            borderColor: "rgba(255,255,255,0.06)",
                            backdropFilter: "blur(24px)",
                        }}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-lg font-semibold text-white">
                                    Cash Flow Overview
                                </div>

                                <div className="mt-1 text-sm text-slate-400">
                                    Income and operational expense movement.
                                </div>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                                This Month
                            </div>
                        </div>

                        <div className="mt-10 flex h-[260px] items-end gap-4">
                            {[40, 65, 48, 80, 52, 95, 70, 110, 76, 120, 88, 130].map(
                                (height, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-1 flex-col items-center gap-3"
                                    >
                                        <div
                                            className="w-full rounded-t-3xl"
                                            style={{
                                                height,
                                                background:
                                                    "linear-gradient(180deg, rgba(34,211,238,0.95), rgba(59,130,246,0.55))",
                                            }}
                                        />

                                        <div className="text-xs text-slate-500">
                                            {
                                                [
                                                    "Jan",
                                                    "Feb",
                                                    "Mar",
                                                    "Apr",
                                                    "May",
                                                    "Jun",
                                                    "Jul",
                                                    "Aug",
                                                    "Sep",
                                                    "Oct",
                                                    "Nov",
                                                    "Dec",
                                                ][index]
                                            }
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>

                    {/* TABLE */}
                    <div
                        className="rounded-[28px] border p-6"
                        style={{
                            background: "rgba(15,23,42,0.78)",
                            borderColor: "rgba(255,255,255,0.06)",
                            backdropFilter: "blur(24px)",
                        }}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-lg font-semibold text-white">
                                    Recent Invoices
                                </div>

                                <div className="mt-1 text-sm text-slate-400">
                                    Latest receivable transactions.
                                </div>
                            </div>

                            <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition-all hover:bg-white/10">
                                View All
                            </button>
                        </div>

                        <div className="mt-6 overflow-hidden rounded-2xl border border-white/5">
                            <table className="w-full">
                                <thead
                                    style={{
                                        background: "rgba(255,255,255,0.04)",
                                    }}
                                >
                                    <tr>
                                        <Th>Customer</Th>
                                        <Th>Invoice</Th>
                                        <Th>Amount</Th>
                                        <Th>Status</Th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {invoices.map((item) => (
                                        <tr key={item.invoice} className="border-t border-white/5">
                                            <Td>{item.customer}</Td>
                                            <Td>{item.invoice}</Td>
                                            <Td>{item.amount}</Td>
                                            <Td>
                                                <StatusBadge status={item.status} />
                                            </Td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="space-y-6">
                    {/* AI CARD */}
                    <div
                        className="overflow-hidden rounded-[28px] border"
                        style={{
                            background:
                                "linear-gradient(135deg, rgba(8,47,73,0.95), rgba(30,41,59,0.9))",
                            borderColor: "rgba(255,255,255,0.06)",
                        }}
                    >
                        <div className="p-6">
                            <div className="inline-flex rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                                AI FINANCE INSIGHT
                            </div>

                            <div className="mt-4 text-2xl leading-snug font-bold text-white">
                                Cash flow is healthy and operating margin increased 12% this month.
                            </div>

                            <p className="mt-4 text-sm leading-7 text-slate-300">
                                Fixed asset depreciation is within expected range and receivable
                                aging remains stable. No abnormal accounting activity detected.
                            </p>
                        </div>

                        <div className="border-t border-white/5 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm text-slate-400">
                                        Financial Health Score
                                    </div>

                                    <div className="mt-2 text-5xl font-black text-white">92</div>
                                </div>

                                <div className="flex h-28 w-28 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10 text-lg font-bold text-cyan-300">
                                    Excellent
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ACTIVITY */}
                    <div
                        className="rounded-[28px] border p-6"
                        style={{
                            background: "rgba(15,23,42,0.78)",
                            borderColor: "rgba(255,255,255,0.06)",
                            backdropFilter: "blur(24px)",
                        }}
                    >
                        <div>
                            <div className="text-lg font-semibold text-white">Finance Activity</div>

                            <div className="mt-1 text-sm text-slate-400">
                                Live accounting and operational activities.
                            </div>
                        </div>

                        <div className="mt-8 space-y-8">
                            {activities.map((activity, index) => (
                                <div key={activity.title} className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="h-3 w-3 rounded-full bg-cyan-400" />

                                        {index !== activities.length - 1 && (
                                            <div className="mt-2 h-full w-px bg-white/10" />
                                        )}
                                    </div>

                                    <div className="pb-6">
                                        <div className="text-sm font-semibold text-white">
                                            {activity.title}
                                        </div>

                                        <div className="mt-2 text-sm leading-7 text-slate-400">
                                            {activity.description}
                                        </div>

                                        <div className="mt-3 text-xs text-slate-500">
                                            {activity.time}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Th({ children }: { children: React.ReactNode }) {
    return (
        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wide text-slate-400 uppercase">
            {children}
        </th>
    );
}

function Td({ children }: { children: React.ReactNode }) {
    return <td className="px-6 py-5 text-sm text-slate-200">{children}</td>;
}

function StatusBadge({ status }: { status: string }) {
    const config: Record<string, string> = {
        Paid: "bg-emerald-500/10 text-emerald-300",
        Pending: "bg-amber-500/10 text-amber-300",
        Overdue: "bg-rose-500/10 text-rose-300",
    };

    return (
        <div
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${config[status]}`}
        >
            {status}
        </div>
    );
}
