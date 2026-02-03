// src/business/workflows/WorkflowActionRenderer.tsx

import type { WorkflowAction } from "./workflow.types";
import { usePermission } from "@/core/permissions/usePermission";

interface Props {
    actions: WorkflowAction[];
    onAction: (action: WorkflowAction) => void;
}

export default function WorkflowActionRenderer({ actions, onAction }: Props) {
    const { has } = usePermission();

    function handleClick(action: WorkflowAction) {
        if (action.confirm) {
            const ok = confirm(action.confirm);
            if (!ok) return;
        }
        onAction(action);
    }

    function getActionClass(action: WorkflowAction) {
        const base =
            "px-4 py-1.5 rounded-md text-sm font-medium border transition-colors " +
            "focus:outline-none focus:ring-2 focus:ring-offset-1";

        switch (action.key) {
            case "confirm":
            case "approve":
            case "post":
                return `${base} bg-blue-600 text-white border-blue-600 hover:bg-blue-700 focus:ring-blue-500`;

            case "cancel":
            case "reject":
            case "void":
                return `${base} text-red-600 border-red-500 hover:bg-red-50 focus:ring-red-400`;

            default:
                return `${base} text-gray-700 border-gray-300 hover:bg-gray-100 focus:ring-gray-400`;
        }
    }

    if (!actions.length) return null;

    return (
        <div className="flex gap-2">
            {actions.map((action) => {
                if (action.permission && !has(action.permission)) {
                    return null;
                }

                return (
                    <button
                        key={action.key}
                        className={getActionClass(action)}
                        onClick={() => handleClick(action)}
                    >
                        {action.label}
                    </button>
                );
            })}
        </div>
    );
}
