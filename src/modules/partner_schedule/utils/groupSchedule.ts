// src/modules/partner_schedule/utils/groupSchedule.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

export function groupByDate(items: any[]) {
    const groups: Record<string, any[]> = {};

    items.forEach((item) => {
        const date = new Date(item.start_time).toDateString();

        if (!groups[date]) {
            groups[date] = [];
        }

        groups[date].push(item);
    });

    return groups;
}

export function formatDateLabel(dateStr: string) {
    const date = new Date(dateStr);
    const today = new Date();

    const isToday = date.toDateString() === today.toDateString();

    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const isTomorrow = date.toDateString() === tomorrow.toDateString();

    if (isToday) return "Hari ini";
    if (isTomorrow) return "Besok";

    return date.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
    });
}
