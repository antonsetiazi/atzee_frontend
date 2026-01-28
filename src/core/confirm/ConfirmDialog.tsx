// src/core/confirm/ConfirmDialog.tsx

import { useConfirmStore } from "./confirm.store";
import { button } from "@/core/ui/ui.class";

export default function ConfirmDialog() {
    const { current, close } = useConfirmStore();

    if (!current) return null;

    const isDanger = current.level === "danger";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 animate-fade-in">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm w-full max-w-md animate-scale-in">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800">
                        {current.title ?? "Confirm Action"}
                    </h3>
                </div>

                {/* Body */}
                <div className="px-6 py-5 text-sm text-gray-600">
                    {current.message}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-2">
                    <button
                        className={`${button.base}`}
                        onClick={() => close(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className={`${button.base} ${
                            isDanger ? button.danger : button.primary
                        }`}
                        onClick={() => close(true)}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}
