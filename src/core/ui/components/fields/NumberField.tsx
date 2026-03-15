// src/core/ui/components/fields/NumberField.tsx

import InputField from "./InputField";
import type { FieldProps } from "./field.types";

export default function NumberField(props: FieldProps) {
    return <InputField {...props} type="number" />;
}
