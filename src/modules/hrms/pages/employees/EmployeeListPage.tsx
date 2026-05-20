// src/modules/hrms/pages/employees/EmployeeListPage.tsx

import { useMemo, useState } from "react";
import { Plus, Search, SlidersHorizontal } from "lucide-react";
import { useEmployees } from "@/modules/hrms/hooks/useEmployees";
import { HeaderPage } from "@/core/ui/components";

export default function EmployeeListPage() {
    const { employees, loading, error } = useEmployees();
    const [search, setSearch] = useState("");

    const filteredEmployees = useMemo(() => {
        if (!search) {
            return employees;
        }

        return employees.filter((employee) =>
            employee.full_name.toLowerCase().includes(search.toLowerCase()),
        );
    }, [employees, search]);

    return (
        <>
            <HeaderPage
                title="Employees"
                subtitle="Manage workforce, employee profiles, contracts, and organizational data"
                actions={[
                    {
                        label: "Filters",
                        icon: SlidersHorizontal,
                    },
                    {
                        label: "Add Employee",
                        icon: Plus,
                        href: "/hrms/employees/create",
                    },
                ]}
            />
            <div className="space-y-6 p-6">
                {/* SEARCH */}
                <section className="rounded-3xl border bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-3 rounded-2xl border px-4 py-3">
                        <Search className="h-4 w-4 text-gray-400" />

                        <input
                            type="text"
                            placeholder="Search employee..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-transparent text-sm outline-none"
                        />
                    </div>
                </section>

                {/* CONTENT */}
                <section className="rounded-3xl border bg-white shadow-sm">
                    {/* TABLE HEADER */}
                    <div className="grid grid-cols-6 gap-4 border-b px-6 py-4 text-sm font-medium text-gray-500">
                        <div>Employee</div>

                        <div>Department</div>

                        <div>Status</div>

                        <div>Contract</div>

                        <div>Hire Date</div>

                        <div className="text-right">Action</div>
                    </div>

                    {/* LOADING */}
                    {loading && (
                        <div className="p-10 text-center text-sm text-gray-500">
                            Loading employees...
                        </div>
                    )}

                    {/* ERROR */}
                    {error && <div className="p-10 text-center text-sm text-red-500">{error}</div>}

                    {/* EMPTY */}
                    {!loading && !error && filteredEmployees.length === 0 && (
                        <div className="p-10 text-center text-sm text-gray-500">
                            No employees found.
                        </div>
                    )}

                    {/* ROWS */}
                    {!loading &&
                        !error &&
                        filteredEmployees.map((employee) => (
                            <div
                                key={employee.id}
                                className="grid grid-cols-6 gap-4 border-b px-6 py-5 transition hover:bg-gray-50"
                            >
                                {/* EMPLOYEE */}
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gray-100 text-sm font-semibold">
                                        {employee.full_name.charAt(0)}
                                    </div>

                                    <div>
                                        <p className="font-medium">{employee.full_name}</p>

                                        <p className="text-sm text-gray-500">{employee.email}</p>
                                    </div>
                                </div>

                                {/* DEPARTMENT */}
                                <div className="flex items-center text-sm text-gray-600">
                                    {employee.department || "-"}
                                </div>

                                {/* STATUS */}
                                <div className="flex items-center">
                                    <span className="rounded-xl border px-3 py-1 text-xs font-medium">
                                        {employee.employment_status}
                                    </span>
                                </div>

                                {/* CONTRACT */}
                                <div className="flex items-center text-sm text-gray-600">
                                    {employee.contract_type}
                                </div>

                                {/* HIRE DATE */}
                                <div className="flex items-center text-sm text-gray-600">
                                    {employee.hire_date || "-"}
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
