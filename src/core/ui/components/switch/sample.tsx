import { useState } from "react";
import { Switch } from "@/core/ui/components";

export default function SwitchSample() {
    const [enabled, setEnabled] = useState(false);

    return (
        <div className="p-10 space-y-6">
            <Switch
                label="Enable Notifications"
                description="Receive email notifications"
                checked={enabled}
                onChange={setEnabled}
            />

            <Switch label="Dark Mode" size="lg" />
        </div>
    );
}
