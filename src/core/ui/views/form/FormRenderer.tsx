// src/core/ui/views/form/FormRenderer.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
    Heading,
    Button,
} from "@/core/ui/components";

import FormFieldRenderer from "./FormFieldRenderer";
import type { FormSchema } from "./form.types";

interface Props {
    schema: FormSchema;
    values: Record<string, any>;
    loading: boolean;
    onChange: (name: string, value: any) => void;
    onSubmit: () => void;
}

export default function FormRenderer({
    schema,
    values,
    loading,
    onChange,
    onSubmit,
}: Props) {
    const columns = schema.layout?.columns || 2;

    const gridClass =
        columns === 1
            ? "grid-cols-1"
            : columns === 2
              ? "grid-cols-1 md:grid-cols-2"
              : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3";

    return (
        <Card>
            {(schema.title || schema.description) && (
                <CardHeader>
                    {schema.title && (
                        <Heading level={2}>{schema.title}</Heading>
                    )}
                    {schema.description && (
                        <p className="text-sm opacity-70 mt-1">
                            {schema.description}
                        </p>
                    )}
                </CardHeader>
            )}

            <CardContent>
                <div className={`grid gap-4 ${gridClass}`}>
                    {schema.fields.map((field) => (
                        <FormFieldRenderer
                            key={field.name}
                            field={field}
                            value={values[field.name]}
                            onChange={onChange}
                        />
                    ))}
                </div>
            </CardContent>

            <CardFooter className="flex justify-end gap-3">
                <Button onClick={onSubmit} loading={loading}>
                    {schema.actions?.submit_label || "Submit"}
                </Button>
            </CardFooter>
        </Card>
    );
}
