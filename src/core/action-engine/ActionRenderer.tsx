// src/core/action-engine/ActionRenderer.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { EntityAction } from "@/core/schema/action.schema";
import { usePermission } from "@/core/permissions/hooks/usePermission";
import { useNavigate } from "react-router-dom";
import { useFeedbackStore } from "@/core/feedback/feedback.store";
import { useConfirmStore } from "@/core/confirm/confirm.store";
import { iconRegistry } from "@/core/ui/icons/icon.registry";
import { clearEntityCacheByPrefix } from "@/engine/entities/cache/entity.cache";
import { submitForm } from "@/core/form-engine/form.submit";

interface Props<T> {
    entity: string;
    actions: EntityAction<T>[];
    row?: T;
    context: any;
    detail_as_state: boolean;
}

export function ActionRenderer<T>({
    entity,
    actions,
    row,
    context,
    detail_as_state,
}: Props<T>) {
    const { has } = usePermission();
    const navigate = useNavigate();
    const feedback = useFeedbackStore();
    const confirm = useConfirmStore((s) => s.confirm);

    const resolvePath = (template: string, row: any, context: any) => {
        return template.replace(/\{([^}]+)\}/g, (_, field) => {
            let val;

            if (field === "parent_id") {
                val = context?.parent_id;
            } else {
                val = row?.[field] ?? context?.[field];
            }

            if (val === undefined) {
                console.warn(`ActionRenderer: unresolved field "${field}"`);
                return "";
            }

            return String(val);
        });
    };

    return (
        <div className="flex items-center gap-2">
            {actions.map((action, idx) => {
                if (action.permission && !has(action.permission)) return null;
                if (!matchWhen(action.when, row)) return null;

                const onClick = async () => {
                    // 🔥 logic kamu tetap sama (tidak diubah)
                    if (action.confirm) {
                        const ok = await confirm({
                            title: action.confirm.title,
                            message: action.confirm.message,
                            level: action.confirm.level,
                        });

                        if (!ok) return;
                    }

                    if (action.type === "navigate" && action.to) {
                        const path = row
                            ? resolvePath(action.to, row, context)
                            : action.to;

                        if (detail_as_state === true) {
                            navigate(path, {
                                state: { initialValues: row },
                            });
                        } else {
                            navigate(path);
                        }

                        return;
                    }

                    // ========================================
                    // 🗑 DELETE (FIXED)
                    // ========================================

                    if (action.type === "delete" && action.endpoint) {
                        try {
                            if (
                                !row ||
                                typeof row !== "object" ||
                                !("id" in row)
                            ) {
                                console.warn("Row does not have id");
                                return;
                            }

                            const payload = {
                                id: row?.id,
                            };

                            await submitForm(payload, {
                                submit_to: action.endpoint,
                                method: "POST",
                            });

                            // ✅ DEFAULT refresh (WAJIB)
                            clearEntityCacheByPrefix(`table:${entity}`);

                            // ✅ OPTIONAL refresh dari backend
                            if (action.refresh_cache?.length) {
                                action.refresh_cache.forEach((prefix) => {
                                    clearEntityCacheByPrefix(prefix);
                                });
                            }

                            window.dispatchEvent(
                                new CustomEvent("entity:refresh", {
                                    detail: { entity },
                                }),
                            );
                        } catch (err: any) {
                            console.error("Delete failed:", err);

                            feedback.push({
                                type: "error",
                                title: "Error",
                                message: err?.message || "Gagal menghapus data",
                            });
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
                    }
                };

                const uniqueKey = `${action.key}-${idx}`;
                const isDanger = action.type === "delete";
                const Icon = action.icon ? iconRegistry[action.icon] : null;

                return (
                    <button
                        key={uniqueKey}
                        onClick={onClick}
                        title={action.label}
                        className="inline-flex items-center justify-center
                               rounded-xl px-3 py-1.5 text-sm font-medium
                               transition-all duration-150"
                        style={{
                            color: isDanger
                                ? "var(--color-danger)"
                                : "var(--text-secondary)",
                            background: "transparent",
                            border: "1px solid transparent",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                                "var(--color-surface-alt)";
                            e.currentTarget.style.border =
                                "1px solid var(--color-border)";
                            e.currentTarget.style.color = isDanger
                                ? "var(--color-danger)"
                                : "var(--text-primary)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.border =
                                "1px solid transparent";
                            e.currentTarget.style.color = isDanger
                                ? "var(--color-danger)"
                                : "var(--text-secondary)";
                        }}
                    >
                        {Icon ? <Icon className="h-5 w-5" /> : action.label}
                    </button>
                );
            })}
        </div>
    );
}

function matchWhen(when: Record<string, any> | undefined, row: any) {
    if (!when) return true;
    if (!row) return false;

    return Object.entries(when).every(([key, expected]) => {
        const actual = row[key];

        // support IN condition
        if (Array.isArray(expected)) {
            return expected.includes(actual);
        }

        return actual === expected;
    });
}
