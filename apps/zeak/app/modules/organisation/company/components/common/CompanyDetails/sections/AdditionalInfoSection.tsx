import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { companyInfoValidator } from "~/modules/organisation/company/utils/company.validators";
import { ValidatedForm } from "@zeak/remix-validated-form";
import { InputComponent } from "@zeak/react";

export default function AdditionalInfoSection({
    company,
    isEditing,
    onSave
}: {
    company: any;
    isEditing: boolean;
    onSave: (data: any) => void;
}) {
    const {
        formState: { isDirty, isValid },
    } = useForm({
        resolver: zodResolver(companyInfoValidator),
        mode: "onChange",
    });

    return (
        <ValidatedForm
            validator={companyInfoValidator}
            defaultValues={{
                language: company?.additionalInfo?.language,
                timezone: company?.additionalInfo?.timezone,
                dnbNumber: company?.additionalInfo?.dnbNumber,
                bbbNumber: company?.additionalInfo?.bbbNumber,
                creditRating: company?.additionalInfo?.creditRating,
            }}
            onSubmit={onSave}
            method="post"
        >
            <div className="grid grid-cols-2 gap-12 py-4">
                <InputComponent
                    name="language"
                    label="Primary Language"
                    placeholder="Enter Primary Language"
                    value={company?.additionalInfo?.language}
                    readOnly={!isEditing}
                />
                <InputComponent
                    name="timezone"
                    label="Timezone"
                    placeholder="Enter Timezone"
                    value={company?.additionalInfo?.timezone}
                    readOnly={!isEditing}
                />
                <InputComponent
                    name="dnbNumber"
                    label="DUNS Number"
                    placeholder="Enter DUNS Number"
                    value={company?.additionalInfo?.dnbNumber}
                    readOnly={!isEditing}
                />
                <InputComponent
                    name="bbbNumber"
                    label="BBB Rating"
                    placeholder="Enter BBB Rating"
                    value={company?.additionalInfo?.bbbNumber}
                    readOnly={!isEditing}
                />
                <InputComponent
                    name="creditRating"
                    label="Credit Rating"
                    placeholder="Enter Credit Rating"
                    value={company?.additionalInfo?.creditRating}
                    readOnly={!isEditing}
                />
            </div>
        </ValidatedForm>
    );
} 