// src/modules/hrms/types/leave.types.ts

export type LeaveType = "ANNUAL" | "SICK" | "MATERNITY" | "PATERNITY" | "UNPAID" | "SPECIAL";

export type LeaveStatus = "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";

export interface LeaveRequest {
    id: string;
    tenant: string;
    employee_name?: string;
    employee_code?: string;
    leave_type: LeaveType;
    start_date: string;
    end_date: string;
    reason?: string;
    status: LeaveStatus;
    approved_by?: string | null;
    approved_at?: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface ApplyLeavePayload {
    employee_id: string;
    leave_type: LeaveType;
    start_date: string;
    end_date: string;
    reason?: string;
}
