// src/core/ui/components/fields/EmailField.tsx

import InputField from "./InputField";
import type { FieldProps } from "./field.types";

export default function EmailField(props: FieldProps) {
    return <InputField {...props} type="email" />;
}
