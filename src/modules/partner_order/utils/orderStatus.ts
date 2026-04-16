// src/modules/partner_order/utils/orderStatus.ts

export function getStatusLabel(status: string) {
    switch (status) {
        case "pending":
            return "Menunggu Konfirmasi";
        case "accepted":
            return "Diterima";
        case "on_going":
            return "Sedang Berjalan";
        case "completed_by_partner":
            return "Menunggu Konfirmasi Customer";
        case "completed":
            return "Selesai";
        case "cancelled":
            return "Dibatalkan";
        default:
            return status;
    }
}

export function getStatusColor(status: string) {
    switch (status) {
        case "pending":
            return "bg-yellow-100 text-yellow-600";
        case "accepted":
            return "bg-blue-100 text-blue-600";
        case "on_going":
            return "bg-indigo-100 text-indigo-600";
        case "completed_by_partner":
            return "bg-orange-100 text-orange-600";
        case "completed":
            return "bg-green-100 text-green-600";
        case "cancelled":
            return "bg-red-100 text-red-600";
        default:
            return "bg-gray-100 text-gray-600";
    }
}
