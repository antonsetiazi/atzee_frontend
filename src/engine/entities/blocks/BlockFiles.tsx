// src/engine/entities/blocks/BlockFiles.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState, useCallback } from "react";
import { deleteFile, fetchFiles, uploadFile } from "@/engine/files/api/file.api";
import { useSessionStore } from "@/core/session/session.store";
import { handleCoreAffects } from "@/core/utils/coreAffects";
import { useConfirm } from "@/core/confirm/useConfirm";
import { LoadingState } from "@/core/ui/components";

interface Props {
    block: any;
    entityKey: string;
    id?: string;
    pageData?: any;
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

export default function BlockFiles({ block, id, pageData }: Props) {
    const confirm = useConfirm();
    const [files, setFiles] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const user = useSessionStore((s) => s.user);
    const accessToken = useSessionStore((s) => s.accessToken);

    const entityType = block.entity_type;
    const entityId =
        id ?? (block.entity_id_from === "self" ? user?.id : pageData?.[block.entity_id_from]);

    const loadFiles = useCallback(async () => {
        if (!entityId) return; // ✅ guard DI DALAM

        setLoading(true);
        try {
            const res = await fetchFiles({
                related_entity: entityType,
                related_id: entityId,
            });
            const items =
                block.multiple === false ? (res.items?.slice(0, 1) ?? []) : (res.items ?? []);

            const filesWithPreview = await Promise.all(
                items.map(async (f: FileItem) => {
                    // Hanya untuk image
                    if (f.mime_type.startsWith("image/") && !f.is_public && accessToken) {
                        const r = await fetch(f.url, {
                            headers: { Authorization: `Bearer ${accessToken}` },
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
    }, [entityType, entityId, block.multiple, accessToken]);

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

        const approved = await confirm({
            title: "Delete this file?",
            message: "Apakah Anda yakin akan hapus file ini?",
            level: "info",
        });

        if (!approved) return;

        await deleteFile(fileId);
        await loadFiles();
    }

    if (!entityId) return null;
    if (loading) return <LoadingState />;

    return (
        <section
            className="rounded-[var(--radius)] p-5"
            style={{
                background: "var(--color-surface)",
                boxShadow: "var(--shadow)",
                border: "1px solid var(--color-border)",
            }}
        >
            {/* Header */}
            <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                    <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                        {block.title ?? "Photos"}
                    </h3>

                    <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
                        {block.description ?? "Upload high quality images to build trust."}
                    </p>
                </div>

                <label
                    className="cursor-pointer rounded-xl px-4 py-2 text-sm font-medium transition"
                    style={{
                        background: "var(--color-primary)",
                        color: "#fff",
                    }}
                >
                    + Upload
                    <input
                        type="file"
                        className="hidden"
                        accept={block.accept}
                        onChange={handleUpload}
                    />
                </label>
            </div>

            {/* Empty */}
            {files.length === 0 ? (
                <div
                    className="rounded-xl p-8 text-center"
                    style={{
                        background: "var(--color-surface-alt)",
                        border: "1px dashed var(--color-border)",
                    }}
                >
                    <div className="mb-2 text-4xl">🖼️</div>
                    <p style={{ color: "var(--text-secondary)" }}>No photos uploaded yet</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {files.map((f, index) => (
                        <div
                            key={f.id}
                            className="group relative overflow-hidden rounded-2xl"
                            style={{
                                border: "1px solid var(--color-border)",
                                background: "var(--color-surface-alt)",
                            }}
                        >
                            {f.mime_type.startsWith("image/") ? (
                                <img
                                    src={f.previewUrl ?? f.url}
                                    alt={f.name}
                                    className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105"
                                />
                            ) : (
                                <div className="flex aspect-square items-center justify-center text-sm">
                                    {f.name}
                                </div>
                            )}

                            {/* badge main */}
                            {index === 0 && (
                                <div className="absolute top-2 left-2 rounded-full bg-black/70 px-2 py-1 text-xs text-white">
                                    Main
                                </div>
                            )}

                            {/* delete */}
                            <button
                                onClick={() => handleDelete(f.id)}
                                className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-0 transition group-hover:opacity-100"
                                style={{
                                    background: "rgba(255,255,255,.95)",
                                }}
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
