import type { MenuItem } from "./types";

const menuRegistry: MenuItem[] = [];

export function registerMenu(items: MenuItem[]) {
    menuRegistry.push(...items);
}

export function getMenu() {
    return menuRegistry;
}
