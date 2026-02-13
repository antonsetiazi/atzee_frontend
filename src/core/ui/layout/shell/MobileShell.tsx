// src/core/ui/layout/shell/MobileShell.tsx

import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import { useShell } from "./ShellContext";
import BottomNavigation from "@/core/ui/navigation/components/BottomNavigation";

export default function MobileShell({
    children,
}: {
    children: React.ReactNode;
}) {
    const { drawerOpen, closeDrawer } = useShell();

    return (
        <div className="relative flex h-screen flex-col bg-gray-100">
            {/* Drawer Overlay */}
            {drawerOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40"
                    onClick={closeDrawer}
                />
            )}

            {/* Drawer */}
            <div
                className={`
                    fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform
                    ${drawerOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                <Sidebar />
            </div>

            {/* Main */}
            <div className="flex flex-1 flex-col">
                <Topbar />

                <main className="flex-1 overflow-y-auto p-3">
                    {children}
                    <BottomNavigation />
                </main>
            </div>
        </div>
    );
}
