import { Badge } from "@/core/ui/components";

export default function BadgeSample() {
    return (
        <div>
            <Badge color="success">Active</Badge>
            <Badge color="warning">Pending</Badge>
            <Badge color="primary" variant="outline">
                Admin
            </Badge>
            <Badge size="sm">New</Badge>
        </div>
    );
}
