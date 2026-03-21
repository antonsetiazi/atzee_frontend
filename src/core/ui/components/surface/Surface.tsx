// src/core/ui/components/surface/Surface.tsx

interface Props {
    children: React.ReactNode;
    padded?: boolean;
    className?: string;
}

export default function Surface({
    children,
    padded = true,
    className = "",
}: Props) {
    return (
        <div
            className={`
                w-full
                rounded-2xl
                transition-all duration-300
                ${padded ? "p-6" : ""}
                ${className}
            `}
            style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-sm)",
            }}
        >
            {children}
        </div>
    );
}
