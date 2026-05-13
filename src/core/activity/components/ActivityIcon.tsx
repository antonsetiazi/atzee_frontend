// src/core/activity/components/ActivityIcon.tsx

import { ACTIVITY_SEVERITY_COLORS } from "../constants/activity-colors";
import type { ActivitySeverity } from "../api/activity.types";

interface Props {
    severity: ActivitySeverity;
    isLast?: boolean;
}

export default function ActivityIcon({ severity, isLast = false }: Props) {
    const color = ACTIVITY_SEVERITY_COLORS[severity];

    return (
        <div className="flex flex-col items-center">
            {/* NODE */}

            <div className={`h-3 w-3 rounded-full shadow-sm ${color.dot} `} />

            {/* LINE */}

            {!isLast && <div className="bg-border mt-1 w-px flex-1" />}
        </div>
    );
}
