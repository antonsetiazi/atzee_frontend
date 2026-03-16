import Skeleton from "./Skeleton";
import { CardSkeleton, TableRowSkeleton } from "./SkeletonPresets";

export default function SkeletonSample() {
    return (
        <div>
            <div className="animate-skeleton w-40 h-4 bg-gray-200"></div>
            <p>Loading table:</p>
            <div className="space-y-2">
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
            </div>

            <p>Loading card:</p>
            <CardSkeleton />

            <Skeleton width={300} height={20} />

            <div className="w-64">
                <Skeleton height={20} />
            </div>
        </div>
    );
}
