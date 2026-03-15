import { BottomNavigationBar } from "@/core/ui/components";

export default function BottomNavigationBarSample() {
    return (
        <BottomNavigationBar
            activeKey="home"
            items={[
                {
                    key: "home",
                    label: "Home",
                    icon: "🏠",
                },
                {
                    key: "orders",
                    label: "Orders",
                    icon: "📦",
                },
                {
                    key: "messages",
                    label: "Messages",
                    icon: "💬",
                    badge: 3,
                },
                {
                    key: "profile",
                    label: "Profile",
                    icon: "👤",
                },
            ]}
            onChange={(key) => {
                console.log(key);
            }}
        />
    );
}
