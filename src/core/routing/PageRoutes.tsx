// src/core/routing/PageRoutes.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Route } from "react-router-dom";
import { lazy } from "react";
import PermissionGuard from "@/core/permissions/PermissionGuard";

const EntityPage = lazy(() => import("@/business/entities/EntityPage"));

export function buildPageRoutes(pages: any) {
    if (!pages || Object.keys(pages).length === 0) {
        return null;
    }

    return Object.values(pages).map((page: any) => (
        <Route
            key={page.key}
            path={page.path}
            element={
                <PermissionGuard permission={page.permissions?.[0]}>
                    <EntityPage entityKey={page.key} />
                </PermissionGuard>
            }
        />
    ));
}
