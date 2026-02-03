// src/core/dashboard/widgets/TableWidget.tsx

import type { TableValue } from "../dashboard.types";

interface Props {
    title: string;
    value: TableValue;
}

export default function TableWidget({ title, value }: Props) {
    const { columns, rows } = value;

    return (
        <div
            className="
                h-full
                rounded-xl
                border border-gray-200
                bg-white
                shadow-sm
            "
        >
            {/* Header */}
            <div className="border-b border-gray-100 px-5 py-4">
                <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-0">
                    <thead>
                        <tr className="bg-gray-50">
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    className="
                                        px-5
                                        py-3
                                        text-left
                                        text-xs
                                        font-semibold
                                        uppercase
                                        tracking-wide
                                        text-gray-500
                                        border-b
                                        border-gray-200
                                    "
                                >
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {rows.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="px-5 py-6 text-center text-sm text-gray-400"
                                >
                                    No data available
                                </td>
                            </tr>
                        ) : (
                            rows.map((row, idx) => (
                                <tr
                                    key={row.id ?? idx}
                                    className="
                                        transition
                                        hover:bg-gray-50
                                    "
                                >
                                    {columns.map((col) => (
                                        <td
                                            key={col.key}
                                            className="
                                                px-5
                                                py-3
                                                text-sm
                                                text-gray-700
                                                border-b
                                                border-gray-100
                                                whitespace-nowrap
                                            "
                                        >
                                            {String(row[col.key] ?? "-")}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
