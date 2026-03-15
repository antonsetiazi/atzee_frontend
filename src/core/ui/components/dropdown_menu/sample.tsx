import { DropdownMenu } from "@/core/ui/components";

export default function DropdownMenuSample() {
    return (
        <DropdownMenu
            trigger={
                <button className="flex items-center gap-2">Profile</button>
            }
            items={[
                { label: "Profile", onClick: () => {} },
                { label: "Settings", onClick: () => {} },
                { label: "", divider: true },
                { label: "Logout", danger: true, onClick: () => {} },
            ]}
        />
    );
}
