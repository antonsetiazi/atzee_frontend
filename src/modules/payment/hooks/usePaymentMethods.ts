/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { getPaymentMethods } from "../api/payment.api";
import type { PaymentMethod } from "../types/payment.types";

export function usePaymentMethods() {
    const [methods, setMethods] = useState<PaymentMethod[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchMethods() {
            try {
                setLoading(true);

                const data = await getPaymentMethods();
                setMethods(data);
            } catch (err: any) {
                console.error(err);
                setError("Gagal mengambil metode pembayaran");
            } finally {
                setLoading(false);
            }
        }

        fetchMethods();
    }, []);

    return {
        methods,
        loading,
        error,
    };
}
