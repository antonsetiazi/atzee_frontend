import { useState } from "react";
import { Checkbox } from "@/core/ui/components";

export default function CheckboxSample() {
    const [agree, setAgree] = useState(false);

    return (
        <div className="p-10 space-y-6">
            <Checkbox
                label="I agree to the terms"
                checked={agree}
                onChange={setAgree}
            />

            <Checkbox
                label="Enable marketing emails"
                description="You can unsubscribe anytime"
            />
        </div>
    );
}
