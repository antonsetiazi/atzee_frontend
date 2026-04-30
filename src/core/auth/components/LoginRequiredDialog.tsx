// src/core/auth/components/LoginRequiredDialog.tsx
import AlertDialog from "@/core/ui/components/alert_dialog/AlertDialog";
import AlertDialogHeader from "@/core/ui/components/alert_dialog/AlertDialogHeader";
import AlertDialogContent from "@/core/ui/components/alert_dialog/AlertDialogContent";
import AlertDialogFooter from "@/core/ui/components/alert_dialog/AlertDialogFooter";

interface Props {
    open: boolean;
    onClose: () => void;
    onLogin: () => void;
}

export default function LoginRequiredDialog({ open, onClose, onLogin }: Props) {
    return (
        <AlertDialog open={open} onClose={onClose} className="max-w-[90vw]">
            <AlertDialogHeader>Login Dibutuhkan</AlertDialogHeader>
            <AlertDialogContent>
                Untuk menggunakan fitur ini, kamu perlu login terlebih dahulu.
            </AlertDialogContent>
            <AlertDialogFooter>
                <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl border border-[var(--color-border)] text-sm"
                >
                    Batal
                </button>
                <button
                    onClick={onLogin}
                    className="px-4 py-2 rounded-xl bg-[var(--color-primary)] text-white text-sm"
                >
                    Login
                </button>
            </AlertDialogFooter>
        </AlertDialog>
    );
}
