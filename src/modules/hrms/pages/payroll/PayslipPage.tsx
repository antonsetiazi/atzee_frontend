// src/modules/hrms/pages/payroll/PayslipPage.tsx

import { Building2, CalendarDays, Download, ReceiptText, User2 } from "lucide-react";

import { useParams } from "react-router-dom";

import { usePayroll } from "@/modules/hrms/hooks/usePayroll";
import { LoadingState } from "@/core/ui/components";

export default function PayslipPage() {
    const { id } = useParams();
    const { payrolls, loading, error } = usePayroll();
    const payroll = payrolls.find((item) => item.id === id);

    if (loading) return <LoadingState />;

    if (error) {
        return (
            <div className="p-6">
                <div className="rounded-3xl border bg-white p-10 text-center text-sm text-red-500 shadow-sm">
                    {error}
                </div>
            </div>
        );
    }

    if (!payroll) {
        return (
            <div className="p-6">
                <div className="rounded-3xl border bg-white p-10 text-center text-sm text-gray-500 shadow-sm">
                    Payslip not found.
                </div>
            </div>
        );
    }

    const grossSalary = Number(payroll.gross_salary || 0);

    const netSalary = Number(payroll.net_salary || 0);

    const deductions = grossSalary - netSalary;

    return (
        <div className="space-y-6 p-6">
            {/* HERO */}
            <section className="rounded-3xl border bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <ReceiptText className="h-5 w-5" />

                            <p className="text-sm text-gray-500">EMPLOYEE PAYSLIP</p>
                        </div>

                        <h1 className="mt-2 text-3xl font-bold tracking-tight">Payslip</h1>

                        <p className="mt-2 text-sm text-gray-600">
                            Employee payroll breakdown and salary details.
                        </p>
                    </div>

                    <button className="flex items-center gap-2 rounded-2xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90">
                        <Download className="h-4 w-4" />
                        Download PDF
                    </button>
                </div>
            </section>

            {/* PAYSLIP */}
            <section className="rounded-3xl border bg-white p-8 shadow-sm">
                {/* COMPANY */}
                <div className="flex flex-col gap-5 border-b pb-6 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold">ATZEE HRMS</h2>

                        <p className="mt-2 text-sm text-gray-500">Payroll payslip document</p>
                    </div>

                    <div className="rounded-2xl border px-4 py-3 text-sm">{payroll.period}</div>
                </div>

                {/* EMPLOYEE INFO */}
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                    {/* LEFT */}
                    <div className="space-y-5">
                        <div className="flex items-start gap-3">
                            <div className="rounded-2xl border p-3">
                                <User2 className="h-5 w-5" />
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Employee</p>

                                <p className="mt-1 text-lg font-semibold">
                                    {payroll.employee_name}
                                </p>

                                <p className="text-sm text-gray-500">{payroll.employee_code}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="rounded-2xl border p-3">
                                <Building2 className="h-5 w-5" />
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Department</p>

                                <p className="mt-1 font-medium">{payroll.department_name || "-"}</p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="space-y-5">
                        <div className="flex items-start gap-3">
                            <div className="rounded-2xl border p-3">
                                <CalendarDays className="h-5 w-5" />
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Payroll Period</p>

                                <p className="mt-1 font-medium">{payroll.period}</p>
                            </div>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Payroll Status</p>

                            <div className="mt-2 inline-flex rounded-xl border px-3 py-1 text-xs font-medium">
                                {payroll.status}
                            </div>
                        </div>
                    </div>
                </div>

                {/* SALARY BREAKDOWN */}
                <div className="mt-10 rounded-3xl border">
                    {/* HEADER */}
                    <div className="border-b px-6 py-4">
                        <h3 className="text-lg font-semibold">Salary Breakdown</h3>
                    </div>

                    {/* ROWS */}
                    <div className="space-y-4 p-6">
                        {/* GROSS */}
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">Gross Salary</p>

                            <p className="font-medium">{grossSalary.toLocaleString()}</p>
                        </div>

                        {/* DEDUCTIONS */}
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">Deductions</p>

                            <p className="font-medium">{deductions.toLocaleString()}</p>
                        </div>

                        {/* DIVIDER */}
                        <div className="border-t" />

                        {/* NET */}
                        <div className="flex items-center justify-between">
                            <p className="text-lg font-semibold">Net Salary</p>

                            <p className="text-2xl font-bold">{netSalary.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
