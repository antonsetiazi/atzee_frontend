// src/modules/account/profile/hooks/useProfileActions.ts

import { updateProfile, updateAvatar } from "../api/profile.api";

export function useProfileActions(refetch: () => void) {
    const saveProfile = async (data: {
        full_name?: string;
        phone?: string;
    }) => {
        await updateProfile(data);
        refetch();
    };

    const saveAvatar = async (file_id: string) => {
        await updateAvatar(file_id);
        refetch();
    };

    return {
        saveProfile,
        saveAvatar,
    };
}
