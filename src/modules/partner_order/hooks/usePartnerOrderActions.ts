// src/modules/partner_order/hooks/usePartnerOrderActions.ts

import { useState } from "react";
import {
    acceptOrderApi,
    partnerCompleteOrderApi,
    startOrderApi,
} from "../partner_order.api";
import { useConfirm } from "@/core/confirm/useConfirm";
import { useFeedback } from "@/core/feedback/useFeedback";

export function usePartnerOrderActions(orderId: string) {
    const [loading, setLoading] = useState(false);

    const confirm = useConfirm();
    const feedback = useFeedback();

    const handleAccept = async () => {
        const approved = await confirm({
            title: "Terima Order",
            message: "Apakah kamu yakin ingin menerima order ini?",
            level: "info",
        });

        if (!approved) return;

        setLoading(true);

        try {
            await acceptOrderApi(orderId);
            feedback.success("Order berhasil diterima", "Berhasil");
            window.location.reload();
        } catch {
            feedback.error("Gagal menerima order", "Error");
        } finally {
            setLoading(false);
        }
    };

    const handleStart = async () => {
        const approved = await confirm({
            title: "Mulai Layanan",
            message: "Apakah kamu yakin ingin memulai layanan?",
            level: "info",
        });

        if (!approved) return;

        setLoading(true);

        try {
            await startOrderApi(orderId);
            feedback.success("Layanan dimulai", "Berhasil");
            window.location.reload();
        } catch {
            feedback.error("Gagal memulai layanan", "Error");
        } finally {
            setLoading(false);
        }
    };

    const handleComplete = async () => {
        const approved = await confirm({
            title: "Tandai Selesai",
            message: "Yakin layanan sudah selesai?",
            level: "info",
        });

        if (!approved) return;

        setLoading(true);

        try {
            await partnerCompleteOrderApi(orderId);
            feedback.success("Menunggu konfirmasi customer", "Berhasil");
            window.location.reload();
        } catch {
            feedback.error("Gagal menyelesaikan layanan", "Error");
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        handleAccept,
        handleStart,
        handleComplete,
    };
}
