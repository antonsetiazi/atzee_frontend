// src/modules/account/profile/components/ProfileForm.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";

export default function ProfileForm({ user, onSave }: any) {
    const [form, setForm] = useState({
        full_name: user?.full_name || "",
        phone: user?.phone || "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSave(form);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="
                rounded-2xl
                p-5
                space-y-5
                border
                shadow-sm
            "
            style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border)",
                boxShadow: "var(--shadow)",
            }}
        >
            {/* TITLE */}
            <h2
                className="text-lg font-semibold"
                style={{ color: "var(--text-primary)" }}
            >
                Basic Information
            </h2>

            {/* FULL NAME */}
            <div className="space-y-1">
                <label
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                >
                    Full Name
                </label>

                <input
                    name="full_name"
                    value={form.full_name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="
                        w-full
                        rounded-xl
                        px-4 py-3
                        text-sm
                        transition
                        outline-none
                    "
                    style={{
                        background: "var(--color-surface-alt)",
                        border: "1px solid var(--color-border)",
                        color: "var(--text-primary)",
                    }}
                    onFocus={(e) =>
                        (e.target.style.boxShadow =
                            "0 0 0 2px var(--color-primary)")
                    }
                    onBlur={(e) => (e.target.style.boxShadow = "none")}
                />
            </div>

            {/* PHONE */}
            {/* <div className="space-y-1">
                <label
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                >
                    Phone
                </label>

                <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="08xxxx"
                    className="
                        w-full
                        rounded-xl
                        px-4 py-3
                        text-sm
                        transition
                        outline-none
                    "
                    style={{
                        background: "var(--color-surface-alt)",
                        border: "1px solid var(--color-border)",
                        color: "var(--text-primary)",
                    }}
                    onFocus={(e) =>
                        (e.target.style.boxShadow =
                            "0 0 0 2px var(--color-primary)")
                    }
                    onBlur={(e) => (e.target.style.boxShadow = "none")}
                />
            </div> */}

            {/* SUBMIT BUTTON */}
            <button
                type="submit"
                disabled={loading}
                className="
                    w-full
                    rounded-xl
                    py-3
                    text-sm
                    font-semibold
                    transition
                    active:scale-[0.98]
                "
                style={{
                    background: "var(--color-primary)",
                    color: "#fff",
                    opacity: loading ? 0.7 : 1,
                }}
            >
                {loading ? "Saving..." : "Save Changes"}
            </button>
        </form>
    );
}
