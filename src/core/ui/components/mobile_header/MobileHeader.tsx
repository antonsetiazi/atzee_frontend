// src/core/ui/components/mobile_header/MobileHeader.tsx

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useBreakpoint } from "@/core/ui/layout/hooks/useBreakpoint";
import { SmartNavigate } from "@/core/navigation/SmartNavigate";
import HeaderActions from "../header_page/HeaderActions";
import type { HeaderAction } from "../header_page/types";

interface Props {
    title?: string;
    subtitle?: string;
    meta?: React.ReactNode;

    onBack?: () => void;
    right?: React.ReactNode;

    sticky?: boolean;

    showBack?: boolean;
    actions?: HeaderAction[];
}

export default function MobileHeader({
    title,
    subtitle,
    meta,
    onBack,
    right,
    sticky = true,
    showBack = true,
    actions,
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
                            {/* SUBTITLE + META */}
                            {(subtitle || meta) && (
                                <div className="mt-0.5 flex flex-wrap items-center gap-1 text-xs text-[var(--text-muted)]">
                                    {subtitle && <span className="truncate">{subtitle}</span>}

                                    {subtitle && meta && <span>•</span>}

                                    {meta && <div className="flex items-center">{meta}</div>}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-2">
                    {actions ? (
                        <HeaderActions actions={actions} mobile />
                    ) : (
                        right && (
                            <div className="flex flex-wrap items-center justify-end gap-2">
                                {right}
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}
