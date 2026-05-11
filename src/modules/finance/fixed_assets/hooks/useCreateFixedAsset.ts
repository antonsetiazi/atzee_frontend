// src/modules/finance/fixed_assets/hooks/useCreateFixedAsset.ts

import { useState } from "react";
import { createFixedAsset } from "../api/fixedAsset.api";
import type { FixedAssetFormData } from "../types/fixedAsset.types";

export function useCreateFixedAsset() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function submit(payload: FixedAssetFormData) {
        try {
            setLoading(true);
            setError(null);

            return await createFixedAsset(payload);
        } catch (err) {
            console.error(err);

            setError("Failed to create asset");

            throw err;
        } finally {
            setLoading(false);
        }
    }

    return {
        submit,
        loading,
        error,
    };
}
