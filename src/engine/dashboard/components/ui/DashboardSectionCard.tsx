// src/modules/dashboard/components/ui/DashboardSectionCard.tsx

interface Props {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}

export default function DashboardSectionCard({ title, subtitle, children }: Props) {
    return (
        <div
            className="rounded-[28px] border p-6"
            style={{
                background: `
                    linear-gradient(
                        180deg,
                        rgba(255,255,255,0.92),
                        rgba(255,255,255,0.72)
                    )
                `,

                borderColor: "var(--color-border)",

                boxShadow: `
                    0 10px 30px rgba(15,23,42,0.04),
                    0 2px 8px rgba(15,23,42,0.03)
                `,

                backdropFilter: "blur(10px)",
            }}
        >
            {/* HEADER */}
            <div className="mb-6">
                <div
                    className="text-lg font-semibold"
                    style={{
                        color: "var(--text-primary)",
                    }}
                >
                    {title}
                </div>

                {subtitle && (
                    <div
                        className="mt-1 text-sm"
                        style={{
                            color: "var(--text-muted)",
                        }}
                    >
                        {subtitle}
                    </div>
                )}
            </div>

            {/* CONTENT */}
            {children}
        </div>
    );
}
