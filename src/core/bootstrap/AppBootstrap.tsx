// src/core/bootstrap/AppBootstrap.tsx

import { useEffect, useState } from "react";
import { useSessionStore } from "@/core/session/session.store";
import { ensurePlatformReady } from "./platformBootstrap";
import { httpGet } from "@/core/http/http.client";

export function AppBootstrap({ children }: { children: React.ReactNode }) {
    const token = useSessionStore((s) => s.token);
    const user = useSessionStore((s) => s.user);
    const setSession = useSessionStore((s) => s.setSession);
    // const { isAuthenticated, isHydrated } = useSessionStore();
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (!token) return;

        // if (!isHydrated || !isAuthenticated) return;
        if (!user) {
            httpGet("/auth/me/")
                .then((u) => {
                    setSession(token, u);
                })
                .catch(() => {
                    console.warn("Token expired / invalid, clearing session");
                    setSession("", null);
                });
        }

        ensurePlatformReady()
            .then(() => setReady(true))
            .catch(() => {
                window.location.href = "/login";
            });
    }, [token, user, setSession]);

    // if (!isHydrated) {
    //     return (
    //         <div className="flex min-h-screen items-center justify-center bg-gray-50">
    //             <div className="flex flex-col items-center gap-4">
    //                 {/* Spinner */}
    //                 <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-indigo-600" />

    //                 {/* Text */}
    //                 <div className="text-sm text-gray-500">
    //                     Initializing session…
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }

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
