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
        <div className="flex h-screen bg-gray-100">
            {/* <Sidebar /> */}

            <div className="flex flex-1 flex-col overflow-hidden">
                <AppTopbar />

                <main className="flex-1 overflow-y-auto">
                    <div
                        className="mx-auto w-full"
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
