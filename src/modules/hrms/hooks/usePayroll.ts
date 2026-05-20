// src/modules/hrms/hooks/usePayroll.ts

import { useCallback, useEffect, useState } from "react";
import { approvePayroll, generatePayroll, getPayrolls } from "../services/payroll.service";
import type { GeneratePayrollPayload, Payroll } from "../types/payroll.types";

export function usePayroll() {
    const [payrolls, setPayrolls] = useState<Payroll[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPayrolls = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await getPayrolls();

            setPayrolls(response);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to fetch payrolls");
        } finally {
            setLoading(false);
        }
    }, []);

    const handleGeneratePayroll = async (payload: GeneratePayrollPayload) => {
        await generatePayroll(payload);

        await fetchPayrolls();
    };

    const handleApprovePayroll = async (id: string) => {
        await approvePayroll(id);

        await fetchPayrolls();
    };

    useEffect(() => {
        fetchPayrolls();
    }, [fetchPayrolls]);

    return {
        payrolls,

        loading,
        error,

        fetchPayrolls,

        generatePayroll: handleGeneratePayroll,

        approvePayroll: handleApprovePayroll,
    };
}
