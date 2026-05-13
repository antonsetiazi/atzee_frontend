// src/modules/finance/fixed_assets/hooks/useCreateAssetDisposal.ts

import { useState } from "react";
import { createAssetDisposal } from "../api/disposal.api";
import type { AssetDisposalFormData } from "../types/disposal.types";

export function useCreateAssetDisposal() {
    const [loading, setLoading] = useState(false);

    async function submit(payload: AssetDisposalFormData) {
        try {
            setLoading(true);

            return await createAssetDisposal(payload);
        } finally {
            setLoading(false);
        }
    }

    return {
        submit,
        loading,
    };
}
