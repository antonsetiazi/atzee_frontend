// src/modules/hrms/services/leave.service.ts

import { httpGet, httpPost } from "@/core/http/http.client";

import type { LeaveRequest, ApplyLeavePayload } from "../types/leave.types";

const BASE_URL = "/api/hrms/leave";

export async function getPendingLeaves(): Promise<LeaveRequest[]> {
    return httpGet<LeaveRequest[]>(BASE_URL);
}

export async function applyLeave(payload: ApplyLeavePayload): Promise<LeaveRequest> {
    return httpPost<LeaveRequest>(`${BASE_URL}/apply/`, payload);
}

export async function approveLeave(id: string): Promise<LeaveRequest> {
    return httpPost<LeaveRequest>(`${BASE_URL}/${id}/approve/`);
}
