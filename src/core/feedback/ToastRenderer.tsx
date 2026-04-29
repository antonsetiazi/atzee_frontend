// src/core/feedback/ToastRenderer.tsx

// src/core/feedback/ToastRenderer.tsx

import { useEffect } from "react";
import { useFeedbackStore } from "./feedback.store";
import type { FeedbackMessage } from "./feedback.types";
import { useBreakpoint } from "../ui/layout/hooks/useBreakpoint";

const AUTO_DISMISS_MS = 4000;

export default function ToastRenderer() {
    const { messages, remove } = useFeedbackStore();
    const { isMobile } = useBreakpoint();

    if (messages.length === 0) return null;

    return (
        <div
            className={
                isMobile
                    ? `
                    fixed inset-x-0 z-[10000]
                    px-3
                    pointer-events-none
                    flex flex-col gap-3
                `
                    : `
                    fixed top-6 right-6 z-[10000]
                    w-full max-w-sm
                    flex flex-col gap-3
                `
            }
            style={
                isMobile
                    ? {
                          bottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)",
                      }
                    : undefined
            }
        >
            {messages.map((msg) => (
                <ToastItem
                    key={msg.id}
                    msg={msg}
                    onClose={() => remove(msg.id)}
                    mobile={isMobile}
                />
            ))}
        </div>
    );
}

interface ToastItemProps {
    msg: FeedbackMessage;
    onClose: () => void;
    mobile: boolean;
}

function ToastItem({ msg, onClose, mobile }: ToastItemProps) {
    useEffect(() => {
        const timer = setTimeout(onClose, AUTO_DISMISS_MS);
        return () => clearTimeout(timer);
    }, [onClose]);

    const variantStyles = {
        success: {
            bg: "bg-emerald-600",
            ring: "ring-emerald-500/20",
        },
        error: {
            bg: "bg-rose-600",
            ring: "ring-rose-500/20",
        },
        warning: {
            bg: "bg-amber-500",
            ring: "ring-amber-500/20",
        },
        info: {
            bg: "bg-sky-600",
            ring: "ring-sky-500/20",
        },
    };

    const style = variantStyles[msg.type] || variantStyles.info;

    if (mobile) {
        return (
            <div
                onClick={onClose}
                className={`
                    pointer-events-auto
                    relative
                    overflow-hidden
                    rounded-2xl
                    ${style.bg}
                    text-white
                    px-4 py-3.5
                    shadow-[0_10px_30px_rgba(0,0,0,0.22)]
                    ring-1 ${style.ring}
                    active:scale-[0.985]
                    transition-transform duration-150
                    animate-[toastNative_.34s_cubic-bezier(.22,1,.36,1)]
                `}
            >
                <div className="flex items-start gap-3">
                    {/* Dot Icon */}
                    <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-white/90" />

                    <div className="min-w-0 flex-1">
                        {msg.title && (
                            <div className="text-[14px] font-semibold leading-tight">
                                {msg.title}
                            </div>
                        )}

                        <div
                            className={`${
                                msg.title ? "mt-0.5" : ""
                            } text-[13px] leading-snug text-white/90`}
                        >
                            {msg.message}
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white/20">
                    <div className="h-full w-full origin-left bg-white/70 animate-[toastProgress_4s_linear_forwards]" />
                </div>
            </div>
        );
    }

    return (
        <div
            className={`
                group relative cursor-pointer
                overflow-hidden rounded-2xl border border-gray-200
                bg-white px-4 py-3
                shadow-[0_10px_25px_rgba(0,0,0,0.12)]
                transition-all duration-200
                hover:-translate-y-0.5
                hover:shadow-[0_12px_30px_rgba(0,0,0,0.15)]
            `}
            onClick={onClose}
        >
            <div className={`absolute left-0 top-0 h-full w-1 ${style.bg}`} />

            <div className="pl-3">
                {msg.title && (
                    <div className="mb-0.5 text-sm font-semibold text-gray-900">
                        {msg.title}
                    </div>
                )}

                <div className="text-sm leading-snug text-gray-600">
                    {msg.message}
                </div>
            </div>
        </div>
    );
}
