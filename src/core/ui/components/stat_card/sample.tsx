import { StatCard } from "@/core/ui/components/";
import { UsersIcon } from "@heroicons/react/20/solid";

export default function StatCardSample() {
    return (
        <div className="max-w-3xl mx-auto p-8">
            <p>Dashboard Metrics</p>
            <StatCard
                title="Total Users"
                value="12,340"
                icon={<UsersIcon className="w-6 h-6" />}
                trend={{
                    value: "+8.2% from last month",
                    direction: "up",
                }}
            />

            <p>Tanpa Trend</p>
            <StatCard title="Active Sessions" value="842" />

            <p>Dengan Footer</p>
            <StatCard
                title="Revenue"
                value="$92,340"
                trend={{
                    value: "+12%",
                    direction: "up",
                }}
                footer="Updated 5 minutes ago"
            />

            <p>Layout Dashboard Biasanya</p>
            <div className="grid grid-cols-4 gap-4">
                <StatCard title="Users" value="12,340" />
                <StatCard title="Orders" value="1,203" />
                <StatCard title="Revenue" value="$92K" />
                <StatCard title="Active" value="842" />
            </div>
        </div>
    );
}
