import { registerMenu } from "../../../core/ui/menu/menuRegistry";

registerMenu([
    {
        key: "products",
        label: "Products",
        path: "/products",
        permission: "products.view",
    },
]);
