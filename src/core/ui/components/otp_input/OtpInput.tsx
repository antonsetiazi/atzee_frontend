// src/core/ui/components/otp_input/OtpInput.tsx

import { useEffect, useRef } from "react";

interface Props {
    length?: number;
    value: string;
    onChange: (val: string) => void;
    onComplete?: (val: string) => void;
    disabled?: boolean;
    autoFocus?: boolean;
}

export default function OtpInput({
    length = 6,
    value,
    onChange,
    onComplete,
    disabled,
    autoFocus = true,
}: Props) {
    const inputsRef = useRef<HTMLInputElement[]>([]);

    // Auto focus ke input pertama
    useEffect(() => {
        if (autoFocus) {
            inputsRef.current[0]?.focus();
        }
    }, [autoFocus]);

    function handleChange(index: number, val: string) {
        if (!/^\d?$/.test(val)) return;

        const newValue =
            value.substring(0, index) + val + value.substring(index + 1);

        onChange(newValue);

        // pindah ke kanan
        if (val && index < length - 1) {
            inputsRef.current[index + 1]?.focus();
        }

        // auto complete
        if (newValue.length === length && /^\d+$/.test(newValue)) {
            onComplete?.(newValue);
        }
    }

    function handleKeyDown(index: number, e: React.KeyboardEvent) {
        if (e.key === "Backspace") {
            if (value[index]) {
                // hapus isi sekarang
                const newValue =
                    value.substring(0, index) + "" + value.substring(index + 1);
                onChange(newValue);
            } else if (index > 0) {
                // pindah ke kiri
                inputsRef.current[index - 1]?.focus();
            }
        }
    }

    function handlePaste(e: React.ClipboardEvent) {
        const paste = e.clipboardData.getData("text").replace(/\D/g, "");
        if (!paste) return;

        const newValue = paste.slice(0, length);
        onChange(newValue);

        const lastIndex = newValue.length - 1;
        if (lastIndex >= 0) {
            inputsRef.current[lastIndex]?.focus();
        }

        onComplete?.(newValue);
        e.preventDefault();
    }

    return (
        <div onPaste={handlePaste} className="flex gap-3 justify-center">
            {Array.from({ length }).map((_, i) => (
                <input
                    key={i}
                    ref={(el) => {
                        if (el) inputsRef.current[i] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={value[i] || ""}
                    disabled={disabled}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className="
                        w-12 h-12 text-center text-lg font-semibold
                        border border-[var(--color-border)] rounded-xl
                        bg-white
                        focus:outline-none
                        focus:ring-2 focus:ring-primary
                        transition
                    "
                />
            ))}
        </div>
    );
}
