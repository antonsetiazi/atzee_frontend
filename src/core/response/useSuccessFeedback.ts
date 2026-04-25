// src/core/response/useSuccessFeedback.ts

import { useFeedbackStore } from "@/core/feedback/feedback.store";
import { getSuccessMessage } from "./response.success";

export function useSuccessFeedback() {
    function showSuccess(message?: string) {
        useFeedbackStore.getState().push({
            type: "success",
            title: "Success",
            message: getSuccessMessage(message),
        });
    }

    return {
        showSuccess,
    };
}
