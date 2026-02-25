// src/core/ui/layout/shell/MobileShell.tsx

import Sidebar from "../Sidebar";
import { useShell } from "./ShellContext";
import BottomNavigation from "@/core/ui/navigation/components/BottomNavigation";

export default function MobileShell({
    children,
}: {
    children: React.ReactNode;
}) {
    const { drawerOpen, closeDrawer } = useShell();

    const bottomNavHeight = 64; // px

    return (
        <div className="relative flex h-screen flex-col bg-white">
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
                <main
                    className="flex-1 overflow-y-auto"
                    style={{ paddingBottom: bottomNavHeight }}
                >
                    {children}
                </main>

                {/* Fixed Bottom Navigation */}
                <div
                    className="fixed bottom-0 left-0 w-full z-30"
                    style={{ height: bottomNavHeight }}
                >
                    <BottomNavigation />
                </div>
            </div>
        </div>
    );
}
