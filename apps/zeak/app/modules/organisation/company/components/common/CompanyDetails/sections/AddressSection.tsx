import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressInfoValidator } from "~/modules/organisation/company/utils/company.validators";
import { ValidatedForm } from "@zeak/remix-validated-form";
import { InputComponent } from "@zeak/react";
import DropdownSelect from "~/components/Globals/Dropdown/DropdownSelect";
import { useLocations } from "~/hooks/useLocations";

export default function AddressSection({
    company,
    isEditing,
    onSave
}: {
    company: any;
    isEditing: boolean;
    onSave: (data: any) => void;
}) {
    const { countries, states, isLoading } = useLocations(company?.address?.country);

    const {
        formState: { isDirty, isValid },
    } = useForm({
        resolver: zodResolver(addressInfoValidator),
        mode: "onChange",
    });

    return (
        <ValidatedForm
            validator={addressInfoValidator}
            defaultValues={{
                address1: company?.address?.address1,
                address2: company?.address?.address2,
                city: company?.address?.city,
                state: company?.address?.state,
                postalCode: company?.address?.postalCode,
                country: company?.address?.country,
            }}
            onSubmit={onSave}
            method="post"
        >
            <div className="grid grid-cols-2 gap-12 py-4">
                <InputComponent
                    name="address1"
                    label="Address Line 1"
                    placeholder="Enter Address 1"
                    value={company?.address?.address1}
                    readOnly={!isEditing}
                    isRequired
                />
                <InputComponent
                    name="address2"
                    label="Address Line 2"
                    placeholder="Enter Address 2"
                    value={company?.address?.address2}
                    readOnly={!isEditing}
                />
                <InputComponent
                    name="city"
                    label="City"
                    placeholder="Enter City"
                    value={company?.address?.city}
                    readOnly={!isEditing}
                    isRequired
                />
                <DropdownSelect
                    name="country"
                    label="Country"
                    items={countries}
                    value={company?.address?.country}
                    readOnly={!isEditing}
                    isRequired
                    placeholder="Select Country"
                />
                <InputComponent
                    name="postalCode"
                    label="Postal Code"
                    placeholder="Enter Postal Code"
                    value={company?.address?.postalCode}
                    readOnly={!isEditing}
                    isRequired
                />
                <DropdownSelect
                    name="state"
                    label="State/Province"
                    items={states}
                    value={company?.address?.state}
                    readOnly={!isEditing}
                    isRequired
                    placeholder="Select State"
                    isLoading={isLoading}
                />
            </div>
        </ValidatedForm>
    );
} 