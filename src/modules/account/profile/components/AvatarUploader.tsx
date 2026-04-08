// src/modules/account/profile/components/AvatarUploader.tsx

import { useState } from "react";

interface Props {
    avatarUrl?: string | null;
    onUpload: (file: File) => Promise<void>;
    loading?: boolean;
}

export default function AvatarUploader({
    avatarUrl,
    onUpload,
    loading,
}: Props) {
    const [preview, setPreview] = useState<string | null>(null);

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        setPreview(url);

        await onUpload(file);
    };

    return (
        <div className="relative group">
            <img
                src={preview || avatarUrl || "/default-avatar.png"}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />

            <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition">
                <span className="text-white text-sm">
                    {loading ? "Uploading..." : "Change"}
                </span>
                <input type="file" className="hidden" onChange={handleChange} />
            </label>
        </div>
    );
}
