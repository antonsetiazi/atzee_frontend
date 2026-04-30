// src/core/routing/renderers/renderRoute.tsx

import { Route } from "react-router-dom";
import type { AppRoute } from "../types/route.types";
import PrivateRoute from "../guards/PrivateRoute";
import PermissionGuard from "@/core/permissions/components/PermissionGuard";

export function renderRoute(route: AppRoute) {
    const Element = route.element;
    return (
        <Route
            key={route.path}
            path={route.path}
            element={
                <PrivateRoute>
                    <PermissionGuard permission={route.permission}>
                        <Element />
                    </PermissionGuard>
                </PrivateRoute>
            }
        />
    );
}
