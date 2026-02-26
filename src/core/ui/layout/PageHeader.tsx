// src/core/ui/layout/PageHeader.tsx

interface PageHeaderProps {
    title?: string;
    description?: string | null;
    isMobile: boolean;
}

export default function PageHeader({
    title,
    description,
    isMobile,
}: PageHeaderProps) {
    return (
        <div
            className={`w-full ${isMobile ? "px-4 pt-5 pb-4" : "px-6 py-6"}`}
            style={{
                background: "var(--color-background)",
                borderBottom: "1px solid var(--color-border)",
            }}
        >
            <div
                className={`${
                    isMobile
                        ? "space-y-1"
                        : "flex items-start justify-between gap-6"
                }`}
            >
                {/* Title & Description */}
                <div className="space-y-1">
                    <h1
                        className={`font-semibold tracking-tight ${
                            isMobile ? "text-2xl" : "text-2xl"
                        }`}
                        style={{
                            color: "var(--text-primary)",
                        }}
                    >
                        {title || "Entity"}
                    </h1>

                    {description && (
                        <p
                            className="text-sm leading-relaxed max-w-2xl"
                            style={{
                                color: "var(--text-secondary)",
                            }}
                        >
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
