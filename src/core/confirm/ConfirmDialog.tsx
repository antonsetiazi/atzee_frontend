// src/core/confirm/ConfirmDialog.tsx

import { useConfirmStore } from "./confirm.store";
import {
    AlertDialog,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogFooter,
} from "@/core/ui/components";
import { button } from "@/core/ui/class/button.ui.class";

export default function ConfirmDialog() {
    const { current, close } = useConfirmStore();

    if (!current) return null;

    const isDanger = current.level === "danger";

    return (
        <AlertDialog open={true} onClose={() => close(false)}>
            <AlertDialogHeader>
                {current.title ?? "Konfirmasi"}
            </AlertDialogHeader>

            <AlertDialogContent>{current.message}</AlertDialogContent>

            <AlertDialogFooter>
                <button className={button.base} onClick={() => close(false)}>
                    Batal
                </button>

                <button
                    className={`${button.base} ${
                        isDanger ? button.danger : button.primary
                    }`}
                    onClick={() => close(true)}
                >
                    Ya, Lanjutkan
                </button>
            </AlertDialogFooter>
        </AlertDialog>
    );
}
