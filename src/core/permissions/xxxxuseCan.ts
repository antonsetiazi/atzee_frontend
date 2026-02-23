import { hasPermission } from "./xxxxpermissionGuard";

export function useCan(code: string): boolean {
    return hasPermission(code);
}
