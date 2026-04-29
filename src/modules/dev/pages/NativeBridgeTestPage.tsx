// src/modules/dev/pages/NativeBridgeTestPage.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { nativeApi } from "@/core/native/native.api";
import { parseScan } from "@/core/scanner/scanner.smart";

export default function NativeBridgeTestPage() {
    const [result, setResult] = useState<any>(null);

    async function handleTest() {
        try {
            await nativeApi.toast("Hello from React");
            await nativeApi.vibrate();

            const token = await nativeApi.getToken();

            let info = null;

            try {
                info = await nativeApi.getDeviceInfo();
            } catch (e) {
                console.error(e);
                info = { error: "device info failed" };
            }

            setResult({ token, info });
        } catch (error) {
            console.error(error);
            setResult({ error: String(error) });
        }
    }

    async function handleCamera() {
        const result = await nativeApi.openCamera();
        setResult(result);
    }

    async function handleDownload() {
        console.log("CLICK DOWNLOAD");

        const result = await nativeApi.downloadFile({
            url: "https://file-examples.com/storage/fe1b0a7d1e/sample.pdf",
            filename: "dummy.pdf",
        });

        console.log("DOWNLOAD RESULT:", result);
    }

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-xl font-bold">Native Bridge Test</h1>

            <button
                onClick={handleTest}
                className="px-4 py-2 rounded bg-indigo-600 text-white"
            >
                Run Native Test
            </button>

            <button
                onClick={handleCamera}
                className="px-4 py-2 rounded bg-green-600 text-white"
            >
                Open Camera
            </button>

            <button
                onClick={async () => setResult(await nativeApi.capturePhoto())}
                className="px-4 py-2 rounded bg-blue-600 text-white"
            >
                Capture Photo
            </button>

            <button
                onClick={async () => setResult(await nativeApi.pickImage())}
                className="px-4 py-2 rounded bg-green-600 text-white"
            >
                Pick Image
            </button>

            <button
                onClick={async () => setResult(await nativeApi.pickFile())}
                className="px-4 py-2 rounded bg-purple-600 text-white"
            >
                Pick File
            </button>

            <button
                onClick={async () => {
                    await nativeApi.share({
                        text: "Coba aplikasi Atzee",
                        url: window.location.href,
                    });
                }}
                className="px-4 py-2 rounded bg-pink-600 text-white"
            >
                Share Native
            </button>

            <button
                onClick={async () => {
                    const loc = await nativeApi.getLocation();
                    setResult(loc);
                }}
                className="px-4 py-2 rounded bg-orange-600 text-white"
            >
                Get GPS
            </button>

            <button
                onClick={handleDownload}
                className="px-4 py-2 rounded bg-cyan-600 text-white"
            >
                Download File
            </button>

            <button
                onClick={async () => {
                    const ok = await nativeApi.biometricAuth();
                    setResult({ biometric: ok });
                }}
                className="px-4 py-2 rounded bg-green-600 text-white"
            >
                Test Biometric
            </button>

            <button
                onClick={async () => {
                    const code = await nativeApi.scanQr();
                    setResult({ qr: code });
                }}
                className="px-4 py-2 rounded bg-black text-white"
            >
                Scan QR
            </button>

            <button
                onClick={async () => {
                    const raw = await nativeApi.scanQr();

                    if (!raw) return;

                    const result = parseScan(raw);

                    setResult(result);
                }}
                className="px-4 py-2 rounded bg-black text-white"
            >
                Smart Scan
            </button>

            <button
                onClick={async () => {
                    const data = await nativeApi.nfcRead();
                    setResult(data);
                }}
                className="px-4 py-2 rounded bg-yellow-600 text-white"
            >
                Test NFC
            </button>

            <pre className="bg-gray-100 p-4 rounded text-sm">
                {JSON.stringify(result, null, 2)}
            </pre>
        </div>
    );
}
