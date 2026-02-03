// src/business/workflows/WorkflowContainers.tsx

import type { WorkflowSchema, WorkflowAction } from "./workflow.types";
import WorkflowBadge from "./WorkflowBadge";
import WorkflowActionRenderer from "./WorkflowActionRenderer";

interface Props {
    workflow: WorkflowSchema;
    onAction: (action: WorkflowAction) => void;
}

export default function WorkflowContainer({ workflow, onAction }: Props) {
    return (
        <div className="flex flex-col gap-3">
            {/* Status */}
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Status:</span>
                <WorkflowBadge status={workflow.status} />
            </div>

            {/* Actions */}
            <WorkflowActionRenderer
                actions={workflow.actions}
                onAction={onAction}
            />
        </div>
    );
}
