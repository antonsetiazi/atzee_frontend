// src/core/ui/components/fields/DateField.tsx

import InputField from "./InputField";
import type { FieldProps } from "./field.types";

export default function DateField(props: FieldProps) {
    return <InputField {...props} type="date" />;
}
