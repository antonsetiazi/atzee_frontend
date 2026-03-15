// src/core/tenant/tenant.types.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Tenant {
    id: string;
    name: string;
    code?: string;
    branding?: any;
    vertical?: string;
}
