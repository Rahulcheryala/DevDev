import { ValidatedForm } from "@zeak/remix-validated-form";
import { PageDetailsSection } from '@zeak/ui';

import { ClearableInput } from "~/components/Form";
import { companyValidatorV2 } from "~/modules/access-settings/access-settings.model";

export default function GeneralSection({
    company,
    isEditing,
    onSave,
    formRef
}: {
    company: any;
    isEditing: boolean;
    onSave: (data: any) => void;
    formRef: React.RefObject<HTMLFormElement>;
}) {
    return (
        <ValidatedForm
            ref={formRef}
            validator={companyValidatorV2}
            onSubmit={onSave}
            defaultValues={{
                name: company.name,
                companyCode: company.companyCode
            }}
            method="post"
        >
            {/* <div className="grid grid-cols-2 gap-10">
                <div>
                    <div className="flex items-center">
                        <h4 className="text-sm text-accent-dark font-medium mb-1">
                            Company Name
                        </h4>
                    </div>
                    {!isEditing ? (
                        <p className="text-base text-tertiary">{company.name}</p>
                    ) : (
                        <ClearableInput name="name" defaultValue={company.name} />
                    )}
                </div>
                <div>
                    <div className="flex items-center">
                        <h4 className="text-sm text-accent-dark font-medium mb-2">
                            Company Code
                        </h4>
                    </div>
                    {!isEditing ? (
                        <p className="text-base text-tertiary">{company.companyCode}</p>
                    ) : (
                        <ClearableInput name="companyCode" defaultValue={company.companyCode} />
                    )}
                </div>
            </div> */}
            <PageDetailsSection
                title="Product Information"
            // subtitle="Key details about the product"
            >
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Product Name</h3>
                        <p className="mt-1 text-base font-medium">Premium Widget Pro</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">SKU</h3>
                        <p className="mt-1 text-base font-medium">WID-PRO-2023</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Manufacturer</h3>
                        <p className="mt-1 text-base font-medium">Acme Corporation</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Category</h3>
                        <p className="mt-1 text-base font-medium">Electronics</p>
                    </div>
                </div>
            </PageDetailsSection>
        </ValidatedForm>
    );
} 