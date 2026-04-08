// src/modules/account/profile/pages/ProfilePage.tsx

import ProfileHeader from "../components/ProfileHeader";
import ProfileForm from "../components/ProfileForm";
import ProfileActions from "../components/ProfileActions";

import { useProfile } from "../hooks/useProfile";
import { useProfileActions } from "../hooks/useProfileActions";
import { useFileUpload } from "@/core/files/hooks/useFileUpload";
import { HeaderPage } from "@/core/ui/components";

export default function ProfilePage() {
    const { data, loading, refetch } = useProfile();
    const { saveProfile, saveAvatar } = useProfileActions(refetch);

    const { upload, loading: uploading } = useFileUpload();

    const handleUpload = async (file: File) => {
        try {
            const res = await upload(file);

            const fileId = res.id;

            await saveAvatar(fileId);
        } catch (err) {
            console.error("Upload failed", err);
        }
    };

    if (loading) {
        return <div className="p-6">Loading...</div>;
    }

    return (
        <>
            <HeaderPage title="Profile" />
            <div className="p-6 space-y-6 max-w-3xl mx-auto">
                <ProfileHeader
                    user={data}
                    onUpload={handleUpload}
                    uploading={uploading}
                />

                <ProfileForm user={data} onSave={saveProfile} />

                <ProfileActions />
            </div>
        </>
    );
}
