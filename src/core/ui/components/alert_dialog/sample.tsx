import {
    AlertDialog,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogFooter,
    Button,
} from "@/core/ui/components";

import { useState } from "react";

export default function AlertDialogSample() {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Button onClick={() => setOpen(true)}>Delete User</Button>

            <AlertDialog open={open} onClose={() => setOpen(false)}>
                <AlertDialogHeader>Delete User</AlertDialogHeader>

                <AlertDialogContent>
                    This action cannot be undone. This will permanently delete
                    the user.
                </AlertDialogContent>

                <AlertDialogFooter>
                    <Button variant="secondary" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>

                    <Button
                        variant="danger"
                        onClick={() => {
                            alert("User deleted");
                            setOpen(false);
                        }}
                    >
                        Delete
                    </Button>
                </AlertDialogFooter>
            </AlertDialog>
        </div>
    );
}
