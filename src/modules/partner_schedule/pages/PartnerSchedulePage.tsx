// src/modules/partner_schedule/pages/PartnerSchedulePage.tsx

import { HeaderPage, PageSkeleton } from "@/core/ui/components";
import { usePartnerSchedule } from "../hooks/usePartnerSchedule";
import ScheduleCard from "../components/ScheduleCard";
import { groupByDate, formatDateLabel } from "../utils/groupSchedule";
import WeeklyCalendar from "../components/WeeklyCalendar";

export default function PartnerSchedulePage() {
    const { data, loading } = usePartnerSchedule();

    if (loading) return <PageSkeleton />;
    // console.log(data);

    const grouped = groupByDate(data);

    return (
        <>
            <HeaderPage
                title="Jadwal Saya"
                subtitle="Kelola jadwal kajian & booking"
            />

            <WeeklyCalendar items={data} />

            <div className="p-4 space-y-6">
                {Object.entries(grouped).map(([date, items]) => {
                    // 🔥 SORT PER HARI
                    const sortedItems = [...items].sort(
                        (a, b) =>
                            new Date(a.start_time).getTime() -
                            new Date(b.start_time).getTime(),
                    );

                    return (
                        <div key={date}>
                            <p className="text-sm font-semibold text-gray-500 mb-2">
                                {formatDateLabel(date)}
                            </p>

                            <div className="space-y-3">
                                {sortedItems.map((item) => (
                                    <ScheduleCard key={item.id} item={item} />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
