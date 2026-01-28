// src/core/users/users.routes.tsx

import { lazy } from "react";
import type { AppRoute } from "@/core/routing/route.types";

export const usersRoutes: AppRoute[] = [
    {
        path: "users",
        element: lazy(() => import("./UsersPage")),
        permission: "core.users.view",
    },
];
