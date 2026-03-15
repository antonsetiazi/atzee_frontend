import { AppBar, CircleAvatar } from "@/core/ui/components";

export default function AppBarSample() {
    return (
        <div>
            <AppBar
                left={<button>☰</button>}
                title="Dashboard"
                right={<button>🔔</button>}
            />

            <AppBar
                title="Profile"
                right={<CircleAvatar name="Anton Setiazi" />}
            />

            <AppBar
                left={<button>←</button>}
                title="Orders"
                right={
                    <>
                        <button>🔍</button>
                        <button>⋯</button>
                    </>
                }
            />
        </div>
    );
}
