/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/tables/AdaptiveTableRenderer.tsx

import { useShell } from "@/core/ui/layout/shell/ShellContext";
import TableDesktop from "./renderers/TableDesktop";
import TableMobile from "./renderers/TableMobile";

export default function AdaptiveTableRenderer(props: any) {
    const { isMobile } = useShell();

    if (isMobile) {
        return <TableMobile {...props} />;
    }

    return <TableDesktop {...props} />;
}
