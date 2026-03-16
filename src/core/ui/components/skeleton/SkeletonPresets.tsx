// src/core/ui/components/skeleton/SkeletonPresets.tsx

import Skeleton from "./Skeleton";

export function CardSkeleton() {
    return (
        <div className="p-4 border rounded-xl flex flex-col gap-3">
            <Skeleton height={20} width="40%" />
            <Skeleton height={14} />
            <Skeleton height={14} width="90%" />
            <Skeleton height={14} width="70%" />
        </div>
    );
}

export function TableRowSkeleton() {
    return (
        <div className="grid grid-cols-4 gap-4 py-3">
            <Skeleton height={16} />
            <Skeleton height={16} />
            <Skeleton height={16} />
            <Skeleton height={16} />
        </div>
    );
}

export function AvatarSkeleton() {
    return <Skeleton width={40} height={40} radius="50%" />;
}
