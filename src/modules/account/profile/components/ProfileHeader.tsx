// src/modules/account/profile/components/ProfileHeader.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import AvatarUploader from "./AvatarUploader";

interface Props {
    user: any;
    onUpload: (file: File) => Promise<void>;
    onPickNative?: () => void;
    uploading?: boolean;
}

export default function ProfileHeader({
    user,
    onUpload,
    // onPickNative,
    uploading,
}: Props) {
    return (
        <div
            className="
                relative
                rounded-2xl
                p-5
                flex items-center gap-5
                border
                shadow-sm
            "
            style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border)",
                boxShadow: "var(--shadow)",
            }}
        >
            {/* SUBTLE BACKGROUND ACCENT */}
            <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    background: `linear-gradient(135deg, var(--color-primary), transparent)`,
                }}
            />

            {/* AVATAR */}
            <div className="relative z-10">
                <AvatarUploader
                    avatarUrl={user?.avatar_url}
                    onUpload={onUpload}
                    loading={uploading}
                />
            </div>

            {/* USER INFO */}
            <div className="relative z-10 flex-1 min-w-0">
                <h2
                    className="
                        text-lg
                        font-semibold
                        truncate
                    "
                    style={{ color: "var(--text-primary)" }}
                >
                    {user?.full_name || "No Name"}
                </h2>

                <p
                    className="
                        text-sm
                        truncate
                    "
                    style={{ color: "var(--text-secondary)" }}
                >
                    {user?.username}
                </p>

                {/* OPTIONAL: ROLE / STATUS BADGE */}
                {user?.role_name && (
                    <div className="mt-2">
                        <span
                            className="
                                inline-block
                                text-xs
                                px-3 py-1
                                rounded-full
                            "
                            style={{
                                background: "var(--color-surface-alt)",
                                color: "var(--text-secondary)",
                                border: "1px solid var(--color-border)",
                            }}
                        >
                            {user.role_name}
                        </span>
                    </div>
                )}

                {/* <button
                    onClick={onPickNative}
                    className="px-4 py-2 bg-black text-white rounded"
                >
                    Pick from Camera (Native)
                </button> */}
            </div>
        </div>
    );
}
