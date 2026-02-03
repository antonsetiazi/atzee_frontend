// src/core/routing/page.utils.ts
export function pageKeyToPath(key: string, domain: string, entity: string) {
    const parts = key.split(".");
    const action = parts.at(-1); // ambil terakhir
    const resource = entity.replaceAll("_", "-"); // normalizeResource

    switch (action) {
        case "list":
            return `/${domain}/${resource}`;
        case "create":
            return `/${domain}/${resource}/create`;
        case "edit":
            return `/${domain}/${resource}/:id/edit`;
        case "detail":
            return `/${domain}/${resource}/:id`;
        default:
            return `/${domain}/${resource}/${action}`;
    }
}
