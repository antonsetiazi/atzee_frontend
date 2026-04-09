// src/core/ui/layout/shell/DesktopShell.tsx

// import Sidebar from "../Sidebar";
import AppTopbar from "../AppTopbar";
import Footer from "../Footer";

export default function DesktopShell({
    children,
}: {
    children: React.ReactNode;
}) {
    const MAX_WIDTH = import.meta.env.VITE_APP_MAX_WIDTH;
    return (
        <div
            className="flex min-h-screen"
            style={{
                background: `
                    radial-gradient(circle at 20% 0%, 
                    var(--color-surface-alt), 
                    var(--color-background) 40%)
                `,
                color: "var(--text-primary)",
            }}
        >
            {/* <Sidebar /> */}

            <div className="flex flex-1 flex-col">
                <AppTopbar />

                {/* Main Content */}
                <main
                    className="flex-1 overflow-y-auto"
                    style={{
                        background: "var(--color-background)",
                        backdropFilter: "blur(6px)",
                    }}
                >
                    <div
                        className="mx-auto w-full px-6 py-8"
                        style={{ maxWidth: MAX_WIDTH }}
                    >
                        {children}
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
}
