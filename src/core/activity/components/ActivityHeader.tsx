// src/core/activity/components/ActivityHeader.tsx

import ActivitySeverityBadge from "./ActivitySeverityBadge";

import type { Activity } from "../api/activity.types";

interface Props {
    activity: Activity;
}

export default function ActivityHeader({ activity }: Props) {
    return (
        <div className="flex flex-wrap items-center gap-3">
            <div className="font-semibold">{activity.title}</div>

            <ActivitySeverityBadge severity={activity.severity} />
        </div>
    );
}
