// src/core/ui/components/fields/TextField.tsx

import InputField from "./InputField";
import type { FieldProps } from "./field.types";

export default function TextField(props: FieldProps) {
    return <InputField {...props} type="text" />;
}
