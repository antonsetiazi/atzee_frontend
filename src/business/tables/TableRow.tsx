/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/tables/TableRow.tsx

import type { EntityTableSchema } from "./table.types";
import { ActionRenderer } from "@/business/actions/ActionRenderer";

interface Props {
    entity: string;
    row: any;
    schema: EntityTableSchema;
    context: {
        navigate: (path: string) => void;
        refresh: () => void;
        [key: string]: any;
    };
}

export default function TableRow({ entity, row, schema, context }: Props) {
    return (
        <tr className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
            {schema.columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-sm text-gray-700">
                    {String(row[col.key] ?? "-")}
                </td>
            ))}

            {schema.actions && (
                <td className="px-4 py-3 text-center">
                    <div className="flex justify-center">
                        <ActionRenderer
                            entity={entity}
                            actions={schema.actions}
                            row={row}
                            context={context}
                            detail_as_state={schema.detail_as_state}
                        />
                    </div>
                </td>
            )}
        </tr>
    );
}
