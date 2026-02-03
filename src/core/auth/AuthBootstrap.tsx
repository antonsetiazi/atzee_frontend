// src/core/auth/AuthBootstrap.tsx

import { useEffect } from "react";
import { useSessionStore } from "@/core/session/session.store";

export function AuthBootstrap({ children }: { children: React.ReactNode }) {
    const hydrate = useSessionStore((s) => s.hydrate);
    const isHydrated = useSessionStore((s) => s.isHydrated);

    useEffect(() => {
        hydrate();
    }, [hydrate]);

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

    return <>{children}</>;
}
