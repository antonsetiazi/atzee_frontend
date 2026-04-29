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
        <div
            className={`
                z-40
                ${sticky ? "sticky top-0" : ""}
            `}
        >
            <div
                className="
                    flex items-center justify-between
                    px-4 py-3
                    backdrop-blur-md
                    bg-white/70
                    border-b border-[var(--color-border)]
                "
            >
                {/* LEFT */}
                <div className="flex items-center gap-3">
                    {showBack && (
                        <button
                            onClick={handleBack}
                            className="
                            w-10 h-10 flex items-center justify-center
                            rounded-full
                            bg-white shadow-sm
                            border border-[var(--color-border)]
                            active:scale-95 transition
                        "
                        >
                            <ArrowLeftIcon className="w-5 h-5 text-[var(--text-primary)]" />
                        </button>
                    )}

                    {(title || subtitle) && (
                        <div className="leading-tight">
                            {title && (
                                <p className="text-sm font-semibold">{title}</p>
                            )}
                            {subtitle && (
                                <p className="text-xs text-[var(--text-muted)]">
                                    {subtitle}
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {/* RIGHT */}
                {right && <div>{right}</div>}
            </div>
        </div>
    );
}
