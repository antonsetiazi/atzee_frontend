/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/actions/ActionRenderer.tsx

import type { EntityAction } from "./action.types";
import { usePermission } from "@/core/permissions/usePermission";
import { useNavigate } from "react-router-dom";
import { httpDelete } from "@/core/http/http.client";
import { useFeedbackStore } from "@/core/feedback/feedback.store";
import { clearEntityCacheByPrefix } from "../entities/entity.cache";
import { useConfirmStore } from "@/core/confirm/confirm.store";

interface Props<T> {
    actions: EntityAction<T>[];
    row?: T;
    context: any;
}

export function ActionRenderer<T>({ actions, row, context }: Props<T>) {
    const { has } = usePermission();
    const navigate = useNavigate();
    const feedback = useFeedbackStore();
    const confirm = useConfirmStore((s) => s.confirm);

    const resolvePath = (template: string, row: any) => {
        return template.replace(/\{(\w+)\}/g, (_, field) => {
            const val = row?.[field];
            if (val === undefined) {
                console.warn(`ActionRenderer: row.${field} is undefined`);
                return "";
            }
            return String(val);
        });
    };

    return (
        <div className="flex items-center gap-1">
            {actions.map((action, idx) => {
                if (action.permission && !has(action.permission)) return null;
                if (action.visible && !action.visible(row)) return null;

                const onClick = async () => {
                    if (action.confirm) {
                        const ok = await confirm({
                            title: action.confirm.title,
                            message: action.confirm.message,
                            level: action.confirm.level,
                        });

                        if (!ok) return;
                    }

                    // Navigasi dengan support template {field}
                    if (action.type === "navigate" && action.to) {
                        const path = row
                            ? resolvePath(action.to, row)
                            : action.to;
                        navigate(path);
                        return;
                    }

                    // Delete
                    if (action.type === "delete" && action.endpoint) {
                        const url = resolvePath(action.endpoint, row);
                        try {
                            await httpDelete(url);

                            feedback.push({
                                type: "success",
                                title: "Deleted",
                                message: `Data berhasil dihapus`,
                            });

                            const entityPrefix =
                                context.entityKey?.split(".")[0];

                            if (entityPrefix) {
                                clearEntityCacheByPrefix(entityPrefix);
                            }

                            // refresh table
                            context.refresh();
                        } catch (err) {
                            console.error("Delete failed:", err);
                            alert("Failed to delete. See console for details.");
                        }
                        return;
                    }

                    if (typeof action.execute === "function") {
                        await action.execute({
                            ...context,
                            row,
                            navigate,
                            refresh: () => {},
                        });
                    } else {
                        console.warn(
                            `Action ${action.label} has no execute function`,
                        );
                    }
                };

                const uniqueKey = `${action.key}-${idx}`;

                const isDanger = action.type === "delete";

                return (
                    <button
                        key={uniqueKey}
                        onClick={onClick}
                        className={`
                            inline-flex items-center
                            rounded-md px-2 py-1
                            text-xs font-medium
                            transition
                            ${
                                isDanger
                                    ? "text-red-600 hover:bg-red-50"
                                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                            }
                        `}
                        title={action.label}
                    >
                        {action.label}
                    </button>
                );
            })}
        </div>
    );
}
