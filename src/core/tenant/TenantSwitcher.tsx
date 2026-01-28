import { useEffect } from "react";
import { useTenantStore } from "./tenant.store";

export default function TenantSwitcher() {
    const { tenants, activeTenant, loadTenants, setActiveTenant } =
        useTenantStore();

    useEffect(() => {
        loadTenants();
    }, [loadTenants]);

    if (!tenants.length) return null;

    return (
        <select
            value={activeTenant?.id ?? ""}
            onChange={(e) => {
                const tenant = tenants.find((t) => t.id === e.target.value);
                if (tenant) setActiveTenant(tenant);
            }}
        >
            <option value="" disabled>
                Select Tenant
            </option>
            {tenants.map((t) => (
                <option key={t.id} value={t.id}>
                    {t.name}
                </option>
            ))}
        </select>
    );
}
