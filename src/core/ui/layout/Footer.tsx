// src/core/ui/layout/Footer.tsx

export default function Footer() {
    const TITLE = import.meta.env.VITE_APP_TITLE;
    const VERSION = import.meta.env.VITE_APP_VERSION;
    const COPYRIGHT = import.meta.env.VITE_APP_COPYRIGHT;
    const MAX_WIDTH = import.meta.env.VITE_APP_MAX_WIDTH;

    return (
        <footer className="border-t border-gray-200 bg-linear-to-b from-white to-gray-50">
            <div
                className="mx-auto w-full px-6 py-4"
                style={{ maxWidth: MAX_WIDTH }}
            >
                <div className="flex items-center justify-between text-sm">
                    {/* Left */}
                    <div className="flex items-center gap-3">
                        <span className="font-semibold text-gray-800 tracking-wide">
                            {TITLE}
                        </span>

                        <span className="text-gray-300">|</span>

                        <span className="text-gray-500">
                            © {new Date().getFullYear()} {COPYRIGHT}
                        </span>
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium tracking-wide">
                            v{VERSION}
                        </span>

                        <span className="h-4 w-px bg-gray-200" />

                        <span className="text-gray-400">
                            Engineered with precision
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
