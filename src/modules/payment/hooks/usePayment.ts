// src/modules/payment/hooks/usePayment.ts

import { useEffect, useRef, useState } from "react";
import { httpGet } from "@/core/http/http.client";

type PaymentUIState = "loading" | "success" | "failed";

interface OrderResponse {
    id: string;
    status: "pending" | "paid" | "failed";
}

export function usePayment(orderId: string | null) {
    const [status, setStatus] = useState<PaymentUIState>("loading");
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        if (!orderId) return;

        async function checkStatus() {
            try {
                const res = await httpGet<OrderResponse>(`/orders/${orderId}`);

                if (res.status === "paid") {
                    setStatus("success");
                    stopPolling();
                } else if (res.status === "failed") {
                    setStatus("failed");
                    stopPolling();
                } else {
                    setStatus("loading");
                }
            } catch (err) {
                console.error(err);
                // optional: bisa kasih retry strategy
            }
        }

        function startPolling() {
            checkStatus(); // first hit

            intervalRef.current = window.setInterval(() => {
                checkStatus();
            }, 4000); // 4 detik
        }

        function stopPolling() {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }

        startPolling();

        return () => {
            stopPolling();
        };
    }, [orderId]);

    return {
        status,
    };
}
