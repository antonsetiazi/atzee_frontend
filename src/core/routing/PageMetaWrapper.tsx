// src/core/routing/PageMetaWrapper.tsx

import { useEffect } from "react";
import { usePageStore, type PageMeta } from "@/core/ui/page/page.store";

interface Props {
    meta?: PageMeta;
    children: React.ReactNode;
}

/**
 * 🔥 PageMetaWrapper
 *
 * Responsibility:
 * - Inject route meta → global UI store
 * - Reset meta on unmount (VERY IMPORTANT)
 */
export default function PageMetaWrapper({ meta, children }: Props) {
    const setMeta = usePageStore((s) => s.setMeta);

    useEffect(() => {
        // Apply meta when mounted / changed
        setMeta(meta);

        return () => {
            // 🔥 Reset to default when leaving page
            setMeta(undefined);
        };
    }, [meta, setMeta]);

    return <>{children}</>;
}
