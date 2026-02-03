// src/core/tenant/tenant.types.ts

export interface Tenant {
    id: string;
    name: string;
    code?: string;
}

export interface TenantState {
    tenants: Tenant[];
    activeTenant: Tenant | null;
    loading: boolean;
}
