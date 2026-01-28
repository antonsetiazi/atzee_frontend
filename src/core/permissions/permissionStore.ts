export type Permission = string;

let currentPermissions = new Set<Permission>([
    "products.view",
    "products.create",
    "products.update",
    //"products.delete",  → sengaja tidak ada
]);

export function getPermissions(): Set<Permission> {
    return currentPermissions;
}

export function setPermissions(perms: Permission[]) {
    currentPermissions = new Set(perms);
}
