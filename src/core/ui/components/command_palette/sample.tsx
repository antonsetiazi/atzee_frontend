import { useState } from "react";
import { CommandPalette, Button } from "@/core/ui/components";

export default function CommandPaletteSample() {
    const [open, setOpen] = useState(false);

    const items = [
        {
            id: "dashboard",
            title: "Go to Dashboard",
            description: "Open main dashboard",
            onSelect: () => alert("Dashboard"),
        },

        {
            id: "create-user",
            title: "Create User",
            description: "Add a new user",
            onSelect: () => alert("Create user"),
        },

        {
            id: "settings",
            title: "Open Settings",
            description: "Manage system settings",
            onSelect: () => alert("Settings"),
        },
    ];

    return (
        <div>
            <Button onClick={() => setOpen(true)}>Open Command Palette</Button>

            <CommandPalette
                open={open}
                onClose={() => setOpen(false)}
                items={items}
            />
        </div>
    );
}
