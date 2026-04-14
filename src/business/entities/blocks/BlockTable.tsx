/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/entities/blocks/BlockTable.tsx

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdaptiveTableRenderer from "../../tables/AdaptiveTableRenderer";
import type { TableContext } from "../../tables/table.context";

interface Props {
    block: any;
    data: any[]; // 🔥 Pure data from Page
    total?: number; // optional
    entityKey: string;
    id?: string;
}

export default function BlockTable({
    block,
    data = [],
    total,
    entityKey,
    id,
}: Props) {
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const safeData = useMemo(() => {
        return Array.isArray(data) ? data : [];
    }, [data]);

    const paginatedData = useMemo(() => {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        return safeData.slice(start, end);
    }, [safeData, page, pageSize]);

    const tableContext = useMemo<TableContext>(
        () => ({
            navigate: (path: string) => navigate(path),
            refresh: () => {}, // 🔥 no-op (page-level refresh only)
            entityKey,
            parent_id: id,
        }),
        [navigate, entityKey, id],
    );

    return (
        <div
            className="group relative overflow-hidden rounded-2xl transition-all duration-200"
            style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
            }}
        >
            {/* Accent Line (hover effect like ListView) */}
            <div
                className="absolute left-0 top-0 h-full w-1 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                    background: "var(--color-primary)",
                }}
            />

            {/* Body */}
            <div className="px-6 py-5">
                {safeData.length > 0 ? (
                    <div className="overflow-hidden rounded-xl">
                        <AdaptiveTableRenderer
                            entity={entityKey}
                            schema={block}
                            data={paginatedData}
                            loading={false}
                            total={total ?? safeData.length}
                            page={page}
                            pageSize={pageSize}
                            context={tableContext}
                            onPageChange={setPage}
                            onPageSizeChange={(size: number) => {
                                setPageSize(size);
                                setPage(1);
                            }}
                            onSortChange={() => {}}
                            onSearch={() => {}}
                        />
                    </div>
                ) : (
                    <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-10 text-center">
                        <div className="text-base font-semibold text-gray-700">
                            {block.empty_title || "No data available"}
                        </div>

                        {block.empty_description && (
                            <div className="mt-2 text-sm text-gray-500">
                                {block.empty_description}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
