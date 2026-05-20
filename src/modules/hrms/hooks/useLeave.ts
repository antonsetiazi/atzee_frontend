// src/modules/hrms/hooks/useLeave.ts

import { useCallback, useEffect, useState } from "react";
import { applyLeave, approveLeave, getPendingLeaves } from "../services/leave.service";
import type { ApplyLeavePayload, LeaveRequest } from "../types/leave.types";

export function useLeave() {
    const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchLeaves = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await getPendingLeaves();

            setLeaves(response);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to fetch leaves");
        } finally {
            setLoading(false);
        }
    }, []);

    const handleApplyLeave = async (payload: ApplyLeavePayload) => {
        await applyLeave(payload);

        await fetchLeaves();
    };

    const handleApproveLeave = async (id: string) => {
        await approveLeave(id);

        await fetchLeaves();
    };

    useEffect(() => {
        fetchLeaves();
    }, [fetchLeaves]);

    return {
        leaves,

        loading,
        error,

        fetchLeaves,

        applyLeave: handleApplyLeave,

        approveLeave: handleApproveLeave,
    };
}
