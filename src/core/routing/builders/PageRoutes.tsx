// src/core/routing/builders/PageRoutes.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Route } from "react-router-dom";
import { lazy } from "react";
import PermissionGuard from "@/core/permissions/components/PermissionGuard";
import PageMetaWrapper from "../wrappers/PageMetaWrapper";

const EntityPage = lazy(() => import("@/engine/entities/pages/EntityPage"));

function normalizeRoutePath(path: string) {
    if (!path) return path;

    // convert {id} => :id
    return path.replace(/\{(\w+)\}/g, ":$1");
}

export function buildPageRoutes(pages: any) {
    if (!pages || Object.keys(pages).length === 0) {
        return null;
    }

    return Object.values(pages).map((page: any) => {
        const routePath = normalizeRoutePath(page.path);

        return (
            <Route
                key={page.key}
                path={routePath}
                element={
                    <PermissionGuard permission={page.permissions?.[0]}>
                        <PageMetaWrapper meta={page.meta}>
                            <EntityPage entityKey={page.key} />
                        </PageMetaWrapper>
                    </PermissionGuard>
                }
            />
        );
    });
}
