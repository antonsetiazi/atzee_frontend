// src/core/activity/components/ActivityItem.tsx

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import ActivityHeader from "./ActivityHeader";
import ActivityIcon from "./ActivityIcon";
import ActivityMeta from "./ActivityMeta";
import { formatActivityDate } from "../utils/formatActivityDate";
import type { Activity } from "../api/activity.types";

interface Props {
    activity: Activity;
    isLast?: boolean;
}

export default function ActivityItem({ activity, isLast = false }: Props) {
    const [showMeta, setShowMeta] = useState(false);
    return (
        <div className="flex gap-4">
            {/* ====================================== */}
            {/* TIMELINE */}
            {/* ====================================== */}

            <div className="flex flex-col items-center">
                <ActivityIcon severity={activity.severity} isLast={isLast} />

                {!isLast && <div className="bg-border mt-2 w-px flex-1" />}
            </div>

            {/* ====================================== */}
            {/* CONTENT */}
            {/* ====================================== */}

            <div className="min-w-0 flex-1 pb-4">
                <div>
                    <ActivityHeader activity={activity} />

                    {activity.description && (
                        <div className="text-muted-foreground mt-2 text-sm leading-relaxed">
                            {activity.description}
                        </div>
                    )}

                    {/* META */}

                    <div
                        className="text-muted-foreground mt-2 flex flex-wrap items-center gap-2 text-xs"
                        style={{
                            color: "var(--text-muted)",
                        }}
                    >
                        <span>By {activity.created_by_name || "System"}</span>

                        <span>•</span>

                        <span>{formatActivityDate(activity.created_at)}</span>
                    </div>

                    {/* ====================================== */}
                    {/* METADATA */}
                    {/* ====================================== */}

                    {activity.metadata && Object.keys(activity.metadata).length > 0 && (
                        <div className="mt-4">
                            <button
                                type="button"
                                onClick={() => setShowMeta(!showMeta)}
                                className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-xs transition-colors"
                            >
                                {showMeta ? (
                                    <ChevronDown className="h-3.5 w-3.5" />
                                ) : (
                                    <ChevronRight className="h-3.5 w-3.5" />
                                )}

                                <span>Show Details</span>
                            </button>

                            {showMeta && (
                                <div className="mt-3">
                                    <ActivityMeta activity={activity} />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
