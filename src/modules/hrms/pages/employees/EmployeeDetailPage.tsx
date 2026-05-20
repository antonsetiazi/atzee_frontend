// src/modules/hrms/pages/employees/EmployeeDetailPage.tsx

import { useMemo } from "react";
import { useParams } from "react-router-dom";

import {
    BadgeCheck,
    BriefcaseBusiness,
    Building2,
    CalendarDays,
    Mail,
    Phone,
    ShieldCheck,
} from "lucide-react";

import { useEmployees } from "@/modules/hrms/hooks/useEmployees";
import { LoadingState } from "@/core/ui/components";

export default function EmployeeDetailPage() {
    const { id } = useParams();
    const { employees, loading, error } = useEmployees();

    const employee = useMemo(() => {
        return employees.find((item) => item.id === id);
    }, [employees, id]);

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

    if (!employee) {
        return (
            <div className="p-6">
                <div className="rounded-3xl border bg-white p-10 text-center text-sm text-gray-500 shadow-sm">
                    Employee not found.
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 p-6">
            {/* PROFILE HERO */}
            <section className="rounded-3xl border bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center gap-5">
                        {/* AVATAR */}
                        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gray-100 text-3xl font-bold">
                            {employee.full_name.charAt(0)}
                        </div>

                        {/* INFO */}
                        <div>
                            <div className="flex flex-wrap items-center gap-3">
                                <h1 className="text-3xl font-bold tracking-tight">
                                    {employee.full_name}
                                </h1>

                                <span className="rounded-2xl border px-3 py-1 text-xs font-medium">
                                    {employee.employment_status}
                                </span>
                            </div>

                            <div className="mt-3 flex flex-wrap gap-5 text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4" />

                                    {employee.email}
                                </div>

                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4" />

                                    {employee.phone_number || "-"}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex items-center gap-3">
                        <button className="rounded-2xl border px-4 py-2 text-sm font-medium transition hover:bg-gray-50">
                            Edit Employee
                        </button>

                        <button className="rounded-2xl bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-90">
                            Employee Action
                        </button>
                    </div>
                </div>
            </section>

            {/* OVERVIEW GRID */}
            <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                {/* LEFT */}
                <div className="space-y-6 xl:col-span-2">
                    {/* EMPLOYMENT INFO */}
                    <div className="rounded-3xl border bg-white p-6 shadow-sm">
                        <div className="mb-5">
                            <h2 className="text-lg font-semibold">Employment Information</h2>

                            <p className="text-sm text-gray-500">
                                Employee organizational and contract details
                            </p>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            <div>
                                <p className="text-sm text-gray-500">Employee ID</p>

                                <p className="mt-1 font-medium">{employee.employee_id}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Contract Type</p>

                                <p className="mt-1 font-medium">{employee.contract_type}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Department</p>

                                <div className="mt-1 flex items-center gap-2">
                                    <Building2 className="h-4 w-4 text-gray-400" />

                                    <p className="font-medium">{employee.department || "-"}</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Hire Date</p>

                                <div className="mt-1 flex items-center gap-2">
                                    <CalendarDays className="h-4 w-4 text-gray-400" />

                                    <p className="font-medium">{employee.hire_date || "-"}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PERSONAL INFO */}
                    <div className="rounded-3xl border bg-white p-6 shadow-sm">
                        <div className="mb-5">
                            <h2 className="text-lg font-semibold">Personal Information</h2>

                            <p className="text-sm text-gray-500">Personal and identity details</p>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            <div>
                                <p className="text-sm text-gray-500">Gender</p>

                                <p className="mt-1 font-medium">{employee.gender || "-"}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Birth Date</p>

                                <p className="mt-1 font-medium">{employee.birth_date || "-"}</p>
                            </div>

                            <div className="md:col-span-2">
                                <p className="text-sm text-gray-500">Address</p>

                                <p className="mt-1 font-medium">{employee.address || "-"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDEBAR */}
                <div className="space-y-6">
                    {/* STATUS CARD */}
                    <div className="rounded-3xl border bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="rounded-2xl border p-3">
                                <BadgeCheck className="h-5 w-5" />
                            </div>

                            <div>
                                <h2 className="font-semibold">Employment Status</h2>

                                <p className="text-sm text-gray-500">Current employee state</p>
                            </div>
                        </div>

                        <div className="mt-5 rounded-2xl border px-4 py-3 text-center">
                            <p className="text-sm text-gray-500">Status</p>

                            <p className="mt-1 text-lg font-semibold">
                                {employee.employment_status}
                            </p>
                        </div>
                    </div>

                    {/* POSITION CARD */}
                    <div className="rounded-3xl border bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="rounded-2xl border p-3">
                                <BriefcaseBusiness className="h-5 w-5" />
                            </div>

                            <div>
                                <h2 className="font-semibold">Contract</h2>

                                <p className="text-sm text-gray-500">Employment agreement</p>
                            </div>
                        </div>

                        <div className="mt-5">
                            <p className="text-sm text-gray-500">Contract Type</p>

                            <p className="mt-1 text-lg font-semibold">{employee.contract_type}</p>
                        </div>
                    </div>

                    {/* SECURITY */}
                    <div className="rounded-3xl border bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="rounded-2xl border p-3">
                                <ShieldCheck className="h-5 w-5" />
                            </div>

                            <div>
                                <h2 className="font-semibold">Access & Security</h2>

                                <p className="text-sm text-gray-500">System access and identity</p>
                            </div>
                        </div>

                        <div className="mt-5 space-y-4">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-500">Linked User</p>

                                <p className="text-sm font-medium">
                                    {employee.user ? "Connected" : "Not Linked"}
                                </p>
                            </div>

                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-500">Active</p>

                                <p className="text-sm font-medium">
                                    {employee.is_active ? "Yes" : "No"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
