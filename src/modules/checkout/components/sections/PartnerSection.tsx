// src/modules/checkout/components/sections/PartnerSection.tsx

interface Props {
    partner?: {
        name: string;
    };
}

export default function PartnerSection({ partner }: Props) {
    if (!partner) return null;

    return (
        <div className="space-y-2">
            <p className="text-sm font-medium">Partner</p>

            <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] flex justify-between">
                <div>
                    <p className="font-medium">{partner.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">
                        Layanan akan dilakukan oleh partner ini
                    </p>
                </div>

                <div className="text-xs px-2 py-1 rounded-lg bg-green-100 text-green-600">
                    Aktif
                </div>
            </div>
        </div>
    );
}
