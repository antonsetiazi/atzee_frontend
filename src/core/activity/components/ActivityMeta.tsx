// src/core/activity/components/ActivityMeta.tsx

import type { Activity } from "../api/activity.types";

interface Props {
    activity: Activity;
}

export default function ActivityMeta({ activity }: Props) {
    const metadata = activity.metadata || {};

    return (
        <div className="bg-muted/20 mt-3 rounded-xl border border-[var(--color-border)] p-3 text-sm">
            <pre className="overflow-auto break-words whitespace-pre-wrap">
                {JSON.stringify(metadata, null, 2)}
            </pre>
        </div>
    );
}
