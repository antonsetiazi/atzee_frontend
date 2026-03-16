// src/core/ui/components/alert_dialog/AlertDialog.tsx

import type { AlertDialogProps } from "./alert_dialog.types";
import { Modal } from "@/core/ui/components";

export default function AlertDialog({
    open,
    onClose,
    children,
}: AlertDialogProps) {
    return (
        <Modal open={open} onClose={onClose} className="max-w-md">
            {children}
        </Modal>
    );
}
