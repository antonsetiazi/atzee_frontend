// src/modules/partner_order/components/RejectOrderModal.tsx

import { useState } from "react";
import Modal from "@/core/ui/components/modal/Modal";
import ModalHeader from "@/core/ui/components/modal/ModalHeader";
import ModalContent from "@/core/ui/components/modal/ModalContent";
import ModalFooter from "@/core/ui/components/modal/ModalFooter";

import { rejectOrderApi } from "../partner_order.api";
import { useFeedback } from "@/core/feedback/useFeedback";

export default function RejectOrderModal({
    open,
    onClose,
    orderId,
}: {
    open: boolean;
    onClose: () => void;
    orderId: string;
}) {
    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false);

    const feedback = useFeedback();

    const handleSubmit = async () => {
        if (!reason) {
            feedback.error("Pilih alasan terlebih dahulu", "Upps..");
            return;
        }

        setLoading(true);

        try {
            await rejectOrderApi(orderId, reason);

            feedback.success("Order ditolak & dana dikembalikan");

            onClose();
            window.location.reload();
        } catch {
            feedback.error("Gagal menolak order");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <ModalHeader>Tolak Order</ModalHeader>

            <ModalContent>
                <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full border rounded-lg p-2"
                >
                    <option value="">Pilih alasan</option>
                    <option>Jadwal tidak tersedia</option>
                    <option>Lokasi terlalu jauh</option>
                    <option>Kapasitas penuh</option>
                    <option>Lainnya</option>
                </select>

                <p className="text-xs text-gray-500 mt-3">
                    Dana customer akan dikembalikan otomatis.
                </p>
            </ModalContent>

            <ModalFooter>
                <button
                    onClick={onClose}
                    className="px-4 py-2 border rounded-lg"
                >
                    Batal
                </button>

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg"
                >
                    Tolak
                </button>
            </ModalFooter>
        </Modal>
    );
}
