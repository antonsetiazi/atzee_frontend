// src/core/activity/api/activity.types.ts

export type ActivitySeverity = "info" | "success" | "warning" | "error" | "critical";

export type ActivityVisibility = "public" | "internal" | "private" | "system";

export interface ActivityAttachment {
    id: string;
    file: string;
    file_name: string;
    file_size: number;
    mime_type: string;
    created_at: string;
}

export interface ActivityComment {
    id: string;
    content: string;
    is_internal: boolean;

    created_by: string | null;
    created_by_name: string | null;

    created_at: string;
}

export interface ActivityReaction {
    id: string;
    reaction: string;

    user: string;
    user_name: string;

    created_at: string;
}

export interface Activity {
    id: string;

    target_type: string;
    target_id: string;

    event: string;
    title: string;
    description: string;

    metadata: Record<string, unknown>;

    visibility: ActivityVisibility;
    severity: ActivitySeverity;
    source: string;

    is_pinned: boolean;
    is_immutable: boolean;

    created_by: string | null;
    created_by_name: string | null;

    actor: string | null;
    actor_name: string | null;

    attachments: ActivityAttachment[];
    comments: ActivityComment[];
    reactions: ActivityReaction[];

    created_at: string;
    updated_at: string;
}

export interface ActivityTimelineResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Activity[];
}

export interface ActivityTimelineParams {
    target_type?: string;
    target_id?: string;

    severity?: string;
    visibility?: string;
    event?: string;

    search?: string;

    ordering?: string;

    page?: number;
}
