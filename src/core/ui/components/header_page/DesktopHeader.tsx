// src/core/ui/components/header_page/DesktopHeader.tsx

interface Props {
    title?: string;
    subtitle?: string;
    right?: React.ReactNode;
}

export default function DesktopHeader({ title, subtitle, right }: Props) {
    return (
        <div
            className="w-full px-6 py-6"
            style={{
                background: "var(--color-background)",
                borderBottom: "1px solid var(--color-border)",
            }}
        >
            <div className="space-y-1">
                {title && <h1 className="text-2xl font-bold">{title}</h1>}
                {subtitle && (
                    <p className="text-sm text-[var(--text-muted)]">
                        {subtitle}
                    </p>
                )}
            </div>

            {right && <div>{right}</div>}
        </div>
    );
}
