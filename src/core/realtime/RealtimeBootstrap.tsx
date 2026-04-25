// src/core/realtime/RealtimeBootstrap.tsx

import { useSessionStore } from "@/core/session/session.store";
import { useEffect } from "react";
import { ws } from "@/core/realtime/ws";
import { initRealtimeModules } from "./realtime.registry";

interface Props {
    children: React.ReactNode;
}

/**
 * ======================================================
 * REALTIME BOOTSTRAP (CORE ONLY)
 * ======================================================
 *
 * Tugas:
 * - connect / disconnect WS
 * - auth lifecycle
 * - TIDAK boleh tahu domain chat/order/etc
 */
export function RealtimeBootstrap({ children }: Props) {
    const isAuthenticated = useSessionStore((s) => s.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            ws.connect();
        } else {
            ws.disconnect();
        }
    }, [isAuthenticated]);

    /**
     * 2. INIT ALL REALTIME MODULES
     * (chat, notification, order, dll)
     */
    useEffect(() => {
        initRealtimeModules();
    }, []);

    return <>{children}</>;
}

export default RealtimeBootstrap;
