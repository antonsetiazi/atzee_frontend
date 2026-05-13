// src/core/activity/utils/formatActivityDate.ts

export function formatActivityDate(value: string): string {
    return new Intl.DateTimeFormat("id-ID", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(new Date(value));
}
