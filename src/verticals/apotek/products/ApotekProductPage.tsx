import CoreEntityPage from "@/business/entities/CoreEntityPage";

export default function ApotekProductPage() {
    return (
        <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded p-4">
                <h1 className="text-xl font-semibold text-blue-900">
                    Produk Apotek
                </h1>
                <p className="text-sm text-blue-700">
                    Manajemen produk khusus apotek
                </p>
            </div>

            {/* 🔥 CORE ENGINE — TANPA OVERRIDE */}
            <CoreEntityPage />
        </div>
    );
}
