import { ProgressIndicator } from "@/core/ui/components";

export default function ProgressIndicatorSample() {
    return (
        <div>
            <ProgressIndicator value={45} label="Uploading file..." />
            <ProgressIndicator variant="circle" value={72} label="72%" />
            <ProgressIndicator variant="indeterminate" label="Loading..." />
        </div>
    );
}
