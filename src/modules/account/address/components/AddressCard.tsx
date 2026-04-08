// src/modules/account/address/components/AddressCard.tsx

import type { Address } from "../types/address.types";

interface Props {
    address: Address;
    onEdit?: (address: Address) => void;
    onDelete?: (address: Address) => void;
}

export default function AddressCard({ address, onEdit, onDelete }: Props) {
    return (
        <div
            className={`p-4 border rounded-2xl shadow-sm bg-white flex flex-col justify-between ${
                address.is_default ? "border-black" : "border-gray-200"
            }`}
        >
            <div className="space-y-1">
                <div className="font-semibold">{address.label}</div>
                <div className="text-sm text-gray-600">
                    {address.recipient_name}
                </div>
                <div className="text-sm text-gray-500">{address.phone}</div>
                <div className="text-sm text-gray-500">
                    {address.address_line}, {address.city}
                </div>
            </div>

            <div className="mt-4 flex justify-between">
                {onEdit && (
                    <button
                        onClick={() => onEdit(address)}
                        className="text-sm px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                        Edit
                    </button>
                )}
                {onDelete && (
                    <button
                        onClick={() => onDelete(address)}
                        className="text-sm px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                    >
                        Delete
                    </button>
                )}
            </div>
        </div>
    );
}
