// src/modules/account/profile/api/profile.api.ts

import { httpGet, httpPatch } from "@/core/http/http.client";

export const getMe = () => {
    return httpGet("/auth/me/");
};

export const updateProfile = (data: { full_name?: string; phone?: string }) => {
    return httpPatch("/account/profile/", data);
};

export const updateAvatar = (file_id: string) => {
    return httpPatch("/auth/me/avatar/", { file_id });
};
