// src/modules/workflow/components/WorkflowBadge.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { WorkflowStatus } from "@/engine/workflows/types/workflow.types";

interface Props {
    status: WorkflowStatus;
    entityData?: any;
}

const colorMap: Record<string, string> = {
    gray: "bg-gray-200 text-gray-700",
    blue: "bg-blue-200 text-blue-700",
    green: "bg-green-200 text-green-700",
    red: "bg-red-200 text-red-700",
    yellow: "bg-yellow-200 text-yellow-700",
};

function formatStatus(value: string) {
    return value
        .replaceAll("_", " ")
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function WorkflowBadge({ status, entityData }: Props) {
    const value = entityData?.[status.key];

    if (!value) return null;

    const colorClass = colorMap[status.color ?? "gray"];

    return (
        <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${colorClass}`}
        >
            {formatStatus(value)}
        </span>
    );
}
