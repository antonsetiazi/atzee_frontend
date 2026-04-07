// src/modules/checkout/components/sections/AddressSection.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

interface Props {
    address?: any;
    onClick: () => void;
}

export default function AddressSection({ address, onClick }: Props) {
    return (
        <div className="space-y-2">
            <p className="text-sm font-medium">Alamat</p>

            <button
                onClick={onClick}
                className="w-full p-4 rounded-xl border border-[var(--color-border)] text-left bg-[var(--color-surface)]"
            >
                {address ? (
                    <div className="space-y-1">
                        <p className="font-medium">{address.label}</p>
                        <p className="text-sm text-gray-600">
                            {address.address_line}, {address.city}
                        </p>
                        <p className="text-xs text-gray-500">
                            {address.recipient_name} • {address.phone}
                        </p>
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">Pilih alamat</p>
                )}
            </button>
        </div>
    );
}
