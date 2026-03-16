import { Breadcrumb } from "@/core/ui/components";

export default function BreadcrumbSample() {
    return (
        <div>
            <Breadcrumb
                items={[
                    { label: "Dashboard", href: "/dashboard" },
                    { label: "Users", href: "/users" },
                    { label: "Anton Setiazi" },
                ]}
            />
        </div>
    );
}
