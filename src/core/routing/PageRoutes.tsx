// src/core/routing/PageRoutes.tsx

import { Route } from "react-router-dom";
import { lazy } from "react";
import PermissionGuard from "@/core/permissions/PermissionGuard";
import { usePageStore } from "@/core/ui/page/page.store";

const EntityPage = lazy(() => import("@/business/entities/EntityPage"));

function pageKeyToPath(key: string, entity: string) {
    const [, action] = key.split(".");

    switch (action) {
        case "list":
            return `/${entity}`;
        case "create":
            return `/${entity}/create`;
        case "edit":
            return `/${entity}/:id/edit`; // param id untuk edit
        default:
            return `/${entity}/${action}`;
    }
}

export default function PageRoutes() {
    const pages = usePageStore((s) => s.pages);

    // console.log("PageRoutes | pages:", pages);

    if (!pages || Object.keys(pages).length === 0) {
        return null; // ⬅️ PENTING
    }

    return (
        <>
            {Object.values(pages).map((page) => {
                const path = pageKeyToPath(page.key, page.entity);

                return (
                    <Route
                        key={page.key}
                        path={path}
                        element={
                            <PermissionGuard permission={page.permissions?.[0]}>
                                <EntityPage entityKey={page.key} />
                            </PermissionGuard>
                        }
                    />
                );
            })}
        </>
    );
}
