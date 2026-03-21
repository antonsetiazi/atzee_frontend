// src/core/ui/views/form/FormView.tsx

import FormRenderer from "./FormRenderer";
import { useFormView } from "./form.hooks";
import type { FormSchema } from "./form.types";

interface Props {
    schema: FormSchema;
    id?: string; // untuk edit mode
}

export default function FormView({ schema, id }: Props) {
    const { values, loading, handleChange, handleSubmit } = useFormView(
        schema,
        id,
    );

    return (
        <FormRenderer
            schema={schema}
            values={values}
            loading={loading}
            onChange={handleChange}
            onSubmit={handleSubmit}
        />
    );
}
