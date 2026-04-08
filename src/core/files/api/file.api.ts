// src/core/files/api/file.api.ts

import { httpPostForm } from "@/core/http/http.client";
import { useSessionStore } from "@/core/session/session.store";

export const uploadFile = async (file: File) => {
    const formData = new FormData();

    const user = useSessionStore.getState().user;

    formData.append("file", file);
    formData.append("related_entity", "user_avatar");
    formData.append("related_id", user?.id ?? "");

    return httpPostForm("/files/", formData);
};
