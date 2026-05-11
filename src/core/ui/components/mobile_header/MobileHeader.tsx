// src/core/ui/components/mobile_header/MobileHeader.tsx

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useBreakpoint } from "@/core/ui/layout/hooks/useBreakpoint";
import { SmartNavigate } from "@/core/navigation/SmartNavigate";

interface Props {
    title?: string;
    subtitle?: string;

    onBack?: () => void;
    right?: React.ReactNode;

    sticky?: boolean;

    showBack?: boolean;
}

export default function MobileHeader({
    title,
    subtitle,
    onBack,
    right,
    sticky = true,
    showBack = true,
}: Props) {
    const { isMobile } = useBreakpoint();

    if (!isMobile) return null;

    function handleBack() {
        if (onBack) return onBack();
        SmartNavigate.back();
    }

    return (
        <div className={`z-40 ${sticky ? "sticky top-0" : ""} `}>
            <div className="flex items-center justify-between border-b border-[var(--color-border)] bg-white/70 px-4 py-3 backdrop-blur-md">
                {/* LEFT */}
                <div className="flex items-center gap-3">
                    {showBack && (
                        <button
                            onClick={handleBack}
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-white shadow-sm transition active:scale-95"
                        >
                            <ArrowLeftIcon className="h-5 w-5 text-[var(--text-primary)]" />
                        </button>
                    )}

                    {(title || subtitle) && (
                        <div className="leading-tight">
                            {title && <p className="text-sm font-semibold">{title}</p>}
                            {subtitle && (
                                <p className="text-xs text-[var(--text-muted)]">{subtitle}</p>
                            )}
                        </div>
                    )}
                </div>

                {/* RIGHT */}
                {right && (
                    <div className="flex flex-wrap items-center justify-end gap-2">{right}</div>
                )}
            </div>
        </div>
    );
}
