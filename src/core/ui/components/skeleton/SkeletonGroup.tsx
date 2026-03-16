// src/core/ui/components/skeleton/SkeletonGroup.tsx

import Skeleton from "./Skeleton";

interface SkeletonGroupProps {
    count?: number;
    gap?: number;
    height?: number;
}

export default function SkeletonGroup({
    count = 3,
    gap = 12,
    height = 16,
}: SkeletonGroupProps) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap,
            }}
        >
            {Array.from({ length: count }).map((_, i) => (
                <Skeleton key={i} height={height} />
            ))}
        </div>
    );
}
