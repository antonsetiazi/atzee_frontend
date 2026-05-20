// src/engine/entities/blocks/BlockTags.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState, useCallback } from "react";
import EmptyState from "@/shared/ui/EmptyState";
import { button } from "@/core/ui/class/button.ui.class";
import {
    attachTag,
    createTag,
    detachTag,
    fetchAttachedTags,
    fetchTags,
} from "@/engine/tags/api/tag.api";
import { inputBase } from "@/core/ui/class/field.ui.class";
import { LoadingState } from "@/core/ui/components";

interface Props {
    block: any;
    entityKey: string;
    id?: string;
}

export default function BlockTags({ block, id }: Props) {
    const [attached, setAttached] = useState<any[]>([]);
    const [allTags, setAllTags] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [newTagName, setNewTagName] = useState("");

    const entityType = block.entity_type;
    const entityId = id;

    const loadTags = useCallback(async () => {
        if (!entityId) return;

        setLoading(true);
        try {
            const [attachedRes, allRes] = await Promise.all([
                fetchAttachedTags(entityType, entityId),
                fetchTags(),
            ]);

            setAttached(attachedRes.items ?? []);
            setAllTags(allRes.items ?? []);
        } finally {
            setLoading(false);
        }
    }, [entityType, entityId]);

    useEffect(() => {
        if (!entityId) return;
        loadTags();
    }, [loadTags, entityId]);

    async function handleAttach(tagId: string) {
        if (!entityId) return;
        await attachTag({
            tag_id: tagId,
            model: entityType,
            object_id: entityId,
        });
        await loadTags();
    }

    async function handleDetach(tagId: string) {
        if (!entityId) return;
        await detachTag({
            tag_id: tagId,
            model: entityType,
            object_id: entityId,
        });
        await loadTags();
    }

    async function handleCreate() {
        if (!entityId) return;
        if (!newTagName.trim()) return;

        const created = await createTag({
            name: newTagName,
        });

        await attachTag({
            tag_id: created.id,
            model: entityType,
            object_id: entityId,
        });

        setNewTagName("");
        await loadTags();
    }

    if (!entityId) return null;
    if (loading) return <LoadingState />;

    const attachedIds = new Set(attached.map((t) => t.id));
    const available = allTags.filter((t) => !attachedIds.has(t.id));

    return (
        <div>
            {/* HEADER */}
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h3 className="text-md font-semibold">{block.title ?? "Tags"}</h3>
                    {block.description && (
                        <p className="text-sm text-gray-500">{block.description}</p>
                    )}
                </div>
            </div>

            {/* ATTACHED TAGS */}
            <div className="mb-4">
                {attached.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className="flex flex-wrap gap-2">
                        {attached.map((tag) => (
                            <div
                                key={tag.id}
                                className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-blue-800 shadow-sm transition-shadow duration-150 hover:shadow-md"
                            >
                                <span className="text-sm font-medium">{tag.name}</span>
                                {block.allow_detach && (
                                    <button
                                        onClick={() => handleDetach(tag.id)}
                                        className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-200 text-blue-700 transition-colors duration-150 hover:bg-red-500 hover:text-white"
                                        title="Remove tag"
                                    >
                                        ×
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ATTACH EXISTING */}
            {block.allow_attach && available.length > 0 && (
                <div className="mb-4">
                    <select
                        className="rounded border border-gray-300 px-3 py-2 text-sm"
                        onChange={(e) => handleAttach(e.target.value)}
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Attach existing tag
                        </option>
                        {available.map((tag) => (
                            <option key={tag.id} value={tag.id}>
                                {tag.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* CREATE NEW TAG */}
            {block.allow_create && (
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newTagName}
                        onChange={(e) => setNewTagName(e.target.value)}
                        placeholder="New tag name"
                        className={inputBase}
                    />
                    <button className={`${button.base} ${button.primary}`} onClick={handleCreate}>
                        Add
                    </button>
                </div>
            )}
        </div>
    );
}
