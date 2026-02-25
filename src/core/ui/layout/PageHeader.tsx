// src/core/ui/layout/PageHeader.tsx

interface PageHeaderProps {
    title?: string;
    description?: string | null;
    isMobile: boolean;
}

export default function PageHeader({
    title,
    description,
    isMobile,
}: PageHeaderProps) {
    return isMobile ? (
        /* MOBILE VERSION */
        <div className="bg-white border-b border-gray-100 px-4 pt-4 pb-3">
            <div className="space-y-1">
                <h1 className="text-xl font-semibold text-gray-900 tracking-tight">
                    {title}
                </h1>

                {description && (
                    <p className="text-sm text-gray-500 leading-relaxed">
                        {description}
                    </p>
                )}
            </div>
        </div>
    ) : (
        /* DESKTOP VERSION */
        <div className="flex items-center justify-between px-4 py-4 bg-white">
            <h1 className="text-lg font-semibold text-gray-900">
                {title || "Entity"}
            </h1>
            {description && (
                <p className="text-sm text-gray-500">{description}</p>
            )}
        </div>
    );
}
