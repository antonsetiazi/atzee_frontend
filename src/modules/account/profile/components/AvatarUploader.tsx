// src/modules/account/profile/components/AvatarUploader.tsx

import { useMemo, useState } from "react";
import { compressAvatar } from "@/core/media/image.compress";

interface Props {
    avatarUrl?: string | null;
    onUpload: (file: File) => Promise<void>;
    loading?: boolean;

    name?: string | null;
}

export default function AvatarUploader({
    avatarUrl,
    onUpload,
    loading,
    name,
}: Props) {
    const [preview, setPreview] = useState<string | null>(null);

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            // preview original agar cepat tampil
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);

            // compress sebelum upload
            const optimizedFile = await compressAvatar(file);

            await onUpload(optimizedFile);
        } catch (error) {
            console.error("Avatar upload failed:", error);
        }
    };

    const imageSrc = preview || avatarUrl;

    const initial = useMemo(() => {
        if (name?.trim()) {
            return name.trim().charAt(0).toUpperCase();
        }

        return "U";
    }, [name]);

    return (
        <div className="relative group">
            {imageSrc ? (
                <img
                    src={imageSrc}
                    className="
                        w-32 h-32 rounded-full object-cover
                        border-4 border-white shadow-lg
                    "
                />
            ) : (
                <div
                    className="
                        w-32 h-32 rounded-full
                        flex items-center justify-center
                        border-4 border-white shadow-lg
                        text-4xl font-bold
                    "
                    style={{
                        background:
                            "linear-gradient(135deg, var(--color-primary), color-mix(in srgb, var(--color-primary) 70%, #ffffff))",
                        color: "#fff",
                    }}
                >
                    {initial}
                </div>
            )}

            <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition">
                <span className="text-white text-sm">
                    {loading ? "Uploading..." : "Change"}
                </span>
                <input type="file" className="hidden" onChange={handleChange} />
            </label>
        </div>
    );
}
