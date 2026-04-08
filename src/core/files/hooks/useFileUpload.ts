// src/core/files/hooks/useFileUpload.ts

import { useState } from "react";
import { uploadFile } from "../api/file.api";

export function useFileUpload() {
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState<number | null>(null);

    const upload = async (file: File) => {
        setLoading(true);
        setProgress(0);

        try {
            // NOTE: kalau nanti mau progress real, pakai axios onUploadProgress
            const res = await uploadFile(file);

            setProgress(100);

            return res; // { id, url, ... }
        } finally {
            setLoading(false);
        }
    };

    return {
        upload,
        loading,
        progress,
    };
}
