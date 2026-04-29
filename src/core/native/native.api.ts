// src/core/native/native.api.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
    interface Window {
        AtzeeBridge?: {
            request?: (event: string, payload?: any) => Promise<any>;
            postMessage?: (event: string, payload?: any) => void;
        };
    }
}

function available() {
    return typeof window !== "undefined" && !!window.AtzeeBridge;
}

async function request(event: string, payload?: any) {
    if (!available()) {
        console.warn("Native bridge unavailable:", event);
        return null;
    }

    return await window.AtzeeBridge!.request?.(event, payload);
}

export const nativeApi = {
    available,

    toast(message: string) {
        return request("toast", { message });
    },

    vibrate() {
        return request("vibrate");
    },

    getToken(): Promise<string | null> {
        return request("get_token");
    },

    getDeviceInfo() {
        return request("get_device_info");
    },

    logout() {
        return request("logout");
    },

    ping() {
        return request("ping");
    },

    openCamera(): Promise<{
        base64: string;
        name: string;
        mime: string;
    } | null> {
        return request("open_camera");
    },

    capturePhoto() {
        return request("capture_photo");
    },

    pickImage() {
        return request("pick_image");
    },

    pickFile() {
        return request("pick_file");
    },

    share(payload: { text?: string; url?: string }) {
        return request("share", payload);
    },

    getLocation() {
        return request("get_location");
    },

    downloadFile(payload: { url: string; filename?: string }) {
        return request("download_file", payload);
    },

    biometricCheck() {
        return request("biometric_check");
    },

    biometricAuth() {
        return request("biometric_auth");
    },

    scanQr() {
        return request("scan_qr");
    },

    nfcRead() {
        return request("nfc_read");
    },
};
