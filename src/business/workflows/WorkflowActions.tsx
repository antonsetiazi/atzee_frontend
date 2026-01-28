import { Can } from "../../core/permissions/Can";
import type { WorkflowAction } from "./types";

interface Props {
    actions: WorkflowAction[];
    onAction: (actionKey: string) => void;
}

export default function WorkflowActions({ actions, onAction }: Props) {
    return (
        <div className="flex gap-2">
            {actions.map((action) => (
                <Can key={action.key} permission={action.permission}>
                    <button
                        onClick={() => {
                            if (action.confirm) {
                                if (
                                    !confirm(`Are you sure to ${action.label}?`)
                                )
                                    return;
                            }
                            onAction(action.key);
                        }}
                        className={getButtonClass(action.variant)}
                    >
                        {action.label}
                    </button>
                </Can>
            ))}
        </div>
    );
}

function getButtonClass(variant: WorkflowAction["variant"] = "primary") {
    switch (variant) {
        case "danger":
            return "px-3 py-2 bg-red-600 text-white rounded";
        case "secondary":
            return "px-3 py-2 bg-gray-500 text-white rounded";
        default:
            return "px-3 py-2 bg-blue-600 text-white rounded";
    }
}
