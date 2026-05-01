// /* eslint-disable @typescript-eslint/no-explicit-any */

import { httpPost } from "@/core/http/http.client";
import type { EntityListResponse } from "@/engine/entities/api/entity.api";

/* ================================
   TYPES
================================ */

// interface AttachedTagQuery {
//     model: string;
//     object_id: string;
//     page?: number;
//     pageSize?: number;
// }

interface CreateTagPayload {
    name: string;
    color?: string;
}

/* ================================
   FETCH ALL TAGS
   (Untuk dropdown attach)
================================ */

export async function fetchTags(
    page = 1,
    pageSize = 100,
): Promise<EntityListResponse> {
    return httpPost<EntityListResponse>("/entities/core/tags.list/query/", {
        page,
        pageSize,
    });
}

/* ================================
   FETCH ATTACHED TAGS
================================ */

export async function fetchAttachedTags(
    entityType: string,
    entityId: string,
): Promise<EntityListResponse> {
    return httpPost<EntityListResponse>(
        "/entities/core/tags.attached.list/query/",
        {
            model: entityType,
            object_id: entityId,
            page: 1,
            pageSize: 100,
        },
    );
}

/* ================================
   ATTACH TAG
================================ */

export async function attachTag(payload: {
    tag_id: string;
    model: string;
    object_id: string;
}) {
    return httpPost("/entities/core/tags.attach/execute/", payload);
}

/* ================================
   DETACH TAG
================================ */

export async function detachTag(payload: {
    tag_id: string;
    model: string;
    object_id: string;
}) {
    return httpPost("/entities/core/tags.detach/execute/", payload);
}

/* ================================
   CREATE TAG
================================ */

export async function createTag(payload: CreateTagPayload) {
    return httpPost("/tags/", payload);
}
