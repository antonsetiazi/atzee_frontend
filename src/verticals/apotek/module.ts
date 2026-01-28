import { registerVertical } from "@/core/vertical/vertical.registry";
import { apotekProductRoutes } from "./products/routes";
import type { MenuItem } from "@/core/ui/menu/menu.types";
import { uiOverrideRegistry } from "@/core/vertical/uiOverride.registry";
import ApotekProductPage from "./products/ApotekProductPage";

const menus: MenuItem[] = [
    {
        id: "apotek",
        label: "Apotek",
        icon: "pill",
        children: [
            {
                id: "apotek.products",
                label: "Products",
                path: "/apotek/products",
                permission: "product.view",
            },
        ],
    },
];

/**
 * 1️⃣ Register vertical (routes + menus)
 */
registerVertical({
    name: "apotek",
    routes: apotekProductRoutes,
    menus,
});

/**
 * 2️⃣ Register UI override (OPTIONAL)
 */
uiOverrideRegistry.register({
    vertical: "apotek",
    overrides: [
        {
            target: "entity-page",
            key: "products",
            component: ApotekProductPage,
        },
    ],
});
