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
        <div
            className="relative flex h-screen flex-col"
            style={{
                background: "var(--color-background)",
                color: "var(--text-primary)",
            }}
        >
            {/* Drawer Overlay */}
            {drawerOpen && (
                <div
                    className="fixed inset-0 z-40 backdrop-blur-sm transition-opacity"
                    style={{
                        background:
                            "var(--overlay-background, rgba(0,0,0,0.4))",
                    }}
                    onClick={closeDrawer}
                />
            )}

            {/* 🔥 Drawer */}
            <div
                className={`
                    fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300
                    ${drawerOpen ? "translate-x-0" : "-translate-x-full"}
                `}
                style={{
                    background: "var(--color-surface)",
                    // borderRight: "1px solid var(--color-border)",
                    // boxShadow: "var(--shadow)",
                }}
            >
                <Sidebar />
            </div>

            {/* 🔥 Main Area */}
            <div className="flex flex-1 flex-col">
                <main
                    className="flex-1 overflow-y-auto"
                    style={{
                        paddingBottom: bottomNavHeight,
                        background: "var(--color-background)",
                    }}
                >
                    {children}
                </main>

                {/* 🔥 Bottom Navigation */}
                <div
                    className="fixed bottom-0 left-0 w-full z-30"
                    style={{
                        height: bottomNavHeight,
                        background: "var(--color-surface)",
                        borderTop: "1px solid var(--color-border)",
                        boxShadow: "0 -2px 8px rgba(0,0,0,0.04)",
                    }}
                >
                    <BottomNavigation />
                </div>
            </div>
        </div>
    );
}
