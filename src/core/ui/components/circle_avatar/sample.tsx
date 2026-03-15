import { CircleAvatar } from "@/core/ui/components";

export default function CircleAvatarSample() {
    return (
        <div>
            <CircleAvatar
                src="https://litex.co.id/wp-content/uploads/2024/03/felix-pacaran-634897940.webp"
                name="Anton Setiazi"
            />
            <CircleAvatar name="Anton Setiazi" />
            <CircleAvatar name="Anton" size="sm" />
            <CircleAvatar name="Anton Setiazi" size="xl" />
        </div>
    );
}
