// src/core/ui/components/header_page/HeaderPage.tsx

import { useBreakpoint } from "@/core/ui/layout/hooks/useBreakpoint";
import MobileHeader from "../mobile_header/MobileHeader";
import DesktopHeader from "./DesktopHeader";
import type { HeaderAction } from "./types";

interface Props {
    title?: string;
    subtitle?: string;

    meta?: React.ReactNode;

    onBack?: () => void;
    right?: React.ReactNode;
    actions?: HeaderAction[];
    showBack?: boolean;
}

export default function HeaderPage(props: Props) {
    const { isMobile } = useBreakpoint();

    if (isMobile) {
        return <MobileHeader {...props} />;
    }

    return <DesktopHeader {...props} />;
}
