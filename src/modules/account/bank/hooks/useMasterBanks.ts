// src/modules/account/bank/hooks/useMasterBanks.ts

import { useEffect, useState } from "react";
import { getMasterBanks } from "../api/master-bank.api";
import type { MasterBank } from "../types/master-bank.types";

export function useMasterBanks() {
    const [data, setData] = useState<MasterBank[]>([]);

    useEffect(() => {
        let mounted = true;

        getMasterBanks().then((res) => {
            if (mounted) {
                setData(res);
            }
        });

        return () => {
            mounted = false;
        };
    }, []);

    return { data };
}
