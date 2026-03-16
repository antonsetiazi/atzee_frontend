import {
    Drawer,
    DrawerHeader,
    DrawerContent,
    DrawerFooter,
    Button,
} from "@/core/ui/components";

import { useState } from "react";

export default function DrawerSample() {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Button onClick={() => setOpen(true)}>Edit User</Button>

            <Drawer open={open} onClose={() => setOpen(false)}>
                <DrawerHeader>Edit User</DrawerHeader>

                <DrawerContent>
                    <div className="space-y-4">
                        <input
                            className="w-full border rounded px-3 py-2"
                            placeholder="Name"
                        />

                        <input
                            className="w-full border rounded px-3 py-2"
                            placeholder="Email"
                        />
                    </div>
                </DrawerContent>

                <DrawerFooter>
                    <Button variant="secondary" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>

                    <Button
                        onClick={() => {
                            alert("Saved");
                            setOpen(false);
                        }}
                    >
                        Save
                    </Button>
                </DrawerFooter>
            </Drawer>
        </div>
    );
}
