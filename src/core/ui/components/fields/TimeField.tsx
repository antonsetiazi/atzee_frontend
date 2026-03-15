// src/core/ui/components/fields/TimeField.tsx

import InputField from "./InputField";
import type { FieldProps } from "./field.types";

export default function TimeField(props: FieldProps) {
    return <InputField {...props} type="time" />;
}
