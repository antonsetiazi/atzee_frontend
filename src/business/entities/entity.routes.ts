// src/business/entities/entity.routes.ts

import { lazy } from "react";
import type { AppRoute } from "@/core/routing/route.types";

export const entityRoutes: AppRoute[] = [
    {
        path: "/:entity",
        element: lazy(() => import("./EntityPage")),
        permission: "entity.view",
    },
];
