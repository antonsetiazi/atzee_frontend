// src/engine/entities/hooks/useEntityContext.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";

export function useEntityContext(acceptContext?: boolean) {
    const location = useLocation();
    const { id } = useParams<{ id: string }>();

    return useMemo(() => {
        if (!acceptContext) return {};

        const params = new URLSearchParams(location.search);
        const ctx: Record<string, any> = {};

        params.forEach((value, key) => {
            ctx[key] = value;
        });

        if (id) {
            ctx["id"] = id;
        }

        return ctx;
    }, [location.search, acceptContext, id]);
}
