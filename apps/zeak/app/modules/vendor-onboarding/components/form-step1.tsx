import React from "react";

import { BuildingIcon, MailIcon1 } from "@zeak/icons";
import { FormSection } from "./formsection";
import { FormField } from "./form-field";
import { BiPhoneIncoming } from "react-icons/bi";

export const FormStep1: React.FC = () => {
  return (
    <FormSection
      title="Basic Information"
      description="Please provide your company's basic details"
    >
      <FormField
        name="companyName"
        label="Company Name"
        placeholder="Enter company name"
        Icon={BuildingIcon}
      />
      <FormField
        name="registrationNumber"
        label="Registration Number"
        placeholder="Enter registration number"
      />
      <FormField
        name="email"
        label="Email"
        type="email"
        placeholder="Enter email address"
        Icon={MailIcon1}
      />
      <FormField
        name="phone"
        label="Phone"
        type="tel"
        placeholder="Enter phone number"
        Icon={BiPhoneIncoming}
      />
    </FormSection>
  );
};
