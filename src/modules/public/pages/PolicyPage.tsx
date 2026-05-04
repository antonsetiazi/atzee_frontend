// src/modules/public/pages/PolicyPage.tsx

import { usePolicy } from "../hooks/usePolicy";

export default function PolicyPage({ type }: { type: string }) {
    const data = usePolicy(type);

    if (!data) {
        return (
            <div className="flex justify-center py-20 text-[var(--text-muted)]">
                Loading policy...
            </div>
        );
    }

    const formattedContent = formatContentToHtml(data.content);

    return (
        <div className="bg-[var(--color-background)]">
            {/* HEADER SECTION */}
            <div className="border-b border-[var(--color-border)]">
                <div className="mx-auto px-4 py-10">
                    <h1 className="text-3xl font-semibold text-[var(--text-primary)]">
                        {data.title}
                    </h1>

                    <div className="mt-3 flex items-center gap-4 text-sm text-[var(--text-muted)]">
                        <span>Version {data.version}</span>
                        <span>•</span>
                        <span>
                            Updated{" "}
                            {new Date(data.updated_at).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </div>

            {/* CONTENT */}
            <div className="px-4 py-10">
                <div
                    className="text-xl space-y-2 text-[var(--text-secondary)] leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: formattedContent }}
                />
            </div>
        </div>
    );
}

function formatContentToHtml(content: string) {
    return content
        .split(/\n\s*\n/) // 🔥 lebih fleksibel
        .map((p) => p.trim())
        .filter((p) => p.length > 0)
        .map((p) => `<p>${p.replace(/\n/g, "<br />")}</p>`)
        .join("");
}
