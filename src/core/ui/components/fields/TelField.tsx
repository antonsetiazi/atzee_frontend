// src/core/ui/components/fields/TelField.tsx

import InputField from "./InputField";
import type { FieldProps } from "./field.types";

export default function TelField(props: FieldProps) {
    return <InputField {...props} type="tel" />;
}
