// src/core/ui/hooks/useClickOutside.ts

import { useEffect } from "react";

export function useClickOutside<T extends HTMLElement>(
    ref: React.RefObject<T | null>,
    handler: () => void,
) {
    useEffect(() => {
        function handleClick(event: MouseEvent) {
            const el = ref.current;

            if (!el) return;

            if (!el.contains(event.target as Node)) {
                handler();
            }
        }

        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, [ref, handler]);
}
