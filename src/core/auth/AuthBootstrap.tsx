import { useEffect } from "react";
import { useSessionStore } from "@/core/session/session.store";

export function AuthBootstrap({ children }: { children: React.ReactNode }) {
    const hydrate = useSessionStore((s) => s.hydrate);
    const isHydrated = useSessionStore((s) => s.isHydrated);

    useEffect(() => {
        hydrate();
    }, [hydrate]);

    if (!isHydrated) {
        return <div>Initializing session...</div>;
    }

    return <>{children}</>;
}
