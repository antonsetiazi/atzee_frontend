// src/core/ui/components/fields/DateTimeField.tsx

import InputField from "./InputField";
import type { FieldProps } from "./field.types";

export default function DateTimeField(props: FieldProps) {
    return <InputField {...props} type="datetime-local" />;
}
