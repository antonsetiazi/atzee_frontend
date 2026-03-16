import { StatusBadge } from "@/core/ui/components/";
import Icon from "../../icons/Icon";

export default function StatusBadgeSample() {
    return (
        <div className="max-w-3xl mx-auto p-8">
            <p>Basic</p>
            <StatusBadge>Draft</StatusBadge>

            <p>Success</p>
            <StatusBadge tone="success">Paid</StatusBadge>

            <p>Warning</p>
            <StatusBadge tone="warning">Pending</StatusBadge>

            <p>Danger</p>
            <StatusBadge tone="danger">Failed</StatusBadge>

            <p>Dengan Icon</p>
            <StatusBadge
                tone="success"
                icon={<Icon name="check-circle" size="sm" />}
            >
                Active
            </StatusBadge>

            <p>Animated (Live Status)</p>
            <StatusBadge tone="success" pulse>
                Live
            </StatusBadge>
        </div>
    );
}
