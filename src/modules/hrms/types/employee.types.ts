// src/modules/hrms/types/employee.types.ts

export type EmployeeGender = "MALE" | "FEMALE" | "OTHER";

export type EmployeeStatus = "ACTIVE" | "INACTIVE" | "TERMINATED" | "RESIGNED" | "PROBATION";

export type ContractType = "PERMANENT" | "CONTRACT" | "INTERNSHIP" | "FREELANCE";

export interface Employee {
    id: string;
    tenant: string;
    employee_id: string;
    full_name: string;
    email: string;
    phone_number?: string;
    gender?: EmployeeGender;
    employment_status: EmployeeStatus;
    contract_type: ContractType;
    hire_date?: string;
    birth_date?: string;
    address?: string;
    department?: string | null;
    user?: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface CreateEmployeePayload {
    employee_id: string;
    full_name: string;
    email: string;
    phone_number?: string;
    gender?: EmployeeGender;
    contract_type?: ContractType;
    employment_status: EmployeeStatus;
    hire_date?: string;
    birth_date?: string;
    address?: string;
    department?: string | null;
}

export interface UpdateEmployeePayload {
    full_name?: string;
    email?: string;
    phone_number?: string;
    gender?: EmployeeGender;
    employment_status?: EmployeeStatus;
    contract_type?: ContractType;
    hire_date?: string;
    birth_date?: string;
    address?: string;
    department?: string | null;
}
