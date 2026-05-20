// src/modules/hrms/types/payroll.types.ts

export type PayrollStatus = "DRAFT" | "PENDING" | "APPROVED" | "PROCESSED" | "PAID" | "CANCELLED";

export interface Payroll {
    id: string;
    tenant: string;
    employee_name?: string;
    employee_code?: string;
    department_name?: string;
    payroll_period: string;
    basic_salary: number;
    allowance_amount: number;
    deduction_amount: number;
    net_salary: number;
    period?: string;
    gross_salary?: number;
    processed_at?: string | null;
    status: PayrollStatus;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface GeneratePayrollPayload {
    employee_id: string;
    payroll_period: string;
}
