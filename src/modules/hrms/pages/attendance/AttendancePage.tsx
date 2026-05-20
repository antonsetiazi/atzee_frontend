// src/modules/hrms/pages/attendance/AttendancePage.tsx

import { useMemo, useState } from "react";
import { Clock3, Search, UserCheck, UserX } from "lucide-react";
import { useAttendance } from "@/modules/hrms/hooks/useAttendance";
import { HeaderPage } from "@/core/ui/components";

export default function AttendancePage() {
    const { attendance, loading, error } = useAttendance();
    const [search, setSearch] = useState("");
    const filteredAttendance = useMemo(() => {
        if (!search) {
            return attendance;
        }

        return attendance.filter((item) =>
            item.employee_name?.toLowerCase().includes(search.toLowerCase()),
        );
    }, [attendance, search]);

    const totalPresent = attendance.filter((item) => item.status === "PRESENT").length;
    const totalAbsent = attendance.filter((item) => item.status === "ABSENT").length;
    const totalLate = attendance.filter((item) => item.status === "LATE").length;

    return (
        <>
            <HeaderPage
                title="Attendance"
                subtitle="Monitor employee attendance, work activity, and realtime workforce presence"
                actions={[
                    {
                        label: "Open Realtime Monitor",
                    },
                ]}
            />
            <div className="space-y-6 p-6">
                {/* STATS */}
                <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {/* PRESENT */}
                    <div className="rounded-3xl border bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Present Today</p>

                                <h2 className="mt-3 text-3xl font-bold">{totalPresent}</h2>
                            </div>

                            <div className="rounded-2xl border p-3">
                                <UserCheck className="h-5 w-5" />
                            </div>
                        </div>
                    </div>

                    {/* LATE */}
                    <div className="rounded-3xl border bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Late Employees</p>

                                <h2 className="mt-3 text-3xl font-bold">{totalLate}</h2>
                            </div>

                            <div className="rounded-2xl border p-3">
                                <Clock3 className="h-5 w-5" />
                            </div>
                        </div>
                    </div>

                    {/* ABSENT */}
                    <div className="rounded-3xl border bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Absent</p>

                                <h2 className="mt-3 text-3xl font-bold">{totalAbsent}</h2>
                            </div>

                            <div className="rounded-2xl border p-3">
                                <UserX className="h-5 w-5" />
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
                            placeholder="Search attendance..."
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

                        <div>Date</div>

                        <div>Check In</div>

                        <div>Check Out</div>

                        <div>Status</div>

                        <div className="text-right">Action</div>
                    </div>

                    {/* LOADING */}
                    {loading && (
                        <div className="p-10 text-center text-sm text-gray-500">
                            Loading attendance...
                        </div>
                    )}

                    {/* ERROR */}
                    {error && <div className="p-10 text-center text-sm text-red-500">{error}</div>}

                    {/* EMPTY */}
                    {!loading && !error && filteredAttendance.length === 0 && (
                        <div className="p-10 text-center text-sm text-gray-500">
                            No attendance data.
                        </div>
                    )}

                    {/* ROWS */}
                    {!loading &&
                        !error &&
                        filteredAttendance.map((item) => (
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

                                {/* DATE */}
                                <div className="flex items-center text-sm text-gray-600">
                                    {item.attendance_date}
                                </div>

                                {/* CHECK IN */}
                                <div className="flex items-center text-sm text-gray-600">
                                    {item.check_in || "-"}
                                </div>

                                {/* CHECK OUT */}
                                <div className="flex items-center text-sm text-gray-600">
                                    {item.check_out || "-"}
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
