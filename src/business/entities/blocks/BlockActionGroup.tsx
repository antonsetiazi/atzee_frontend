/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/entities/blocks/BlockActionGroup.tsx

import { useState } from "react";
import {
    httpPost,
    httpPatch,
    httpPut,
    httpDelete,
} from "@/core/http/http.client";

import { useSessionStore } from "@/core/session/session.store";
import { usePermissionStore } from "@/core/permissions/permission.store";
import Icon from "@/core/ui/icons/Icon";
import { useFeedbackStore } from "@/core/feedback/feedback.store";
import { Button } from "@/core/ui/components";
import { SmartNavigate } from "@/core/navigation/SmartNavigate";

type Props = {
    block: any;
    entityId?: string;
    entityData?: any;
};

export default function BlockActionGroup({
    block,
    entityId,
    entityData,
}: Props) {
    const reloadSession = useSessionStore((s: any) => s.reloadSession);

    const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

    const hasPermission = usePermissionStore((s) => s.has);
    const permissionLoaded = usePermissionStore((s) => s.isLoaded);

    const {
        title,
        description,
        actions = [],
        direction = "row",
        justify = "start",
        align = "center",
        gap = 12,
        wrap = true,
    } = block;

    /* ===========================
       HELPERS
    =========================== */

    const resolveUrl = (url?: string) => {
        if (!url) return undefined;
        return url.replace("{id}", entityId ?? "");
    };

    const applyAffects = async (affects?: string) => {
        if (!affects) return;

        if (affects === "session_user") {
            await reloadSession();
        }

        if (affects === "reload") {
            SmartNavigate.back();
        }
    };

    const callApiByMethod = async (
        endpoint: string,
        method: string,
        body?: any,
    ) => {
        switch (method?.toUpperCase()) {
            case "POST":
                return httpPost(endpoint, body);
            case "PATCH":
                return httpPatch(endpoint, body);
            case "PUT":
                return httpPut(endpoint, body);
            case "DELETE":
                return httpDelete(endpoint);
            default:
                return httpPost(endpoint, body);
        }
    };

    /* ===========================
       ACTION HANDLER
    =========================== */

    const handleAction = async (action: any, index: number) => {
        if (loadingIndex !== null) return;

        try {
            setLoadingIndex(index);

            // 🔹 NAVIGATE
            if (action.type === "navigate" && action.to) {
                SmartNavigate.go(resolveUrl(action.to)!);
                return;
            }

            // 🔹 API CALL
            if (action.type === "api" && action.endpoint) {
                const response = await callApiByMethod(
                    resolveUrl(action.endpoint)!,
                    action.method || "POST",
                    action.body,
                );

                useFeedbackStore.getState().push({
                    type: "success",
                    title: action.success_title || "Berhasil",
                    message:
                        response?.message ||
                        action.success_message ||
                        "Operasi berhasil dilakukan.",
                    duration: 3000,
                });

                await applyAffects(action.affects);
            }

            // 🔹 SUBMIT (biasanya di FormBlock)
            if (action.type === "submit") {
                console.warn("Submit action should be handled by FormBlock");
            }
        } finally {
            setLoadingIndex(null);
        }
    };

    /* ===========================
       LAYOUT CLASS MAPPING
    =========================== */

    const justifyClass: Record<string, string> = {
        start: "justify-start",
        center: "justify-center",
        between: "justify-between",
        around: "justify-around",
    };

    const alignClass: Record<string, string> = {
        start: "items-start",
        center: "items-center",
        stretch: "items-stretch",
    };
    // console.log("ENTITY DATA:", entityData);
    // console.log(block);
    /* ===========================
       RENDER
    =========================== */

    return (
        <div className="w-full p-8">
            {title && <h3 className="text-lg font-semibold mb-1">{title}</h3>}

            {description && (
                <p className="text-sm text-gray-500 mb-3">{description}</p>
            )}

            <div
                className={`
                    flex
                    ${direction === "column" ? "flex-col" : "flex-row"}
                    ${wrap ? "flex-wrap" : "flex-nowrap"}
                    ${justifyClass[justify]}
                    ${alignClass[align]}
                `}
                style={{ gap: `${gap}px` }}
            >
                {actions.map((action: any, idx: number) => {
                    if (action.when && entityData) {
                        const entries = Object.entries(action.when);

                        const isValid = entries.every(
                            ([field, expectedValue]) => {
                                return entityData[field] === expectedValue;
                            },
                        );

                        if (!isValid) {
                            return null;
                        }
                    }

                    if (
                        permissionLoaded &&
                        action.permission &&
                        !hasPermission(action.permission)
                    ) {
                        return null;
                    }

                    const isLoading = loadingIndex === idx;

                    return (
                        <Button
                            key={idx}
                            loading={isLoading}
                            onClick={() => handleAction(action, idx)}
                            icon={<Icon name={action.icon} />}
                        >
                            {isLoading ? "Processing..." : action.label}
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}
