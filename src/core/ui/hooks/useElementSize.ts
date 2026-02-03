// src/core/ui/hooks/useElementSize.ts

import { useLayoutEffect, useState } from "react";

export function useElementSize<T extends HTMLElement>() {
    const [el, setEl] = useState<T | null>(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
        if (!el) return;

        const observer = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect;
            setSize({ width, height });
        });

        observer.observe(el);
        return () => observer.disconnect();
    }, [el]);

    return { ref: setEl, ...size };
}
