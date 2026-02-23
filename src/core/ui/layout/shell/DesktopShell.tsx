// src/core/ui/layout/shell/DesktopShell.tsx

// import Sidebar from "../Sidebar";
import AppTopbar from "../AppTopbar";

export default function DesktopShell({
    children,
}: {
    children: React.ReactNode;
}) {
    const MAX_WIDTH = import.meta.env.VITE_APP_MAX_WIDTH;
    return (
        <div className="flex h-screen bg-gray-100">
            {/* <Sidebar /> */}

            <div className="flex flex-1 flex-col overflow-hidden bg-white">
                <AppTopbar />

                <main className="flex-1 overflow-y-auto p-4">
                    <div
                        className="mx-auto w-full"
                        style={{ maxWidth: MAX_WIDTH }}
                    >
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
