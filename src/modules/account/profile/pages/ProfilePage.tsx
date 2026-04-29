// src/modules/account/profile/pages/ProfilePage.tsx

import { nativeApi } from "@/core/native/native.api";
import { base64ToBlob } from "@/core/native/native.file";
import ProfileHeader from "../components/ProfileHeader";
import ProfileForm from "../components/ProfileForm";
import ProfileActions from "../components/ProfileActions";

import { useProfile } from "../hooks/useProfile";
import { useProfileActions } from "../hooks/useProfileActions";
import { useFileUpload } from "@/core/files/hooks/useFileUpload";
import { HeaderPage, PageSkeleton } from "@/core/ui/components";
import { debugNative } from "@/core/native/native.debug";
import { httpPostForm } from "@/core/http/http.client";

export default function ProfilePage() {
    const { data, loading, refetch } = useProfile();
    const { saveProfile, saveAvatar } = useProfileActions(refetch);

    const { upload, loading: uploading } = useFileUpload();

    const handleUpload = async (file: File) => {
        debugNative("file: ", file);
        try {
            const res = await upload(file);

            if (!res?.id) {
                console.log("❌ upload gagal: no file id");
                return;
            }

            const fileId = res.id;

            await saveAvatar(fileId);
            await refetch();
        } catch (err) {
            console.error("Upload failed", err);
        }
    };

    const handlePickAvatarNative = async () => {
        try {
            const res = await nativeApi.openCamera();

            if (!res?.base64) return;

            const blob = base64ToBlob(res.base64, res.mime || "image/jpeg");

            const formData = new FormData();

            formData.append(
                "file",
                blob,
                res.name || `avatar-${Date.now()}.jpg`,
            );

            formData.append("related_entity", "user_avatar");
            formData.append("related_id", data.id);

            const uploaded = await httpPostForm("/files/", formData);

            if (!uploaded?.id) return;

            await saveAvatar(uploaded.id);
            await refetch();
        } catch (err) {
            debugNative("Native camera failed", err);
        }
    };

    if (loading) return <PageSkeleton />;

    return (
        <>
            <HeaderPage title="Profile" />
            <div className="p-6 space-y-6 max-w-3xl mx-auto">
                <ProfileHeader
                    user={data}
                    onUpload={handleUpload}
                    onPickNative={handlePickAvatarNative}
                    uploading={uploading}
                />

                <ProfileForm user={data} onSave={saveProfile} />

                <ProfileActions />
            </div>
        </>
    );
}
