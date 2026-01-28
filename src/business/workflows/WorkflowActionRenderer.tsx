// src/business/workflows/WorkflowActionRenderer.tsx

import type { WorkflowAction } from "./workflow.types";
import { usePermission } from "@/core/permissions/usePermission";

interface Props {
    actions: WorkflowAction[];
    onAction: (action: WorkflowAction) => void;
}

export default function WorkflowActionRenderer({ actions, onAction }: Props) {
    const { has } = usePermission();

    return (
        <div className="flex gap-2">
            {actions.map((action) => {
                if (action.permission && !has(action.permission)) {
                    return null;
                }

                return (
                    <button
                        key={action.key}
                        className="px-3 py-1 border rounded text-sm hover:bg-gray-100"
                        onClick={() => {
                            if (action.confirm) {
                                const ok = confirm(action.confirm);
                                if (!ok) return;
                            }
                            onAction(action);
                        }}
                    >
                        {action.label}
                    </button>
                );
            })}
        </div>
    );
}
