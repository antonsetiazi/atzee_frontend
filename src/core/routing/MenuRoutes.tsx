// src/core/routing/DynamicRoutes.tsx
import type { ReactNode } from "react";
import { Route } from "react-router-dom";
import PermissionGuard from "@/core/permissions/PermissionGuard";
import { lazy } from "react";
import type { MenuItem } from "@/core/ui/menu/menu.types";

// EntityPage engine (CoreEntityPage wrapper)
const EntityPage = lazy(() => import("@/business/entities/EntityPage"));

/**
 * Generate JSX Routes dari menu backend.
 * Recursive untuk children.
 */
export function MenuRoutes(menus: MenuItem[]): ReactNode[] {
    const routes: ReactNode[] = [];
    // console.log("1. DynamicRoutes | menus", menus);
    const traverse = (items: MenuItem[]) => {
        // console.log("2. DynamicRoutes | items", items);
        items.forEach((menu) => {
            if (menu.route) {
                // console.log("menu.route:", menu.route);
                routes.push(
                    <Route
                        key={menu.key}
                        path={menu.route}
                        element={
                            <PermissionGuard permission={menu.permission}>
                                <EntityPage entityKey={menu.key} />
                            </PermissionGuard>
                        }
                    />,
                );
            }

            // Recursive children
            if (menu.children?.length) {
                traverse(menu.children);
            }
        });
    };

    traverse(menus);

    return routes;
}
