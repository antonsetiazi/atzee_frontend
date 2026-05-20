// src/modules/hrms/services/payroll.service.ts

import { httpGet, httpPost } from "@/core/http/http.client";

import type { Payroll, GeneratePayrollPayload } from "../types/payroll.types";

const BASE_URL = "/api/hrms/payroll";

export async function getPayrolls(): Promise<Payroll[]> {
    return httpGet<Payroll[]>(BASE_URL);
}

export async function generatePayroll(payload: GeneratePayrollPayload): Promise<Payroll> {
    return httpPost<Payroll>(`${BASE_URL}/generate/`, payload);
}

export async function approvePayroll(id: string): Promise<Payroll> {
    return httpPost<Payroll>(`${BASE_URL}/${id}/approve/`);
}
