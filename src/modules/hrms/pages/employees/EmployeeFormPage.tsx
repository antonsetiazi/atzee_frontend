// src/modules/hrms/pages/employees/EmployeeFormPage.tsx

import { useState } from "react";
import { Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEmployees } from "@/modules/hrms/hooks/useEmployees";
import type { CreateEmployeePayload } from "@/modules/hrms/types/employee.types";
import { HeaderPage } from "@/core/ui/components";

export default function EmployeeFormPage() {
    const navigate = useNavigate();
    const { createEmployee } = useEmployees();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState<CreateEmployeePayload>({
        employee_id: "",
        full_name: "",
        email: "",
        phone_number: "",
        gender: "MALE",
        employment_status: "ACTIVE",
        contract_type: "PERMANENT",
        hire_date: "",
        birth_date: "",
        address: "",
    });

    const handleChange = (key: keyof CreateEmployeePayload, value: string) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);

            await createEmployee(form);

            navigate("/hrms/employees");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <HeaderPage
                title="Add Employee"
                actions={[
                    {
                        label: loading ? "Saving..." : "Save Employee",
                        icon: Save,
                        onClick: handleSubmit,
                    },
                ]}
            />
            <div className="space-y-6 p-6">
                {/* FORM */}
                <form id="employee-form" onSubmit={handleSubmit} className="space-y-6">
                    {/* BASIC INFO */}
                    <section className="rounded-3xl border bg-white p-6 shadow-sm">
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold">Basic Information</h2>

                            <p className="text-sm text-gray-500">
                                Employee identity and primary data
                            </p>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            {/* EMPLOYEE ID */}
                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Employee ID
                                </label>

                                <input
                                    type="text"
                                    value={form.employee_id}
                                    onChange={(e) => handleChange("employee_id", e.target.value)}
                                    className="w-full rounded-2xl border px-4 py-3 text-sm transition outline-none focus:border-black"
                                    placeholder="EMP-0001"
                                    required
                                />
                            </div>

                            {/* FULL NAME */}
                            <div>
                                <label className="mb-2 block text-sm font-medium">Full Name</label>

                                <input
                                    type="text"
                                    value={form.full_name}
                                    onChange={(e) => handleChange("full_name", e.target.value)}
                                    className="w-full rounded-2xl border px-4 py-3 text-sm transition outline-none focus:border-black"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>

                            {/* EMAIL */}
                            <div>
                                <label className="mb-2 block text-sm font-medium">Email</label>

                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                    className="w-full rounded-2xl border px-4 py-3 text-sm transition outline-none focus:border-black"
                                    placeholder="john@company.com"
                                    required
                                />
                            </div>

                            {/* PHONE */}
                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Phone Number
                                </label>

                                <input
                                    type="text"
                                    value={form.phone_number}
                                    onChange={(e) => handleChange("phone_number", e.target.value)}
                                    className="w-full rounded-2xl border px-4 py-3 text-sm transition outline-none focus:border-black"
                                    placeholder="+62..."
                                />
                            </div>
                        </div>
                    </section>

                    {/* EMPLOYMENT */}
                    <section className="rounded-3xl border bg-white p-6 shadow-sm">
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold">Employment</h2>

                            <p className="text-sm text-gray-500">
                                Employee contract and workforce information
                            </p>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            {/* STATUS */}
                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Employment Status
                                </label>

                                <select
                                    value={form.employment_status}
                                    onChange={(e) =>
                                        handleChange("employment_status", e.target.value)
                                    }
                                    className="w-full rounded-2xl border px-4 py-3 text-sm transition outline-none focus:border-black"
                                >
                                    <option value="ACTIVE">Active</option>

                                    <option value="PROBATION">Probation</option>

                                    <option value="INACTIVE">Inactive</option>
                                </select>
                            </div>

                            {/* CONTRACT */}
                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Contract Type
                                </label>

                                <select
                                    value={form.contract_type}
                                    onChange={(e) => handleChange("contract_type", e.target.value)}
                                    className="w-full rounded-2xl border px-4 py-3 text-sm transition outline-none focus:border-black"
                                >
                                    <option value="PERMANENT">Permanent</option>

                                    <option value="CONTRACT">Contract</option>

                                    <option value="INTERNSHIP">Internship</option>

                                    <option value="FREELANCE">Freelance</option>
                                </select>
                            </div>

                            {/* HIRE DATE */}
                            <div>
                                <label className="mb-2 block text-sm font-medium">Hire Date</label>

                                <input
                                    type="date"
                                    value={form.hire_date}
                                    onChange={(e) => handleChange("hire_date", e.target.value)}
                                    className="w-full rounded-2xl border px-4 py-3 text-sm transition outline-none focus:border-black"
                                />
                            </div>

                            {/* BIRTH DATE */}
                            <div>
                                <label className="mb-2 block text-sm font-medium">Birth Date</label>

                                <input
                                    type="date"
                                    value={form.birth_date}
                                    onChange={(e) => handleChange("birth_date", e.target.value)}
                                    className="w-full rounded-2xl border px-4 py-3 text-sm transition outline-none focus:border-black"
                                />
                            </div>
                        </div>
                    </section>

                    {/* ADDRESS */}
                    <section className="rounded-3xl border bg-white p-6 shadow-sm">
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold">Address</h2>

                            <p className="text-sm text-gray-500">
                                Employee location and residence information
                            </p>
                        </div>

                        <textarea
                            rows={5}
                            value={form.address}
                            onChange={(e) => handleChange("address", e.target.value)}
                            className="w-full rounded-2xl border px-4 py-3 text-sm transition outline-none focus:border-black"
                            placeholder="Employee address..."
                        />
                    </section>
                </form>
            </div>
        </>
    );
}
