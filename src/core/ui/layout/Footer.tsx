// src/core/ui/layout/Footer.tsx

export default function Footer() {
    const TITLE = import.meta.env.VITE_APP_TITLE;
    const VERSION = import.meta.env.VITE_APP_VERSION;
    const COPYRIGHT = import.meta.env.VITE_APP_COPYRIGHT;
    const MAX_WIDTH = import.meta.env.VITE_APP_MAX_WIDTH;

    return (
        <footer
            className="border-t backdrop-blur-sm"
            style={{
                borderColor: "var(--color-border)",
                background: "var(--color-surface)",
            }}
        >
            <div
                className="mx-auto w-full px-6 py-4"
                style={{ maxWidth: MAX_WIDTH }}
            >
                <div className="flex items-center justify-between text-sm">
                    {/* Left */}
                    <div className="flex items-center gap-3">
                        <span
                            className="font-semibold tracking-wide"
                            style={{ color: "var(--text-primary)" }}
                        >
                            {TITLE}
                        </span>

                        <span style={{ color: "var(--text-muted)" }}>|</span>

                        <span style={{ color: "var(--text-secondary)" }}>
                            © {new Date().getFullYear()} {COPYRIGHT}
                        </span>
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-4">
                        <span
                            className="px-3 py-1 text-xs font-medium tracking-wide"
                            style={{
                                background: "var(--color-surface-alt)",
                                color: "var(--text-secondary)",
                                borderRadius: "9999px",
                            }}
                        >
                            v{VERSION}
                        </span>

                        <span
                            className="h-4 w-px"
                            style={{
                                background: "var(--color-border)",
                            }}
                        />

                        <span style={{ color: "var(--text-muted)" }}>
                            Engineered with precision
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
