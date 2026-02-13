// src/core/ui/layout/hooks/useBreakpoint.ts

import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 1024; // < 1024 = mobile

export function useBreakpoint() {
    const [isMobile, setIsMobile] = useState(
        window.innerWidth < MOBILE_BREAKPOINT,
    );

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return {
        isMobile,
        isDesktop: !isMobile,
    };
}
