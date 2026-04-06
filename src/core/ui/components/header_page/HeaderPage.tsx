// src/core/ui/components/header_page/HeaderPage.tsx

import { useBreakpoint } from "@/core/ui/layout/hooks/useBreakpoint";
import MobileHeader from "../mobile_header/MobileHeader";
import DesktopHeader from "./DesktopHeader";

interface Props {
    title?: string;
    subtitle?: string;

    onBack?: () => void;
    right?: React.ReactNode;

    showBack?: boolean;
}

export default function HeaderPage(props: Props) {
    const { isMobile } = useBreakpoint();

    if (isMobile) {
        return <MobileHeader {...props} />;
    }

    return <DesktopHeader {...props} />;
}
