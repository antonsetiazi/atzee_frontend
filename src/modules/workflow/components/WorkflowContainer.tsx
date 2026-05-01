// src/modules/workflow/components/WorkflowContainer.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import type {
    WorkflowSchema,
    WorkflowAction,
} from "@/engine/workflows/types/workflow.types";
import WorkflowBadge from "./WorkflowBadge";
import WorkflowActionRenderer from "./WorkflowActionRenderer";

interface Props {
    workflow: WorkflowSchema;
    entityData?: any;
    onAction: (action: WorkflowAction) => void;
}

export default function WorkflowContainer({
    workflow,
    entityData,
    onAction,
}: Props) {
    return (
        <div className="flex flex-col gap-3">
            {/* Status */}
            <div className="flex items-center gap-3">
                <div className="text-xs text-gray-400 uppercase tracking-wide">
                    {workflow.status.label}
                </div>
                <WorkflowBadge
                    status={workflow.status}
                    entityData={entityData}
                />
            </div>

            {/* Actions */}
            <WorkflowActionRenderer
                actions={workflow.actions}
                entityData={entityData}
                onAction={onAction}
            />
        </div>
    );
}
