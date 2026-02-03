// src/core/routing/PageRoutes.tsx

import { Route, Navigate } from "react-router-dom";
import { lazy } from "react";
import PermissionGuard from "@/core/permissions/PermissionGuard";
import { usePageStore } from "@/core/ui/page/page.store";
import { pageKeyToPath } from "./page.utils";

const EntityPage = lazy(() => import("@/business/entities/EntityPage"));

export default function PageRoutes() {
    const pages = usePageStore((s) => s.pages);
    // console.log("pages", pages);

    if (Object.keys(pages).length === 0) {
        return <Route path="*" element={<Navigate to="/login" replace />} />;
    }

    return (
        <>
            {Object.values(pages).map((page) => {
                const path = pageKeyToPath(page.key, page.domain, page.entity);
                // console.log("path", path);
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
