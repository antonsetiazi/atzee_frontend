// src/module/account/bank/hooks/useBanks.ts

import { useEffect, useState } from "react";
import { getBanks } from "../api/bank.api";
import type { BankAccount } from "../types/bank.types";

export function useBanks() {
    const [data, setData] = useState<BankAccount[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const res = await getBanks();
        setData(res);
    };

    useEffect(() => {
        let isMounted = true;

        const run = async () => {
            setLoading(true);

            try {
                const res = await getBanks();
                if (isMounted) setData(res);
            } finally {
                if (isMounted) setLoading(false);
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
