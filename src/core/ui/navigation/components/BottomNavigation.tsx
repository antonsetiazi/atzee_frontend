// src/core/ui/navigation/components/BottomNavigation.tsx

import { useNavigationStore } from "@/core/ui/navigation/navigation.store";
import { useNavigate } from "react-router-dom";
import Icon from "@/core/ui/icons/Icon";

export default function BottomNavigation() {
    const navigate = useNavigate();
    const items = useNavigationStore((s) => s.bottom);
    // console.log(items);

    if (!items.length) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t flex justify-around items-center">
            {items.map((item) => (
                <button
                    key={item.target}
                    onClick={() => item.route && navigate(item.route)}
                    className={`flex flex-col items-center text-xs ${
                        item.is_primary
                            ? "text-blue-600 font-bold"
                            : "text-gray-600"
                    }`}
                >
                    <Icon name={item.icon} className="w-5 h-5" />
                    <span>{item.label}</span>
                </button>
            ))}
        </div>
    );
}
