// src/pages/dev/DataTableSample.tsx

import { DataTable } from "@/core/ui/components";

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

const users: User[] = [
    {
        id: 1,
        name: "Anton Setiazi",
        email: "anton@atzee.com",
        role: "Admin",
    },
    {
        id: 2,
        name: "Ahmad Fauzan",
        email: "fauzan@example.com",
        role: "Manager",
    },
    {
        id: 3,
        name: "Siti Nurhaliza",
        email: "siti@example.com",
        role: "Staff",
    },
    {
        id: 4,
        name: "Budi Santoso",
        email: "budi@example.com",
        role: "Viewer",
    },
];

export default function DataTableSample() {
    return (
        <div className="p-6 space-y-4">
            <h1 className="text-lg font-semibold">DataTable Sample</h1>

            <DataTable<User>
                columns={[
                    {
                        key: "name",
                        title: "Name",
                        sortable: true,
                    },
                    {
                        key: "email",
                        title: "Email",
                    },
                    {
                        key: "role",
                        title: "Role",
                        sortable: true,
                    },
                    {
                        key: "action",
                        title: "",
                        render: (row) => (
                            <button
                                className="
                                    text-sm
                                    text-[var(--color-primary)]
                                    hover:underline
                                "
                                onClick={() => alert(`Edit user: ${row.name}`)}
                            >
                                Edit
                            </button>
                        ),
                    },
                ]}
                data={users}
                rowKey={(row) => String(row.id)}
            />
        </div>
    );
}
