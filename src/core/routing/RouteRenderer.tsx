// src/core/routing/RouteRenderer.tsx

import { Route } from "react-router-dom";
import type { AppRoute } from "./route.types";
import PrivateRoute from "./PrivateRoute";
import PermissionGuard from "@/core/permissions/PermissionGuard";

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
