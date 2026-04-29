// src/core/native/native.debug.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

export function debugNative(message: string, data?: any) {
    window.AtzeeBridge?.postMessage?.("debug_log", {
        message,
        data: JSON.stringify(data),
    });
}
