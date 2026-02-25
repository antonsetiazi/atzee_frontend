/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/workflows/WorkflowActionRenderer.tsx

import type { WorkflowAction } from "./workflow.types";
import { usePermission } from "@/core/permissions/usePermission";

function evaluateWhen(when: Record<string, any> | undefined, entityData: any) {
    if (!when) return true;
    if (!entityData) return false;

    return Object.entries(when).every(([key, value]) => {
        if (key.endsWith("__in")) {
            const realKey = key.replace("__in", "");
            return value.includes(entityData?.[realKey]);
        }

        return entityData?.[key] === value;
    });
}

interface Props {
    actions: WorkflowAction[];
    entityData?: any;
    onAction: (action: WorkflowAction) => void;
}

export default function WorkflowActionRenderer({
    actions,
    entityData,
    onAction,
}: Props) {
    const { has } = usePermission();

    function handleClick(action: WorkflowAction) {
        if (action.confirm) {
            const ok = window.confirm(
                `${action.confirm.title}\n\n${action.confirm.message}`,
            );
            if (!ok) return;
        }
        onAction(action);
    }

    function getActionVariant(action: WorkflowAction) {
        switch (action.key) {
            case "confirm":
            case "approve":
            case "post":
            case "pay":
                return "primary";

            case "cancel":
            case "reject":
            case "void":
                return "danger";

            default:
                return "secondary";
        }
    }

    function getActionClass(action: WorkflowAction) {
        const base =
            "px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 " +
            "focus:outline-none focus:ring-2 focus:ring-offset-2";

        const variant = getActionVariant(action);

        switch (variant) {
            case "primary":
                return (
                    base +
                    " bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md hover:shadow-lg hover:scale-[1.02] focus:ring-blue-400"
                );

            case "danger":
                return (
                    base +
                    " bg-white text-red-600 border border-red-200 hover:bg-red-50 hover:border-red-300 focus:ring-red-300"
                );

            default:
                return (
                    base +
                    " bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 focus:ring-gray-300"
                );
        }
    }

    const visibleActions = actions.filter((action) => {
        if (action.permission && !has(action.permission)) return false;
        if (!evaluateWhen(action.when, entityData)) return false;
        return true;
    });

    if (!visibleActions.length) return null;

    return (
        <div className="flex gap-2">
            {actions.map((action) => {
                if (action.permission && !has(action.permission)) {
                    return null;
                }

                if (!evaluateWhen(action.when, entityData)) {
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
