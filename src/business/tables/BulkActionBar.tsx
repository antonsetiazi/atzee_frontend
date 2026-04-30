// src/business/tables/BulkActionBar.tsx

import { hasPermission } from "@/core/permissions/utils/hasPermission";
import type { BulkAction } from "./types";

interface Props {
    actions: BulkAction[];
    selectedIds: string[];
}

export default function BulkActionBar({ actions, selectedIds }: Props) {
    return (
        <div className="p-2 bg-gray-50 border-b flex gap-2">
            {actions
                .filter((a) => hasPermission(a.permission))
                .map((action) => (
                    <button
                        key={action.key}
                        className="px-3 py-1 border rounded"
                    >
                        {action.label} ({selectedIds.length})
                    </button>
                ))}
        </div>
    );
}
