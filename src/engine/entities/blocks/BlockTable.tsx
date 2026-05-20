// src/engine/entities/blocks/BlockTable.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo, useState } from "react";
import DataTable from "@/core/ui/components/data_table/DataTable";
import { SmartNavigate } from "@/core/navigation/SmartNavigate";
import { formatValue } from "@/shared/utils/formatValue";
import { getTextSize, getTextStyle, getTextWeight } from "../utils/tableStyle";

interface Props {
    block: any;
    data: any[]; // 🔥 Pure data from Page
    total?: number; // optional
    entityKey: string;
    id?: string;
}

export default function BlockTable({ block, data = [], total }: Props) {
    // console.log(block);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const pageSize = 10;

    const safeData = useMemo(() => {
        return Array.isArray(data) ? data : [];
    }, [data]);

    const filteredData = useMemo(() => {
        if (!search.trim()) {
            return safeData;
        }

        const keyword = search.toLowerCase();

        return safeData.filter((row: any) => {
            return block.columns.some((col: any) => {
                const value = row[col.key];

                if (value === null || value === undefined) {
                    return false;
                }

                return String(value).toLowerCase().includes(keyword);
            });
        });
    }, [safeData, search, block.columns]);

    const columns = useMemo(() => {
        return block.columns.map((col: any) => ({
            key: col.key,
            title: col.label,
            sortable: true,
            align: col.align,
            width: col.width,
            render: (row: any) => {
                const value = row[col.key];
                let displayValue: any = value;

                /**
                 * BOOLEAN UI
                 */
                if (typeof value === "boolean") {
                    switch (col.boolean_style) {
                        case "yes_no":
                            displayValue = value ? "Yes" : "No";
                            break;

                        case "active_inactive":
                            displayValue = value ? "Active" : "Inactive";
                            break;

                        case "enabled_disabled":
                            displayValue = value ? "Enabled" : "Disabled";
                            break;

                        case "check":
                            displayValue = value ? "✓" : "✗";
                            break;

                        default:
                            displayValue = value ? "Yes" : "No";
                    }
                } else {
                    displayValue = formatValue(value, {
                        format: col.format,
                        currency: col.currency,
                    });
                }

                return (
                    <span
                        className={` ${getTextStyle(col.text_style)} ${getTextSize(col.size)} ${getTextWeight(col.weight)} `}
                    >
                        {displayValue}
                    </span>
                );
            },
        }));
    }, [block.columns]);

    const onRowClick = block.on_row_click
        ? (row: any) => {
              const target = block.on_row_click.replace("{id}", row.id);

              SmartNavigate.go(target);
          }
        : undefined;

    const paginatedData = useMemo(() => {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        return filteredData.slice(start, end);
    }, [filteredData, page, pageSize]);

    return (
        <div className="overflow-hidden">
            <DataTable
                title={block.title}
                subtitle={block.description}
                columns={columns}
                data={paginatedData}
                loading={false}
                searchable
                searchValue={search}
                onSearchChange={(value) => {
                    setSearch(value);
                    setPage(1);
                }}
                mobileVariant="card"
                emptyTitle={block.empty_title || "No data available"}
                emptyDescription={block.empty_description || "There is no available data."}
                onRowClick={onRowClick}
                pagination={{
                    page,
                    totalPages: Math.ceil((total ?? filteredData.length) / pageSize),
                    totalItems: total ?? filteredData.length,
                    onPageChange: setPage,
                }}
            />
        </div>
    );
}
