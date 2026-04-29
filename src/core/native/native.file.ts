// src/core/native/native.file.ts

export function base64ToBlob(base64: string, mime = "image/jpeg"): Blob {
    const clean = base64.replace(/^data:.*;base64,/, "");
    const bytes = atob(clean);

    const arr = new Uint8Array(bytes.length);

    for (let i = 0; i < bytes.length; i++) {
        arr[i] = bytes.charCodeAt(i);
    }

    return new Blob([arr], { type: mime });
}
