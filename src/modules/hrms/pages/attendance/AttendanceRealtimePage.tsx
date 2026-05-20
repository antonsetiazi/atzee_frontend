// src/modules/hrms/pages/attendance/AttendanceRealtimePage.tsx

import { Activity, Clock3, RefreshCcw, UserCheck, UserX } from "lucide-react";
import { useAttendance } from "@/modules/hrms/hooks/useAttendance";

export default function AttendanceRealtimePage() {
    const { attendance, loading, error, fetchAttendance } = useAttendance();
    const presentEmployees = attendance.filter((item) => item.status === "PRESENT");
    const lateEmployees = attendance.filter((item) => item.status === "LATE");
    const absentEmployees = attendance.filter((item) => item.status === "ABSENT");

    return (
        <div className="space-y-6 p-6">
            {/* HERO */}
            <section className="rounded-3xl border bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <Activity className="h-5 w-5" />

                            <p className="text-sm text-gray-500">REALTIME WORKFORCE</p>
                        </div>

                        <h1 className="mt-2 text-3xl font-bold tracking-tight">
                            Attendance Monitor
                        </h1>

                        <p className="mt-2 text-sm text-gray-600">
                            Realtime workforce attendance visibility and monitoring center.
                        </p>
                    </div>

                    <button
                        onClick={() => fetchAttendance()}
                        className="flex items-center gap-2 rounded-2xl border px-5 py-3 text-sm font-medium transition hover:bg-gray-50"
                    >
                        <RefreshCcw className="h-4 w-4" />
                        Refresh
                    </button>
                </div>
            </section>

            {/* STATS */}
            <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {/* PRESENT */}
                <div className="rounded-3xl border bg-white p-5 shadow-sm">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Present</p>

                            <h2 className="mt-3 text-3xl font-bold">{presentEmployees.length}</h2>
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
                            <p className="text-sm text-gray-500">Late</p>

                            <h2 className="mt-3 text-3xl font-bold">{lateEmployees.length}</h2>
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

                            <h2 className="mt-3 text-3xl font-bold">{absentEmployees.length}</h2>
                        </div>

                        <div className="rounded-2xl border p-3">
                            <UserX className="h-5 w-5" />
                        </div>
                    </div>
                </div>
            </section>

            {/* LIVE ACTIVITY */}
            <section className="rounded-3xl border bg-white shadow-sm">
                {/* HEADER */}
                <div className="flex items-center justify-between border-b px-6 py-5">
                    <div>
                        <h2 className="text-lg font-semibold">Live Attendance</h2>

                        <p className="text-sm text-gray-500">
                            Realtime employee attendance activity
                        </p>
                    </div>

                    <div className="flex items-center gap-2 rounded-2xl border px-3 py-2 text-xs font-medium">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        Live
                    </div>
                </div>

                {/* LOADING */}
                {loading && (
                    <div className="p-10 text-center text-sm text-gray-500">
                        Loading realtime attendance...
                    </div>
                )}

                {/* ERROR */}
                {error && <div className="p-10 text-center text-sm text-red-500">{error}</div>}

                {/* EMPTY */}
                {!loading && !error && attendance.length === 0 && (
                    <div className="p-10 text-center text-sm text-gray-500">
                        No attendance data.
                    </div>
                )}

                {/* ROWS */}
                {!loading &&
                    !error &&
                    attendance.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between border-b px-6 py-5 transition hover:bg-gray-50"
                        >
                            {/* EMPLOYEE */}
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-sm font-semibold">
                                    {item.employee_name?.charAt(0)}
                                </div>

                                <div>
                                    <p className="font-medium">{item.employee_name}</p>

                                    <p className="text-sm text-gray-500">{item.employee_code}</p>
                                </div>
                            </div>

                            {/* STATUS */}
                            <div className="flex items-center gap-5">
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">Check In</p>

                                    <p className="font-medium">{item.check_in || "-"}</p>
                                </div>

                                <div className="rounded-2xl border px-4 py-2 text-sm font-medium">
                                    {item.status}
                                </div>
                            </div>
                        </div>
                    ))}
            </section>
        </div>
    );
}
