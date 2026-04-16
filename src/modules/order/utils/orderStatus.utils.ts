// src/modules/order/utils/orderStatus.utils.ts

export function getStatusStyle(status: string) {
    switch (status) {
        case "paid":
            return "bg-green-100 text-green-600";
        case "pending":
            return "bg-yellow-100 text-yellow-600";
        case "failed":
            return "bg-red-100 text-red-600";
        case "completed":
            return "bg-blue-100 text-blue-600";
        default:
            return "bg-gray-100 text-gray-500";
    }
}
