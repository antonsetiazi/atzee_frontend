// src/core/ui/views/booking/BookingCalendar.tsx

interface Props {
    selectedDate: string | null;
    onSelectDate: (date: string) => void;

    minDate?: string; // optional constraint
}

export default function BookingCalendar({
    selectedDate,
    onSelectDate,
    minDate,
}: Props) {
    // simple version (native date input, scalable nanti bisa diganti calendar lib)
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium">Pilih Tanggal</label>

            <input
                type="date"
                value={selectedDate || ""}
                min={minDate}
                onChange={(e) => onSelectDate(e.target.value)}
                className="
                    w-full p-3 rounded-xl
                    border border-[var(--color-border)]
                    bg-[var(--color-surface)]
                "
            />
        </div>
    );
}
