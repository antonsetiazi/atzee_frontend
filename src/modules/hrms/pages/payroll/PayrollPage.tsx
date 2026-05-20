// src/modules/hrms/pages/payroll/PayrollPage.tsx

import { useMemo, useState } from "react";

import { DollarSign, Receipt, Search, Wallet } from "lucide-react";

import { usePayroll } from "@/modules/hrms/hooks/usePayroll";
import { HeaderPage } from "@/core/ui/components";

export default function PayrollPage() {
    const { payrolls, loading, error } = usePayroll();

    const [search, setSearch] = useState("");

    const filteredPayrolls = useMemo(() => {
        if (!search) {
            return payrolls;
        }

        return payrolls.filter((item) =>
            item.employee_name?.toLowerCase().includes(search.toLowerCase()),
        );
    }, [payrolls, search]);

    const totalPayroll = payrolls.reduce((total, item) => total + Number(item.net_salary || 0), 0);

    const approvedPayrolls = payrolls.filter((item) => item.status === "APPROVED").length;

    const draftPayrolls = payrolls.filter((item) => item.status === "DRAFT").length;

    return (
        <>
            <HeaderPage
                title="Payroll"
                subtitle="Manage employee salaries, payroll periods, approvals, and compensation workflows."
                actions={[
                    {
                        label: "Approval",
                        href: "/hrms/payroll/approval",
                        variant: "secondary",
                    },
                    {
                        label: "Generate Payroll",
                    },
                ]}
            />
            <div className="space-y-6 p-6">
                {/* STATS */}
                <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {/* TOTAL */}
                    <div className="rounded-3xl border bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Total Payroll</p>

                                <h2 className="mt-3 text-3xl font-bold">
                                    {totalPayroll.toLocaleString()}
                                </h2>
                            </div>

                            <div className="rounded-2xl border p-3">
                                <DollarSign className="h-5 w-5" />
                            </div>
                        </div>
                    </div>

                    {/* APPROVED */}
                    <div className="rounded-3xl border bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Approved</p>

                                <h2 className="mt-3 text-3xl font-bold">{approvedPayrolls}</h2>
                            </div>

                            <div className="rounded-2xl border p-3">
                                <Receipt className="h-5 w-5" />
                            </div>
                        </div>
                    </div>

                    {/* DRAFT */}
                    <div className="rounded-3xl border bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Draft Payroll</p>

                                <h2 className="mt-3 text-3xl font-bold">{draftPayrolls}</h2>
                            </div>

                            <div className="rounded-2xl border p-3">
                                <Wallet className="h-5 w-5" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* SEARCH */}
                <section className="rounded-3xl border bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-3 rounded-2xl border px-4 py-3">
                        <Search className="h-4 w-4 text-gray-400" />

                        <input
                            type="text"
                            placeholder="Search payroll..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-transparent text-sm outline-none"
                        />
                    </div>
                </section>

                {/* TABLE */}
                <section className="rounded-3xl border bg-white shadow-sm">
                    {/* HEADER */}
                    <div className="grid grid-cols-6 gap-4 border-b px-6 py-4 text-sm font-medium text-gray-500">
                        <div>Employee</div>

                        <div>Period</div>

                        <div>Gross Salary</div>

                        <div>Net Salary</div>

                        <div>Status</div>

                        <div className="text-right">Action</div>
                    </div>

                    {/* LOADING */}
                    {loading && (
                        <div className="p-10 text-center text-sm text-gray-500">
                            Loading payroll...
                        </div>
                    )}

                    {/* ERROR */}
                    {error && <div className="p-10 text-center text-sm text-red-500">{error}</div>}

                    {/* EMPTY */}
                    {!loading && !error && filteredPayrolls.length === 0 && (
                        <div className="p-10 text-center text-sm text-gray-500">
                            No payroll data.
                        </div>
                    )}

                    {/* ROWS */}
                    {!loading &&
                        !error &&
                        filteredPayrolls.map((item) => (
                            <div
                                key={item.id}
                                className="grid grid-cols-6 gap-4 border-b px-6 py-5 transition hover:bg-gray-50"
                            >
                                {/* EMPLOYEE */}
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gray-100 text-sm font-semibold">
                                        {item.employee_name?.charAt(0)}
                                    </div>

                                    <div>
                                        <p className="font-medium">{item.employee_name}</p>

                                        <p className="text-sm text-gray-500">
                                            {item.employee_code}
                                        </p>
                                    </div>
                                </div>

                                {/* PERIOD */}
                                <div className="flex items-center text-sm text-gray-600">
                                    {item.period}
                                </div>

                                {/* GROSS */}
                                <div className="flex items-center text-sm text-gray-600">
                                    {Number(item.gross_salary || 0).toLocaleString()}
                                </div>

                                {/* NET */}
                                <div className="flex items-center text-sm font-medium">
                                    {Number(item.net_salary || 0).toLocaleString()}
                                </div>

                                {/* STATUS */}
                                <div className="flex items-center">
                                    <span className="rounded-xl border px-3 py-1 text-xs font-medium">
                                        {item.status}
                                    </span>
                                </div>

                                {/* ACTION */}
                                <div className="flex items-center justify-end">
                                    <button className="rounded-xl border px-3 py-2 text-sm font-medium transition hover:bg-gray-100">
                                        View
                                    </button>
                                </div>
                            </div>
                        ))}
                </section>
            </div>
        </>
    );
}
