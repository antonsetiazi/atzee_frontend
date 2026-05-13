// src/core/activity/utils/activityHelpers.ts

import type { Activity } from "../api/activity.types";

export function getActivityActor(activity: Activity): string {
    return activity.actor_name || activity.created_by_name || "System";
}

export function isCriticalActivity(activity: Activity): boolean {
    return activity.severity === "critical";
}

export function hasMetadata(activity: Activity): boolean {
    return !!activity.metadata && Object.keys(activity.metadata).length > 0;
}
