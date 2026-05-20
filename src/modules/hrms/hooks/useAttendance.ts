// src/modules/hrms/hooks/useAttendance.ts

import { useCallback, useEffect, useState } from "react";
import { checkIn, checkOut, getTodayAttendance } from "../services/attendance.service";
import type { Attendance, CheckInPayload, CheckOutPayload } from "../types/attendance.types";

export function useAttendance() {
    const [attendance, setAttendance] = useState<Attendance[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchAttendance = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await getTodayAttendance();

            setAttendance(response);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to fetch attendance");
        } finally {
            setLoading(false);
        }
    }, []);

    const handleCheckIn = async (payload: CheckInPayload) => {
        await checkIn(payload);

        await fetchAttendance();
    };

    const handleCheckOut = async (payload: CheckOutPayload) => {
        await checkOut(payload);

        await fetchAttendance();
    };

    useEffect(() => {
        fetchAttendance();

        const interval = setInterval(() => {
            fetchAttendance();
        }, 60_000);

        return () => clearInterval(interval);
    }, [fetchAttendance]);

    return {
        attendance,

        loading,
        error,

        fetchAttendance,

        checkIn: handleCheckIn,
        checkOut: handleCheckOut,
    };
}
