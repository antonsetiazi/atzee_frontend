// src/core/activity/hooks/useActivityTimeline.ts

import { useCallback, useEffect, useState } from "react";
import { fetchActivityTimeline } from "../api/activity.api";
import type { Activity, ActivityTimelineParams } from "../api/activity.types";

interface UseActivityTimelineReturn {
    activities: Activity[];
    loading: boolean;
    error: string | null;
    reload: () => Promise<void>;
}

export function useActivityTimeline(params: ActivityTimelineParams): UseActivityTimelineReturn {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // =====================================================
    // STABLE PRIMITIVE DEPENDENCIES
    // =====================================================

    const { target_type, target_id, search, severity, visibility, event, ordering, page } = params;

    const load = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetchActivityTimeline({
                target_type,
                target_id,
                search,
                severity,
                visibility,
                event,
                ordering,
                page,
            });

            setActivities(Array.isArray(response) ? response : response.results || []);
        } catch (err) {
            console.error(err);

            setError("Failed to load activities");
        } finally {
            setLoading(false);
        }
    }, [target_type, target_id, search, severity, visibility, event, ordering, page]);

    useEffect(() => {
        load();
    }, [load]);

    return {
        activities,
        loading,
        error,
        reload: load,
    };
}
