/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/entities/blocks/BlockFiles.tsx

import { useEffect, useState, useCallback } from "react";
// import { uploadFile, fetchFiles, deleteFile } from "./file.api";
import LoadingState from "@/shared/ui/LoadingState";
import EmptyState from "@/shared/ui/EmptyState";
import { button } from "@/core/ui/ui.class";
import { deleteFile, fetchFiles, uploadFile } from "@/business/files/file.api";
import { useSessionStore } from "@/core/session/session.store";
import { handleCoreAffects } from "@/core/utils/coreAffects";

interface Props {
    block: any;
    entityKey: string;
    id?: string;
    onAfterUpload?: (file: FileItem) => Promise<void> | void;
}

interface FileItem {
    id: string;
    name: string;
    mime_type: string;
    size: number;
    is_public: boolean;
    created_at: string;
    owner?: string;
    url: string;
    previewUrl?: string;
}

export default function BlockFiles({ block, id }: Props) {
    const [files, setFiles] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const user = useSessionStore((s) => s.user);
    const token = useSessionStore((s) => s.token);

    const entityType = block.entity_type;
    const entityId =
        id ?? (block.entity_id_from === "self" ? user?.id : undefined);

    const loadFiles = useCallback(async () => {
        if (!entityId) return; // ✅ guard DI DALAM

        setLoading(true);
        try {
            const res = await fetchFiles({
                related_entity: entityType,
                related_id: entityId,
            });
            const items =
                block.multiple === false
                    ? (res.items?.slice(0, 1) ?? [])
                    : (res.items ?? []);

            const filesWithPreview = await Promise.all(
                items.map(async (f: FileItem) => {
                    // Hanya untuk image
                    if (
                        f.mime_type.startsWith("image/") &&
                        !f.is_public &&
                        token
                    ) {
                        const r = await fetch(f.url, {
                            headers: { Authorization: `Bearer ${token}` },
                        });
                        const blob = await r.blob();
                        const previewUrl = URL.createObjectURL(blob);
                        return { ...f, previewUrl };
                    }
                    return f;
                }),
            );

            setFiles(filesWithPreview);
        } finally {
            setLoading(false);
        }
    }, [entityType, entityId, block.multiple, token]);

    useEffect(() => {
        if (!entityId) return; // ✅ guard logic
        loadFiles();
    }, [loadFiles, entityId]);

    async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
        if (!entityId) return;

        const file = e.target.files?.[0];
        if (!file) return;

        // 🔹 Jika multiple = false dan sudah ada file, hapus file lama
        if (block.multiple === false && files.length > 0) {
            await deleteFile(files[0].id);
        }

        const uploaded = await uploadFile({
            file,
            entity_type: entityType,
            entity_id: entityId,
        });

        if (block.affects) {
            await handleCoreAffects(block.affects);
        }

        if (block.multiple === false && uploaded) {
            await loadFiles();
        } else {
            await loadFiles();
        }
    }

    async function handleDelete(fileId: string) {
        if (!entityId) return;
        if (!confirm("Delete this file?")) return;

        await deleteFile(fileId);
        await loadFiles();
    }

    if (!entityId) return null;
    if (loading) return <LoadingState />;
    return (
        <div>
            {/* HEADER */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-md font-semibold">
                        {block.title ?? "Files"}
                    </h3>
                    {block.description && (
                        <p className="text-sm text-gray-500">
                            {block.description}
                        </p>
                    )}
                </div>

                <label className={`${button.base} ${button.primary}`}>
                    Upload File
                    <input
                        type="file"
                        className="hidden"
                        accept={block.accept}
                        onChange={handleUpload}
                    />
                </label>
            </div>

            {/* FILE LIST */}
            {files.length === 0 ? (
                <EmptyState />
            ) : (
                <ul className="flex flex-wrap gap-4">
                    {files.map((f) => {
                        // console.log(f);
                        return (
                            <li
                                key={f.id}
                                className="relative w-24 h-24 border border-gray-100 rounded overflow-hidden"
                            >
                                {/* Image preview */}
                                {f.mime_type.startsWith("image/") ? (
                                    <img
                                        src={f.previewUrl ?? f.url}
                                        alt={f.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center w-full h-full bg-gray-100 text-xs text-gray-500 text-center p-1 truncate">
                                        {f.name}
                                    </div>
                                )}
                                <div>{f.url}</div>
                                {/* Delete button */}
                                <button
                                    className="absolute top-1 right-1 bg-white rounded-full p-1 text-red-600 text-xs shadow"
                                    onClick={() => handleDelete(f.id)}
                                >
                                    ✕
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
