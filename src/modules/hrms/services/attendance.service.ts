// src/modules/hrms/services/attendance.service.ts

import { httpGet, httpPost } from "@/core/http/http.client";

import type { Attendance, CheckInPayload, CheckOutPayload } from "../types/attendance.types";

const BASE_URL = "/api/hrms/attendance";

export async function getTodayAttendance(): Promise<Attendance[]> {
    return httpGet<Attendance[]>(BASE_URL);
}

export async function checkIn(payload: CheckInPayload): Promise<Attendance> {
    return httpPost<Attendance>(`${BASE_URL}/check-in/`, payload);
}

export async function checkOut(payload: CheckOutPayload): Promise<Attendance> {
    return httpPost<Attendance>(`${BASE_URL}/check-out/`, payload);
}
