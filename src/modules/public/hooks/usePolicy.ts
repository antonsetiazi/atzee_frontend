// src/modules/public/hooks/usePolicy.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { fetchPolicy } from "../services/policy.api";

export function usePolicy(type: string) {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        fetchPolicy(type).then(setData);
    }, [type]);

    return data;
}
