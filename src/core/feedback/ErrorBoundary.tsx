import { Component, type ReactNode } from "react";
import { useFeedbackStore } from "./feedback.store";

/**
 * Props untuk komponen ErrorBoundary.
 */
interface Props {
    /** Komponen anak yang akan dipantau terhadap runtime error. */
    children: ReactNode;
}

/**
 * # ErrorBoundary
 * * Komponen ini berfungsi sebagai "jaring pengaman" untuk menangkap runtime error
 * pada seluruh pohon komponen di bawahnya.
 * * ### Fitur Utama:
 * - Menangkap error pada metode render dan lifecycle komponen anak.
 * - Mengintegrasikan error ke dalam `useFeedbackStore` untuk ditampilkan sebagai notifikasi UI.
 * - Mencatat detail error ke konsol untuk keperluan debugging.
 * * ### Contoh Penggunaan:
 * ```tsx
 * <ErrorBoundary>
 * <MyApp />
 * </ErrorBoundary>
 * ```
 * * @remarks
 * Saat ini komponen ini tidak menampilkan UI cadangan (Fallback UI).
 * Jika error terjadi, komponen anak tidak akan muncul namun notifikasi error akan dipicu.
 */

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

    /**
     * Merender komponen anak secara normal.
     */
    render() {
        return this.props.children;
    }
}
