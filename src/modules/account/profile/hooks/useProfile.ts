// src/modules/account/profile/hooks/useProfile.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { getMe } from "../api/profile.api";

export function useProfile() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetch = async () => {
        setLoading(true);
        try {
            const res = await getMe();
            setData(res);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    return { data, loading, refetch: fetch };
}
