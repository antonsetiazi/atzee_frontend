/* eslint-disable @typescript-eslint/no-explicit-any */
// src/core/tenant/tenant.types.ts

export interface Tenant {
    id: string;
    name: string;
    code?: string;
    branding?: any;
}

export interface TenantState {
    tenants: Tenant[];
    activeTenant: Tenant | null;
    loading: boolean;
}
