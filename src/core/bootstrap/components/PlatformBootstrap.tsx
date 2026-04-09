// src/core/bootstrap/components/PlatformBootstrap.tsx

import { useRef, useEffect, useState } from "react";
import { runUserBootstrap } from "@/core/bootstrap/services/user.bootstrap";
import { TenantBootstrap } from "@/core/bootstrap/services/tenant.bootstrap";
import { registerNotificationListeners } from "@/modules/notification/services/notification.listener";
import { registerOrderListeners } from "@/business/order/order.service";
import { useSessionStore } from "@/core/session/session.store";
import { AuthBootstrap } from "@/core/bootstrap/services/auth.bootstrap";

export function PlatformBootstrap({ children }: { children: React.ReactNode }) {
    const initialized = useRef(false);
    const [ready, setReady] = useState(false);

    const { isBootstrapped } = useSessionStore();

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        async function init() {
            await TenantBootstrap();
            await AuthBootstrap();
            await runUserBootstrap();

            registerNotificationListeners();
            registerOrderListeners();

            setReady(true);
        }

        init();
    }, []);

    if (!ready || !isBootstrapped) return <PlatformLoader />;

    return <>{children}</>;
}

function PlatformLoader() {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                {/* Spinner */}
                <div className="relative h-10 w-10">
                    <div className="absolute inset-0 rounded-full border-2 border-gray-200"></div>
                    <div className="absolute inset-0 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin"></div>
                </div>

                {/* Text */}
                <p className="text-sm text-gray-500 tracking-wide">
                    Loading platform...
                </p>
            </div>
        </div>
    );
}
