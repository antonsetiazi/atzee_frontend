// src/core/ui/components/auth/ProviderButton.tsx

interface Props {
    provider: string;
    icon?: React.ReactNode;
    onClick?: () => void;
}

export default function ProviderButton({ provider, icon, onClick }: Props) {
    return (
        <button
            onClick={onClick}
            className="flex items-center justify-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition"
            style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                color: "var(--text-primary)",
            }}
        >
            {icon}
            Continue with {provider}
        </button>
    );
}
