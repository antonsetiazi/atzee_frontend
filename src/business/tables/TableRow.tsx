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
        <tr
            className="transition-colors duration-150"
            style={{
                borderBottom: "1px solid var(--color-border)",
            }}
            onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--color-surface-alt)")
            }
            onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
            }
        >
            {schema.columns.map((col) => (
                <td
                    key={col.key}
                    className="px-4 py-3 text-sm"
                    style={{
                        color: "var(--text-primary)",
                    }}
                >
                    {row[col.key] !== undefined &&
                    row[col.key] !== null &&
                    row[col.key] !== "" ? (
                        String(row[col.key])
                    ) : (
                        <span
                            style={{
                                color: "var(--text-secondary)",
                            }}
                        >
                            —
                        </span>
                    )}
                </td>
            ))}

            {schema.actions && (
                <td className="px-4 py-3">
                    <div className="flex justify-end">
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
