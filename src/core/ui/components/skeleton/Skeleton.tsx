// src/core/ui/components/skeleton/Skeleton.tsx

interface SkeletonProps {
    width?: number | string;
    height?: number | string;
    radius?: number | string;
    className?: string;
}

export default function Skeleton({
    width = "100%",
    height = 16,
    radius = 8,
    className = "",
}: SkeletonProps) {
    return (
        <div
            className={`relative overflow-hidden bg-slate-200 dark:bg-slate-700 ${className}`}
            style={{
                width,
                height,
                borderRadius: radius,
            }}
        >
            <div
                className="
                    absolute inset-0
                    -translate-x-full
                    animate-skeleton
                    bg-gradient-to-r
                    from-transparent
                    via-white/60
                    to-transparent
                    dark:via-white/10
                "
            />
        </div>
    );
}
