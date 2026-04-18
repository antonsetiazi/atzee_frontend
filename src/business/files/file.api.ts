// src/business/files/file.api.ts

import { httpPost, httpDelete, httpPostForm } from "@/core/http/http.client";
import type { EntityListResponse } from "../entities/api/entity.api";

interface FileListQuery {
    related_entity: string;
    related_id: string;
    page?: number;
    pageSize?: number;
}

export async function fetchFiles(
    query: FileListQuery,
): Promise<EntityListResponse> {
    return httpPost<EntityListResponse>("/entities/core/files.list/query/", {
        page: 1,
        pageSize: 20,
        ...query,
    });
}

export async function uploadFile(payload: {
    file: File;
    entity_type: string;
    entity_id: string;
    is_public?: boolean;
}) {
    const form = new FormData();
    form.append("file", payload.file);
    form.append("related_entity", payload.entity_type);
    form.append("related_id", payload.entity_id);

    form.append("is_public", String(payload.is_public ?? true));

    return httpPostForm("/files/", form);
}

export async function deleteFile(fileId: string) {
    return httpDelete(`/files/${fileId}/`);
}
