import { CircleAvatar, ListView } from "@/core/ui/components";
import { ListTile } from "@/core/ui/components";

export default function ListViewSample() {
    return (
        <div>
            <ListView divided>
                <ListTile title="Profile" />
                <ListTile title="Notifications" />
                <ListTile title="Logout" />
            </ListView>

            <ListView divided>
                <ListTile leading="👤" title="Profile" />
                <ListTile leading="🔔" title="Notifications" />
            </ListView>

            <ListTile
                leading={<CircleAvatar name="Anton Setiazi" />}
                title="Anton Setiazi"
                subtitle="Administrator"
            />

            <ListTile title="System Logs" trailing="›" />
        </div>
    );
}
