// src/core/activity/api/activity.api.ts

import { httpGet } from "@/core/http/http.client";

import type { ActivityTimelineParams, ActivityTimelineResponse } from "./activity.types";

const ACTIVITY_API_URL = "/activity/";

export async function fetchActivityTimeline(
    params: ActivityTimelineParams,
): Promise<ActivityTimelineResponse> {
    return httpGet<ActivityTimelineResponse>(ACTIVITY_API_URL, {
        query: params,
    });
}
