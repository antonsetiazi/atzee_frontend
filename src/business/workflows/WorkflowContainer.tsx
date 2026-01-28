import type { WorkflowSchema, WorkflowAction } from "./workflow.types";
import WorkflowBadge from "./WorkflowBadge";
import WorkflowActionRenderer from "./WorkflowActionRenderer";

interface Props {
    workflow: WorkflowSchema;
    onAction: (action: WorkflowAction) => void;
}

export default function WorkflowContainer({ workflow, onAction }: Props) {
    return (
        <div className="flex items-center gap-4">
            <WorkflowBadge status={workflow.status} />
            <WorkflowActionRenderer
                actions={workflow.actions}
                onAction={onAction}
            />
        </div>
    );
}
