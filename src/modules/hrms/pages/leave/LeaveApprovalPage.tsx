// src/modules/hrms/pages/leave/LeaveApprovalPage.tsx

import { Check, X } from "lucide-react";
import { useLeave } from "@/modules/hrms/hooks/useLeave";
import { Badge, HeaderPage } from "@/core/ui/components";

export default function LeaveApprovalPage() {
    const { leaves, loading, error, approveLeave } = useLeave();
    const pendingLeaves = leaves.filter((item) => item.status === "PENDING");

    return (
        <>
            <HeaderPage
                title="Leave Approvals"
                subtitle="Review and approve employee leave applications and workforce scheduling"
                meta={<Badge>{pendingLeaves.length} Pending Requests</Badge>}
            />
            <div className="space-y-6 p-6">
                {/* LOADING */}
                {loading && (
                    <div className="rounded-3xl border bg-white p-10 text-center text-sm text-gray-500 shadow-sm">
                        Loading approvals...
                    </div>
                )}

                {/* ERROR */}
                {error && (
                    <div className="rounded-3xl border bg-white p-10 text-center text-sm text-red-500 shadow-sm">
                        {error}
                    </div>
                )}

                {/* EMPTY */}
                {!loading && !error && pendingLeaves.length === 0 && (
                    <div className="rounded-3xl border bg-white p-10 text-center text-sm text-gray-500 shadow-sm">
                        No pending leave requests.
                    </div>
                )}

                {/* APPROVAL CARDS */}
                {!loading &&
                    !error &&
                    pendingLeaves.map((item) => (
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
                                                {item.leave_type}
                                            </span>
                                        </div>

                                        <div className="mt-3 flex flex-wrap gap-5 text-sm text-gray-500">
                                            <div>
                                                <span className="font-medium text-black">
                                                    Start:
                                                </span>{" "}
                                                {item.start_date}
                                            </div>

                                            <div>
                                                <span className="font-medium text-black">End:</span>{" "}
                                                {item.end_date}
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <p className="text-sm text-gray-500">Reason</p>

                                            <p className="mt-1 text-sm">{item.reason || "-"}</p>
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
                                        onClick={() => approveLeave(item.id)}
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
