// src/modules/hrms/services/employee.service.ts

import { httpGet, httpPost, httpPut, httpDelete } from "@/core/http/http.client";

import type {
    Employee,
    CreateEmployeePayload,
    UpdateEmployeePayload,
} from "../types/employee.types";

const BASE_URL = "/api/hrms/employees";

export async function getEmployees(): Promise<Employee[]> {
    return httpGet<Employee[]>(BASE_URL);
}

export async function getEmployeeById(id: string): Promise<Employee> {
    return httpGet<Employee>(`${BASE_URL}/${id}/`);
}

export async function createEmployee(payload: CreateEmployeePayload): Promise<Employee> {
    return httpPost<Employee>(`${BASE_URL}/onboard/`, payload);
}

export async function updateEmployee(
    id: string,
    payload: UpdateEmployeePayload,
): Promise<Employee> {
    return httpPut<Employee>(`${BASE_URL}/${id}/`, payload);
}

export async function deleteEmployee(id: string): Promise<void> {
    return httpDelete<void>(`${BASE_URL}/${id}/`);
}
