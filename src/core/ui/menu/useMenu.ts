import { getMenu } from "./menuRegistry";
import { usePermission } from "../../permissions/usePermission";
import type { MenuItem } from "./types";

function filterMenu(
    items: MenuItem[],
    can: (p?: string) => boolean,
): MenuItem[] {
    return items
        .filter((item) => can(item.permission))
        .map((item) => ({
            ...item,
            children: item.children
                ? filterMenu(item.children, can)
                : undefined,
        }));
}

export function useMenu() {
    const { can } = usePermission();
    return filterMenu(getMenu(), can);
}
