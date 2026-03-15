import { Heading } from "@/core/ui/components";

export default function HeadingSample() {
    return (
        <div>
            <Heading level={1}>Dashboard</Heading>
            <Heading level={2}>Recent Orders</Heading>
            <Heading level={4}>Payment Summary</Heading>
            <Heading level={3} muted>
                System Logs
            </Heading>
        </div>
    );
}
