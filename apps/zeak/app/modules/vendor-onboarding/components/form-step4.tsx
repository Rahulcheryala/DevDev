import React from "react";
import { useFormContext } from "react-hook-form";
import { FormSection } from "./formsection";
import { FormField } from "./form-field";
import { UserIcon } from "@zeak/icons";

export const FormStep4: React.FC = () => {
  const { watch } = useFormContext();
  const formData = watch();

  const renderReviewItem = (label: string, value: string) => (
    <div className="border-b border-gray-100 py-3">
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900">{value || "Not provided"}</dd>
    </div>
  );

  return (
    <>
      <FormSection>
        <FormField
          name="contactPerson"
          label="Primary Contact Person"
          placeholder="Enter contact person name"
          Icon={UserIcon}
        />
      </FormSection>

      <FormSection title="Review Information" className="mt-8">
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Company Information
              </h4>
              <dl className="divide-y divide-gray-100">
                {renderReviewItem("Company Name", formData.companyName)}
                {renderReviewItem(
                  "Registration Number",
                  formData.registrationNumber,
                )}
                {renderReviewItem("Email", formData.email)}
                {renderReviewItem("Phone", formData.phone)}
              </dl>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Location & Business
              </h4>
              <dl className="divide-y divide-gray-100">
                {renderReviewItem(
                  "Address",
                  `${formData.address}, ${formData.city}, ${formData.country}`,
                )}
                {renderReviewItem("Industry", formData.industry)}
                {renderReviewItem("Description", formData.description)}
              </dl>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Tax & Banking
              </h4>
              <dl className="divide-y divide-gray-100">
                {renderReviewItem("Tax ID", formData.taxId)}
                {renderReviewItem("VAT Number", formData.vatNumber)}
                {renderReviewItem("Bank Name", formData.bankName)}
                {renderReviewItem("Account Number", formData.accountNumber)}
                {renderReviewItem("SWIFT Code", formData.swiftCode)}
                {renderReviewItem("Bank Address", formData.bankAddress)}
              </dl>
            </div>
          </div>
        </div>
      </FormSection>
    </>
  );
};
