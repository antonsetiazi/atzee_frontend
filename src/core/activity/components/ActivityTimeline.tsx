// src/core/activity/components/ActivityTimeline.tsx

import ActivityEmpty from "./ActivityEmpty";
import ActivityItem from "./ActivityItem";

import { useActivityTimeline } from "../hooks/useActivityTimeline";
import { LoadingState } from "@/core/ui/components";

interface Props {
    targetType: string;
    targetId: string;
}

export default function ActivityTimeline({ targetType, targetId }: Props) {
    const { activities, loading } = useActivityTimeline({
        target_type: targetType,
        target_id: targetId,
    });

    if (loading) return <LoadingState />;

    if (!activities.length) {
        return <ActivityEmpty />;
    }

    return (
        <div className="space-y-6">
            {activities.map((activity, index) => (
                <ActivityItem
                    key={activity.id}
                    activity={activity}
                    isLast={index === activities.length - 1}
                />
            ))}
        </div>
    );
}
