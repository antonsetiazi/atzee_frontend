// src/core/ui/components/header_page/DesktopHeader.tsx

interface Props {
    title?: string;
    subtitle?: string;
    right?: React.ReactNode;
}

export default function DesktopHeader({ title, subtitle, right }: Props) {
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
                {subtitle && <p className="text-sm text-[var(--text-muted)]">{subtitle}</p>}
            </div>

            {/* RIGHT */}
            {right && <div className="flex flex-shrink-0 items-center gap-3">{right}</div>}
        </div>
    );
}
