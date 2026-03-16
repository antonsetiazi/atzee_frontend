// src/core/ui/components/date_range_picker/DateRangePicker.tsx

import { useState, useRef } from "react";
import Calendar from "./Calendar";
import { useClickOutside } from "@/core/ui/hooks/useClickOutside";

interface DateRange {
    start: Date | null;
    end: Date | null;
}

interface Props {
    value?: DateRange;
    onChange?: (range: DateRange) => void;
    className?: string;
}

export default function DateRangePicker({
    value,
    onChange,
    className = "",
}: Props) {
    const [open, setOpen] = useState(false);
    const [range, setRange] = useState<DateRange>(
        value ?? { start: null, end: null },
    );

    const [month] = useState(new Date());
    const ref = useRef<HTMLDivElement>(null);

    useClickOutside(ref, () => setOpen(false));

    function handleSelect(date: Date) {
        let newRange = { ...range };

        if (!range.start || (range.start && range.end)) {
            newRange = { start: date, end: null };
        } else {
            newRange.end = date;
            // setOpen(false); // close after range complete
        }

        setRange(newRange);
        onChange?.(newRange);
    }

    function format(date: Date | null) {
        if (!date) return "Select date";
        return date.toLocaleDateString();
    }

    return (
        <div ref={ref} className={`relative ${className} font-sans`}>
            <button
                onClick={() => setOpen(!open)}
                className="
          px-4 py-2
          rounded-[var(--radius)]
          border border-[var(--color-border)]
          bg-[var(--color-surface)]
          text-sm text-[var(--text-secondary)]
          hover:bg-[var(--color-surface-alt)]
          focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
          transition
          w-full
        "
            >
                {format(range.start)} — {format(range.end)}
            </button>

            {open && (
                <div
                    className="
            absolute
            mt-2
            p-4
            rounded-[var(--radius)]
            border border-[var(--color-border)]
            bg-[var(--color-surface)]
            shadow-[var(--shadow)]
            z-50
            animate-fadeInScale
          "
                >
                    <Calendar
                        month={month}
                        onSelect={handleSelect}
                        selectedRange={range}
                    />
                </div>
            )}
        </div>
    );
}
