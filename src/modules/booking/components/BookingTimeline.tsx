// src/modules/booking/components/BookingTimeline.tsx

interface Props {
    status: string;
}

export default function BookingTimeline({ status }: Props) {
    const steps = [
        { key: "HOLD", label: "Menunggu" },
        { key: "CONFIRMED", label: "Dikonfirmasi" },
        { key: "ONGOING", label: "Berlangsung" },
        { key: "COMPLETED", label: "Selesai" },
    ];

    const getSubtext = (key: string) => {
        switch (key) {
            case "HOLD":
                return "Menunggu konfirmasi partner";
            case "CONFIRMED":
                return "Jadwal telah dikonfirmasi";
            case "ONGOING":
                return "Sedang berlangsung";
            case "COMPLETED":
                return null; // 🔥 tidak perlu subtext
            default:
                return null;
        }
    };

    const currentIndex = steps.findIndex((s) => s.key === status);

    return (
        <div className="space-y-4">
            {steps.map((step, index) => {
                const isDone = index < currentIndex;
                const isCurrent = index === currentIndex;

                return (
                    <div key={step.key} className="flex items-start gap-4">
                        {/* 🔵 DOT + LINE */}
                        <div className="flex flex-col items-center">
                            <div
                                className={`
                                    w-5 h-5 rounded-full flex items-center justify-center
                                    transition-all duration-300
                                    ${
                                        isDone
                                            ? "bg-green-500"
                                            : isCurrent
                                              ? "bg-[var(--color-primary)] scale-110"
                                              : "bg-gray-300"
                                    }
                                `}
                            >
                                {/* CHECK ICON */}
                                {isDone && (
                                    <svg
                                        className="w-3 h-3 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                )}
                            </div>

                            {/* LINE */}
                            {index !== steps.length - 1 && (
                                <div
                                    className={`
                                        w-[2px] flex-1 mt-1
                                        ${
                                            index < currentIndex
                                                ? "bg-green-500"
                                                : "bg-gray-300"
                                        }
                                    `}
                                />
                            )}
                        </div>

                        {/* 🔹 TEXT */}
                        <div className="pt-[2px]">
                            <p
                                className={`
                                    text-sm
                                    ${
                                        isCurrent
                                            ? "font-semibold text-[var(--text-primary)]"
                                            : isDone
                                              ? "text-[var(--text-primary)]"
                                              : "text-gray-400"
                                    }
                                `}
                            >
                                {step.label}
                            </p>

                            {/* OPTIONAL SUBTEXT */}
                            {isCurrent && getSubtext(step.key) && (
                                <p className="text-xs text-[var(--text-muted)]">
                                    {getSubtext(step.key)}
                                </p>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
