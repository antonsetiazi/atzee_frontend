// src/core/activity/components/ActivitySeverityBadge.tsx

import { ACTIVITY_SEVERITY_COLORS } from "../constants/activity-colors";

interface Props {
    severity: string;
}

export default function ActivitySeverityBadge({ severity }: Props) {
    const color = ACTIVITY_SEVERITY_COLORS[severity as keyof typeof ACTIVITY_SEVERITY_COLORS];

    return (
        <div className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${color.badge} `}>
            {severity}
        </div>
    );
}
