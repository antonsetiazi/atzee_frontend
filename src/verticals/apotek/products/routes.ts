import { lazy } from "react";
import type { AppRoute } from "@/core/routing/route.types";

export const apotekProductRoutes: AppRoute[] = [
    {
        path: "/apotek/:entity",
        element: lazy(() => import("./ApotekProductPage")),
        permission: "product.view",
    },
];
