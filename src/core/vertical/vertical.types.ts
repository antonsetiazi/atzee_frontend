import type { AppRoute } from "@/core/routing/route.types";
import type { MenuItem } from "@/core/ui/menu/menu.types";

export interface VerticalModule {
    name: string;
    routes?: AppRoute[];
    menus?: MenuItem[];
}
