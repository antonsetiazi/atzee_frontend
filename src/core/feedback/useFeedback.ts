import { useFeedbackStore } from "./feedback.store";
import type { FeedbackType } from "./feedback.types";

export function useFeedback() {
    const push = useFeedbackStore((s) => s.push);

    return {
        notify: (type: FeedbackType, message: string, title?: string) => {
            push({ type, message, title });
        },

        success: (msg: string, title?: string) =>
            push({ type: "success", message: msg, title }),

        error: (msg: string, title?: string) =>
            push({ type: "error", message: msg, title }),

        warning: (msg: string, title?: string) =>
            push({ type: "warning", message: msg, title }),

        info: (msg: string, title?: string) =>
            push({ type: "info", message: msg, title }),
    };
}
