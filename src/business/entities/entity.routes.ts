// src/business/entities/entity.routes.ts

import { lazy } from "react";
import type { AppRoute } from "@/core/routing/route.types";

export const entityRoutes: AppRoute[] = [
    {
        path: "/:entity",
        element: lazy(() => import("./pages/EntityPage")),
        permission: "entity.view",
    },
];
