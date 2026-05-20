// src/modules/hrms/types/attendance.types.ts

export type AttendanceStatus = "PRESENT" | "LATE" | "ABSENT" | "LEAVE" | "SICK" | "HOLIDAY";

export interface Attendance {
    id: string;
    tenant: string;
    employee_name?: string;
    employee_code?: string;
    attendance_date: string;
    check_in?: string | null;
    check_out?: string | null;
    overtime_hours?: number;
    notes?: string;
    status: AttendanceStatus;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface CheckInPayload {
    employee_id: string;
}

export interface CheckOutPayload {
    employee_id: string;
}
