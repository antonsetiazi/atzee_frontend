// src/business/tables/AdaptiveTableRenderer.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useShell } from "@/core/ui/layout/shell/ShellContext";
import TableDesktop from "./TableDesktop";
import TableMobile from "./TableMobile";

export default function AdaptiveTableRenderer(props: any) {
    const { isMobile } = useShell();

    if (isMobile) {
        return <TableMobile {...props} />;
    }

    return <TableDesktop {...props} />;
}
