import React from "react";
import { FormSection } from "./formsection";
import { FormField } from "./form-field";
import { BuildingIcon } from "@zeak/icons";
import { FaLandmark } from "react-icons/fa";
import { BsCreditCardFill } from "react-icons/bs";

export const FormStep3: React.FC = () => {
  return (
    <>
      <FormSection
        title="Tax Information"
        description="Provide your tax registration details"
      >
        <FormField
          name="taxId"
          label="Tax ID / EIN"
          placeholder="Enter tax identification number"
          Icon={BuildingIcon}
        />
        <FormField
          name="vatNumber"
          label="VAT Number (if applicable)"
          placeholder="Enter VAT number"
          Icon={BuildingIcon}
        />
      </FormSection>

      <FormSection
        title="Banking Information"
        description="Provide your company's banking details"
        className="mt-8"
      >
        <FormField
          name="bankName"
          label="Bank Name"
          placeholder="Enter bank name"
          Icon={FaLandmark}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            name="accountNumber"
            label="Account Number"
            placeholder="Enter account number"
            Icon={BsCreditCardFill}
          />
          <FormField
            name="swiftCode"
            label="SWIFT/BIC Code"
            placeholder="Enter SWIFT code"
          />
        </div>
        <FormField
          name="bankAddress"
          label="Bank Address"
          type="textarea"
          placeholder="Enter bank's full address"
          rows={3}
        />
      </FormSection>
    </>
  );
};
