// src/core/activity/hooks/useActivityFilters.ts

import { useMemo, useState } from "react";

export function useActivityFilters() {
    const [search, setSearch] = useState("");
    const [severity, setSeverity] = useState("");
    const [ordering, setOrdering] = useState("-created_at");

    const filters = useMemo(() => {
        return {
            search,
            severity,
            ordering,
        };
    }, [search, severity, ordering]);

    return {
        filters,

        search,
        setSearch,

        severity,
        setSeverity,

        ordering,
        setOrdering,
    };
}
