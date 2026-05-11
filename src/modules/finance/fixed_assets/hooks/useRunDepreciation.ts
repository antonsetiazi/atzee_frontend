// src/modules/finance/fixed_assets/hooks/useRunDepreciation.ts

import { useState } from "react";
import { runBulkDepreciation } from "../api/depreciation.api";
import type { DepreciationRunRequest } from "../types/depreciation.types";

export function useRunDepreciation() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function run(payload: DepreciationRunRequest) {
        try {
            setLoading(true);
            setError(null);

            return await runBulkDepreciation(payload);
        } catch (err) {
            console.error(err);

            setError("Failed to run depreciation");

            throw err;
        } finally {
            setLoading(false);
        }
    }

    return {
        run,
        loading,
        error,
    };
}
