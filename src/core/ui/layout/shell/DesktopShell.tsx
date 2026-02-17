// src/core/ui/layout/shell/DesktopShell.tsx

import Sidebar from "../Sidebar";
import AppTopbar from "../AppTopbar";

export default function DesktopShell({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />

            <div className="flex flex-1 flex-col overflow-hidden">
                <AppTopbar />

                <main className="flex-1 overflow-y-auto p-6">
                    <div className="mx-auto w-full max-w-400">{children}</div>
                </main>
            </div>
        </div>
    );
}
