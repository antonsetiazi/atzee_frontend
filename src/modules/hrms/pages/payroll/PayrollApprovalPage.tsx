// src/modules/hrms/pages/payroll/PayrollApprovalPage.tsx

import { Check, X } from "lucide-react";

import { usePayroll } from "@/modules/hrms/hooks/usePayroll";
import { Badge, HeaderPage } from "@/core/ui/components";

export default function PayrollApprovalPage() {
    const { payrolls, loading, error, approvePayroll } = usePayroll();

    const pendingPayrolls = payrolls.filter((item) => item.status === "PENDING");

    const totalPendingAmount = pendingPayrolls.reduce(
        (total, item) => total + Number(item.net_salary || 0),
        0,
    );

    return (
        <>
            <HeaderPage
                title="Payroll Approval"
                subtitle="Review, validate, and approve payroll transactions before posting to accounting"
                meta={<Badge>{totalPendingAmount.toLocaleString()}</Badge>}
            />
            <div className="space-y-6 p-6">
                {/* LOADING */}
                {loading && (
                    <div className="rounded-3xl border bg-white p-10 text-center text-sm text-gray-500 shadow-sm">
                        Loading payroll approvals...
                    </div>
                )}

                {/* ERROR */}
                {error && (
                    <div className="rounded-3xl border bg-white p-10 text-center text-sm text-red-500 shadow-sm">
                        {error}
                    </div>
                )}

                {/* EMPTY */}
                {!loading && !error && pendingPayrolls.length === 0 && (
                    <div className="rounded-3xl border bg-white p-10 text-center text-sm text-gray-500 shadow-sm">
                        No pending payrolls.
                    </div>
                )}

                {/* PAYROLL CARDS */}
                {!loading &&
                    !error &&
                    pendingPayrolls.map((item) => (
                        <section
                            key={item.id}
                            className="rounded-3xl border bg-white p-6 shadow-sm"
                        >
                            <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                                {/* LEFT */}
                                <div className="flex items-start gap-4">
                                    {/* AVATAR */}
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-lg font-semibold">
                                        {item.employee_name?.charAt(0)}
                                    </div>

                                    {/* CONTENT */}
                                    <div>
                                        <div className="flex flex-wrap items-center gap-3">
                                            <h2 className="text-lg font-semibold">
                                                {item.employee_name}
                                            </h2>

                                            <span className="rounded-xl border px-3 py-1 text-xs font-medium">
                                                {item.period}
                                            </span>
                                        </div>

                                        <div className="mt-4 grid gap-4 md:grid-cols-2">
                                            <div>
                                                <p className="text-sm text-gray-500">
                                                    Gross Salary
                                                </p>

                                                <p className="mt-1 font-medium">
                                                    {Number(
                                                        item.gross_salary || 0,
                                                    ).toLocaleString()}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-sm text-gray-500">Net Salary</p>

                                                <p className="mt-1 text-lg font-semibold">
                                                    {Number(item.net_salary || 0).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* ACTIONS */}
                                <div className="flex items-center gap-3">
                                    <button className="flex items-center gap-2 rounded-2xl border border-red-200 px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50">
                                        <X className="h-4 w-4" />
                                        Reject
                                    </button>

                                    <button
                                        onClick={() => approvePayroll(item.id)}
                                        className="flex items-center gap-2 rounded-2xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
                                    >
                                        <Check className="h-4 w-4" />
                                        Approve
                                    </button>
                                </div>
                            </div>
                        </section>
                    ))}
            </div>
        </>
    );
}
