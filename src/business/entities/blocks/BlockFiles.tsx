/* eslint-disable @typescript-eslint/no-explicit-any */
// src/business/entities/blocks/BlockFiles.tsx

import { useEffect, useState, useCallback } from "react";
// import { uploadFile, fetchFiles, deleteFile } from "./file.api";
import LoadingState from "@/shared/ui/LoadingState";
import EmptyState from "@/shared/ui/EmptyState";
import { button } from "@/core/ui/ui.class";
import { deleteFile, fetchFiles, uploadFile } from "@/business/files/file.api";

interface Props {
    block: any;
    entityKey: string;
    id?: string;
}

export default function BlockFiles({ block, id }: Props) {
    const [files, setFiles] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const entityType = block.entity_type;
    const entityId = id;

    const loadFiles = useCallback(async () => {
        if (!entityId) return; // ✅ guard DI DALAM

        setLoading(true);
        try {
            const res = await fetchFiles({
                related_entity: entityType,
                related_id: entityId,
            });
            setFiles(res.items ?? []);
        } finally {
            setLoading(false);
        }
    }, [entityType, entityId]);

    useEffect(() => {
        if (!entityId) return; // ✅ guard logic
        loadFiles();
    }, [loadFiles, entityId]);

    async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
        if (!entityId) return;

        const file = e.target.files?.[0];
        if (!file) return;

        await uploadFile({
            file,
            entity_type: entityType,
            entity_id: entityId,
        });

        await loadFiles();
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
                <ul className="space-y-2">
                    {files.map((f) => (
                        <li
                            key={f.id}
                            className="flex items-center justify-between border border-gray-100 rounded px-3 py-2"
                        >
                            <div className="truncate">
                                <a
                                    href={f.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    {f.name}
                                </a>
                            </div>

                            <button
                                className="text-red-600 text-sm"
                                onClick={() => handleDelete(f.id)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
