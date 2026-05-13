// src/core/activity/components/ActivityLoading.tsx

export default function ActivityLoading() {
    return (
        <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="h-28 animate-pulse rounded-2xl border" />
            ))}
        </div>
    );
}
