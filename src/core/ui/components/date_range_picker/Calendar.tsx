// src/core/ui/components/date_range_picker/Calendar.tsx

import { isSameDay, isBetween, endOfMonth } from "./date.utils";
import { useState } from "react";

interface CalendarProps {
    month: Date;
    onSelect: (date: Date) => void;
    selectedRange?: { start: Date | null; end: Date | null };
}

export default function Calendar({
    month,
    onSelect,
    selectedRange,
}: CalendarProps) {
    const [currentMonth, setCurrentMonth] = useState(month);

    const end = endOfMonth(currentMonth);

    const days: Date[] = [];
    for (let i = 1; i <= end.getDate(); i++) {
        days.push(
            new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i),
        );
    }

    const handlePrevMonth = () => {
        setCurrentMonth(
            new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth() - 1,
                1,
            ),
        );
    };
    const handleNextMonth = () => {
        setCurrentMonth(
            new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth() + 1,
                1,
            ),
        );
    };

    const monthName = currentMonth.toLocaleString("default", {
        month: "long",
        year: "numeric",
    });
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
        <div className="p-4 w-72 bg-[var(--color-surface)] rounded-[var(--radius)] shadow-[var(--shadow)] select-none">
            {/* Header */}
            <div className="flex justify-between items-center mb-2 text-[var(--text-primary)] font-semibold">
                <button
                    onClick={handlePrevMonth}
                    className="p-1 rounded-full hover:bg-[var(--color-surface-alt)] transition"
                >
                    ‹
                </button>
                <div>{monthName}</div>
                <button
                    onClick={handleNextMonth}
                    className="p-1 rounded-full hover:bg-[var(--color-surface-alt)] transition"
                >
                    ›
                </button>
            </div>

            {/* Weekdays */}
            <div className="grid grid-cols-7 text-xs font-medium text-[var(--text-secondary)] mb-1">
                {weekdays.map((day) => (
                    <div key={day} className="text-center">
                        {day}
                    </div>
                ))}
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-1">
                {days.map((day) => {
                    const isSelected =
                        (selectedRange?.start &&
                            isSameDay(day, selectedRange.start)) ||
                        (selectedRange?.end &&
                            isSameDay(day, selectedRange.end));
                    const isInRange =
                        selectedRange?.start &&
                        selectedRange?.end &&
                        isBetween(day, selectedRange.start, selectedRange.end);

                    return (
                        <button
                            key={day.toISOString()}
                            onClick={() => onSelect(day)}
                            className={`
                h-8 w-8 flex items-center justify-center
                rounded-[var(--radius)]
                text-sm font-medium
                transition
                ${isSelected ? "bg-[var(--color-primary)] text-white shadow-inner" : ""}
                ${isInRange ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]" : "text-[var(--text-primary)]"}
                hover:bg-[var(--color-primary)]/20
                focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
              `}
                        >
                            {day.getDate()}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
