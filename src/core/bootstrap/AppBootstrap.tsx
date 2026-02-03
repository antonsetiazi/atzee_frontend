// src/core/bootstrap/AppBootstrap.tsx

import { useEffect, useState } from "react";
import { useSessionStore } from "@/core/session/session.store";
import { ensurePlatformReady } from "./platformBootstrap";

export function AppBootstrap({ children }: { children: React.ReactNode }) {
    const isAuthenticated = useSessionStore((s) => s.isAuthenticated);
    const isHydrated = useSessionStore((s) => s.isHydrated);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (!isHydrated || !isAuthenticated) return;

        ensurePlatformReady()
            .then(() => setReady(true))
            .catch(() => {
                window.location.href = "/login";
            });
    }, [isHydrated, isAuthenticated]);

    if (!isHydrated) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    {/* Spinner */}
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-indigo-600" />

                    {/* Text */}
                    <div className="text-sm text-gray-500">
                        Initializing session…
                    </div>
                </div>
            </div>
        );
    }

    if (!ready) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    {/* Spinner */}
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-indigo-600" />

                    {/* Text */}
                    <div className="text-sm text-gray-500">
                        Loading platform…
                    </div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
