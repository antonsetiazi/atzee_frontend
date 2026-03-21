import { EmailField, TextAreaField, TextField } from "../../components";
import FormActions from "./FormActions";
import FormGrid from "./FormGrid";
import FormGroup from "./FormGroup";
import FormSection from "./FormSection";

export default function FormPatternSample() {
    return (
        <div>
            <FormSection title="User Form" footer={<FormActions />}>
                <FormGroup title="Basic Info">
                    <FormGrid>
                        <TextField label="Name" />
                        <EmailField label="Email" />
                    </FormGrid>
                </FormGroup>

                <FormGroup title="Additional Info" variant="card">
                    <TextAreaField label="Notes" />
                </FormGroup>
            </FormSection>
        </div>
    );
}
