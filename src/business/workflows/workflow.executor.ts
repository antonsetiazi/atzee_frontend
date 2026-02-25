// src/business/workflows/workflow.executor.ts

import type { WorkflowAction } from "./workflow.types";
import {
    httpPost,
    httpPatch,
    httpDelete,
    httpGet,
} from "@/core/http/http.client";

export async function executeWorkflowAction(
    action: WorkflowAction,
    entityId?: string,
) {
    const replaceId = (value?: string) =>
        value?.replace("{id}", entityId ?? "");

    switch (action.type) {
        case "navigate": {
            if (!action.to) return;

            const path = replaceId(action.to);
            if (!path) return;

            window.location.href = path;
            return;
        }

        case "patch": {
            if (!action.endpoint) return;

            await httpPatch(replaceId(action.endpoint)!);
            window.location.reload();
            return;
        }

        case "delete": {
            if (!action.endpoint) return;

            await httpDelete(replaceId(action.endpoint)!);
            window.location.reload();
            return;
        }

        case "get": {
            if (!action.endpoint) return;

            await httpGet(replaceId(action.endpoint)!);
            window.location.reload();
            return;
        }

        /* =========================
           API ACTIONS
        ========================== */
        case "post": {
            if (!action.endpoint) return;

            await httpPost(replaceId(action.endpoint)!);
            window.location.reload();
            return;
        }

        default:
            console.warn("Unknown workflow action:", action.type);
    }
}
