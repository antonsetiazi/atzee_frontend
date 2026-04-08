// src/modules/account/address/components/AddressEmptyState.tsx

export default function AddressEmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center">
            <div className="text-3xl">🏠</div>
            <h2 className="text-xl font-semibold">No addresses yet</h2>
            <p className="text-gray-500 text-sm">
                You don’t have any saved addresses. Add a new address to get
                started.
            </p>
        </div>
    );
}
