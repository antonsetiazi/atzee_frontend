// src/core/feedback/ErrorBoundary.tsx

import { Component, type ReactNode } from "react";
import { useFeedbackStore } from "./feedback.store";

interface Props {
    /** Komponen anak yang akan dipantau terhadap runtime error. */
    children: ReactNode;
}

export class ErrorBoundary extends Component<Props> {
    /**
     * Lifecycle method yang dipanggil secara otomatis oleh React saat terjadi error
     * di komponen anak.
     * * @param error - Objek error yang ditangkap.
     */
    componentDidCatch(error: unknown) {
        // Mengirim pesan error ke store global untuk memicu notifikasi toast/modal
        useFeedbackStore.getState().push({
            type: "error",
            title: "Unexpected Error",
            message: "Something went wrong. Please refresh.",
        });

        console.error(error);
    }

    render() {
        return this.props.children;
    }
}
