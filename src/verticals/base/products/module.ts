import { lazy } from "react";
import { registerModule } from "@/core/routing/moduleRegistry";

registerModule({
    name: "products",
    routes: [
        {
            path: "/products",
            element: lazy(() => import("./ProductPage")),
            permission: "products.view",
        },
    ],
});
