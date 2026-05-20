// src/core/ui/components/data_table/hooks/useDataTable.ts

import { useMemo, useState } from "react";

interface Options {
    initialPage?: number;

    initialSearch?: string;
}

export default function useDataTable(options?: Options) {
    const [search, setSearch] = useState(options?.initialSearch || "");

    const [page, setPage] = useState(options?.initialPage || 1);

    function reset() {
        setSearch("");

        setPage(1);
    }

    const pagination = useMemo(() => {
        return {
            page,

            totalPages: 1,

            totalItems: 0,

            onPageChange: setPage,
        };
    }, [page]);

    return {
        /* SEARCH */

        search,
        setSearch,

        /* PAGINATION */

        page,
        setPage,

        pagination,

        /* HELPERS */

        reset,
    };
}
