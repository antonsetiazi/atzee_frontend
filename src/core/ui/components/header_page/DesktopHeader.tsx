// src/core/ui/components/header_page/DesktopHeader.tsx

import HeaderActions from "./HeaderActions";
import type { HeaderAction } from "./types";

interface Props {
    title?: string;
    subtitle?: string;
    meta?: React.ReactNode;
    right?: React.ReactNode;
    actions?: HeaderAction[];
}

export default function DesktopHeader({ title, subtitle, right, meta, actions }: Props) {
    return (
        <div
            className="flex w-full items-start justify-between gap-4 px-6 py-5"
            style={{
                background: "var(--color-background)",
                borderBottom: "1px solid var(--color-border)",
            }}
        >
            {/* LEFT */}
            <div className="min-w-0 space-y-1">
                {title && <h1 className="text-2xl font-bold">{title}</h1>}

                <div className="flex flex-wrap items-center gap-2">
                    {subtitle && <p className="text-sm text-[var(--text-muted)]">{subtitle}</p>}

                    {meta && (
                        <>
                            <span className="text-[var(--text-muted)]">•</span>

                            <div>{meta}</div>
                        </>
                    )}
                </div>
            </div>

            {/* RIGHT */}
            <div className="flex flex-shrink-0 items-center gap-3">
                {actions ? <HeaderActions actions={actions} /> : right}
            </div>
        </div>
    );
}
