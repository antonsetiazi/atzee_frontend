// src/core/feedback/feedback.types.ts

export type FeedbackType = "success" | "error" | "warning" | "info";

export interface FeedbackMessage {
    id: string;
    type: FeedbackType;
    title?: string;
    message: string;
    duration?: number; // ms
}
