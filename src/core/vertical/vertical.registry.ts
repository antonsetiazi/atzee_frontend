import type { VerticalModule } from "./vertical.types";

const verticals: VerticalModule[] = [];

export function registerVertical(module: VerticalModule) {
    verticals.push(module);
}

export function getVerticalRoutes() {
    return verticals.flatMap((v) => v.routes ?? []);
}

export function getVerticalMenus() {
    return verticals.flatMap((v) => v.menus ?? []);
}
