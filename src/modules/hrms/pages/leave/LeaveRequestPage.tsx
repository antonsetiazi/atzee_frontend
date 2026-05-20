// src/modules/hrms/pages/leave/LeaveRequestPage.tsx

import { useMemo, useState } from "react";
import { CalendarDays, Plus, Search } from "lucide-react";
import { useLeave } from "@/modules/hrms/hooks/useLeave";
import { HeaderPage } from "@/core/ui/components";

export default function LeaveRequestPage() {
    const { leaves, loading, error } = useLeave();
    const [search, setSearch] = useState("");

    const filteredLeaves = useMemo(() => {
        if (!search) {
            return leaves;
        }

        return leaves.filter((item) =>
            item.employee_name?.toLowerCase().includes(search.toLowerCase()),
        );
    }, [leaves, search]);

    const pendingCount = leaves.filter((item) => item.status === "PENDING").length;
    const approvedCount = leaves.filter((item) => item.status === "APPROVED").length;
    const rejectedCount = leaves.filter((item) => item.status === "REJECTED").length;

    return (
        <>
            <HeaderPage
                title="Leave Requests"
                subtitle="Manage employee leave applications, approvals, and workforce availability"
                actions={[
                    {
                        label: "Leave Approval",
                        href: "/hrms/leave/approval",
                        variant: "secondary",
                    },
                    {
                        label: "Apply Leave",
                        icon: Plus,
                    },
                ]}
            />
            <div className="space-y-6 p-6">
                {/* STATS */}
                <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {/* PENDING */}
                    <div className="rounded-3xl border bg-white p-5 shadow-sm">
                        <p className="text-sm text-gray-500">Pending Requests</p>

                        <h2 className="mt-3 text-3xl font-bold">{pendingCount}</h2>
                    </div>

                    {/* APPROVED */}
                    <div className="rounded-3xl border bg-white p-5 shadow-sm">
                        <p className="text-sm text-gray-500">Approved</p>

                        <h2 className="mt-3 text-3xl font-bold">{approvedCount}</h2>
                    </div>

                    {/* REJECTED */}
                    <div className="rounded-3xl border bg-white p-5 shadow-sm">
                        <p className="text-sm text-gray-500">Rejected</p>

                        <h2 className="mt-3 text-3xl font-bold">{rejectedCount}</h2>
                    </div>
                </section>

                {/* SEARCH */}
                <section className="rounded-3xl border bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-3 rounded-2xl border px-4 py-3">
                        <Search className="h-4 w-4 text-gray-400" />

                        <input
                            type="text"
                            placeholder="Search leave request..."
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

                        <div>Leave Type</div>

                        <div>Start Date</div>

                        <div>End Date</div>

                        <div>Status</div>

                        <div className="text-right">Action</div>
                    </div>

                    {/* LOADING */}
                    {loading && (
                        <div className="p-10 text-center text-sm text-gray-500">
                            Loading leave requests...
                        </div>
                    )}

                    {/* ERROR */}
                    {error && <div className="p-10 text-center text-sm text-red-500">{error}</div>}

                    {/* EMPTY */}
                    {!loading && !error && filteredLeaves.length === 0 && (
                        <div className="p-10 text-center text-sm text-gray-500">
                            No leave requests.
                        </div>
                    )}

                    {/* ROWS */}
                    {!loading &&
                        !error &&
                        filteredLeaves.map((item) => (
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

                                {/* LEAVE TYPE */}
                                <div className="flex items-center text-sm text-gray-600">
                                    {item.leave_type}
                                </div>

                                {/* START DATE */}
                                <div className="flex items-center text-sm text-gray-600">
                                    {item.start_date}
                                </div>

                                {/* END DATE */}
                                <div className="flex items-center text-sm text-gray-600">
                                    {item.end_date}
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
