// src/core/ui/components/page_skeleton/PageSkeleton.tsx

export default function PageSkeleton() {
    return (
        <div className="max-w-4xl mx-auto p-4 space-y-4 animate-pulse">
            {/* Header */}
            <div className="space-y-2">
                <div className="h-7 w-48 rounded bg-gray-200" />
                <div className="h-4 w-64 rounded bg-gray-100" />
            </div>

            {/* Card list */}
            {[1, 2, 3].map((item) => (
                <div
                    key={item}
                    className="p-4 rounded-2xl border border-gray-100 bg-white space-y-3"
                >
                    <div className="flex justify-between">
                        <div className="h-4 w-32 rounded bg-gray-200" />
                        <div className="h-6 w-20 rounded-full bg-gray-100" />
                    </div>

                    <div className="h-4 w-full rounded bg-gray-100" />

                    <div className="flex justify-between">
                        <div className="h-3 w-28 rounded bg-gray-100" />
                        <div className="h-4 w-24 rounded bg-gray-200" />
                    </div>
                </div>
            ))}
        </div>
    );
}
