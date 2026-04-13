// src/modules/withdrawal/hooks/useWithdraw.ts

import { useEffect, useState } from "react";
import { getWithdrawals } from "../services/withdraw.service";
import type { Withdrawal } from "../types/withdraw.types";

export function useWithdraw() {
    const [data, setData] = useState<Withdrawal[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const res = await getWithdrawals();
        setData(res);
    };

    useEffect(() => {
        let isMounted = true;

        const run = async () => {
            setLoading(true);

            try {
                const res = await getWithdrawals();

                if (isMounted) {
                    setData(res);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        run();

        return () => {
            isMounted = false;
        };
    }, []);

    return {
        data,
        loading,
        refetch: fetchData,
    };
}
