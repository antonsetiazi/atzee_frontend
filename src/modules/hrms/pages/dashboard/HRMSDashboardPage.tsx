// src/modules/hrms/pages/dashboard/HRMSDashboardPage.tsx

import { HeaderPage } from "@/core/ui/components";
import {
    Users,
    UserCheck,
    UserX,
    Clock3,
    CalendarDays,
    FileClock,
    BadgeDollarSign,
    ArrowUpRight,
} from "lucide-react";

export default function HRMSDashboardPage() {
    const stats = [
        {
            title: "Total Employees",
            value: "248",
            icon: Users,
        },

        {
            title: "Present Today",
            value: "219",
            icon: UserCheck,
        },

        {
            title: "Absent",
            value: "7",
            icon: UserX,
        },

        {
            title: "Late Employees",
            value: "12",
            icon: Clock3,
        },
    ];

    const quickActions = [
        {
            title: "Add Employee",
            description: "Register new employee into HRMS",
        },

        {
            title: "Attendance Monitor",
            description: "View realtime attendance activity",
        },

        {
            title: "Approve Leave",
            description: "Review pending leave requests",
        },

        {
            title: "Generate Payroll",
            description: "Process payroll for current period",
        },
    ];

    const recentActivities = [
        {
            title: "John Doe checked in",
            time: "5 minutes ago",
        },

        {
            title: "Payroll April 2026 generated",
            time: "20 minutes ago",
        },

        {
            title: "Sarah leave request approved",
            time: "1 hour ago",
        },

        {
            title: "Michael promoted to Supervisor",
            time: "Today",
        },
    ];

    const pendingApprovals = [
        {
            title: "Leave Requests",
            count: 8,
            icon: CalendarDays,
        },

        {
            title: "Overtime Requests",
            count: 3,
            icon: FileClock,
        },

        {
            title: "Payroll Approval",
            count: 1,
            icon: BadgeDollarSign,
        },
    ];

    return (
        <>
            <HeaderPage
                title="Workforce Dashboard"
                subtitle="Monitor workforce activity, attendance, approvals, and employee operations from one unified workspace."
                actions={[
                    {
                        label: "Export Report",
                        href: "",
                    },
                    {
                        label: "Add Employee",
                        href: "",
                    },
                ]}
            />
            <div className="space-y-6 p-6">
                {/* STATS */}
                <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {stats.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.title}
                                className="rounded-3xl border bg-white p-5 shadow-sm"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">{item.title}</p>

                                        <h2 className="mt-3 text-3xl font-bold">{item.value}</h2>
                                    </div>

                                    <div className="rounded-2xl border p-3">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </section>

                {/* MAIN GRID */}
                <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                    {/* QUICK ACTIONS */}
                    <div className="rounded-3xl border bg-white p-6 shadow-sm xl:col-span-2">
                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-semibold">Quick Actions</h2>

                                <p className="text-sm text-gray-500">
                                    Frequently used HRMS operations
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            {quickActions.map((action) => (
                                <button
                                    key={action.title}
                                    className="group rounded-3xl border p-5 text-left transition hover:bg-gray-50"
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="font-semibold">{action.title}</h3>

                                            <p className="mt-2 text-sm text-gray-500">
                                                {action.description}
                                            </p>
                                        </div>

                                        <ArrowUpRight className="h-5 w-5 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* APPROVALS */}
                    <div className="rounded-3xl border bg-white p-6 shadow-sm">
                        <div>
                            <h2 className="text-lg font-semibold">Pending Approvals</h2>

                            <p className="text-sm text-gray-500">Tasks requiring your review</p>
                        </div>

                        <div className="mt-5 space-y-4">
                            {pendingApprovals.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={item.title}
                                        className="flex items-center justify-between rounded-2xl border p-4"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-2xl border p-2">
                                                <Icon className="h-4 w-4" />
                                            </div>

                                            <div>
                                                <p className="font-medium">{item.title}</p>

                                                <p className="text-sm text-gray-500">
                                                    Pending tasks
                                                </p>
                                            </div>
                                        </div>

                                        <div className="rounded-xl bg-black px-3 py-1 text-sm font-medium text-white">
                                            {item.count}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ACTIVITY */}
                <section className="rounded-3xl border bg-white p-6 shadow-sm">
                    <div className="mb-5">
                        <h2 className="text-lg font-semibold">Recent Activity</h2>

                        <p className="text-sm text-gray-500">
                            Latest workforce activities and HR operations
                        </p>
                    </div>

                    <div className="space-y-4">
                        {recentActivities.map((activity) => (
                            <div
                                key={activity.title}
                                className="flex items-center justify-between rounded-2xl border p-4"
                            >
                                <div>
                                    <p className="font-medium">{activity.title}</p>

                                    <p className="mt-1 text-sm text-gray-500">{activity.time}</p>
                                </div>

                                <button className="text-sm font-medium text-gray-500 transition hover:text-black">
                                    View
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}
