// src/modules/auth/components/RegisterRoleSwitcher.tsx

import { Button } from "@/core/ui/components";

interface Props {
    value: "user" | "partner";
    onChange: (value: "user" | "partner") => void;
}

export default function RegisterRoleSwitcher({ value, onChange }: Props) {
    function renderButton(key: "user" | "partner", label: string) {
        const active = value === key;

        return (
            <Button
                type="button"
                variant={active ? "primary" : "ghost"}
                fullWidth
                onClick={() => onChange(key)}
            >
                {label}
            </Button>
        );
    }

    return (
        <div
            className="mb-6 flex gap-1 rounded-lg p-1"
            style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
            }}
        >
            {renderButton("user", "Daftar User")}
            {renderButton("partner", "Daftar Partner")}
        </div>
    );
}
