import { useSessionStore } from "@/core/session/session.store";
// import { usePermissionStore } from "@/core/permissions/permission.store";
// import { useConfigStore } from "@/core/config/config.store";

const coreSyncMap: Record<string, () => Promise<void>> = {
    session_user: async () => {
        const reload = useSessionStore.getState().reloadSession;
        if (reload) await reload();
    },
    // session_settings: async () => {
    //     const reload = useSessionStore.getState().reloadSessionSettings;
    //     if (reload) await reload();
    // },
    // permissions: async () => {
    //     const reload = usePermissionStore.getState().reloadPermissions;
    //     if (reload) await reload();
    // },
    // config: async () => {
    //     const reload = useConfigStore.getState().reloadConfig;
    //     if (reload) await reload();
    // },
};

export async function handleCoreAffects(affects?: string) {
    if (!affects) return;
    const handler = coreSyncMap[affects];
    if (handler) await handler();
}
