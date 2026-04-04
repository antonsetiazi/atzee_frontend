// src/core/payment/snapLoader.ts

let snapLoaded = false;

export function loadSnapScript(clientKey: string): Promise<void> {
    return new Promise((resolve, reject) => {
        if (snapLoaded) {
            resolve();
            return;
        }

        const script = document.createElement("script");
        script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
        script.setAttribute("data-client-key", clientKey);
        script.async = true;

        script.onload = () => {
            snapLoaded = true;
            resolve();
        };

        script.onerror = () => {
            reject(new Error("Failed to load Midtrans Snap"));
        };

        document.body.appendChild(script);
    });
}
