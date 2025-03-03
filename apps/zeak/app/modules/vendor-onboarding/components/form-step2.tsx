import React from "react";
import { FormSection } from "./formsection";
import { FormField } from "./form-field";
import { BuildingIcon, MarkerPinIcon2 } from "@zeak/icons";

const industryOptions = [
  { value: "technology", label: "Technology" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "retail", label: "Retail" },
  { value: "healthcare", label: "Healthcare" },
  { value: "finance", label: "Finance" },
  { value: "other", label: "Other" },
];

export const FormStep2: React.FC = () => {
  return (
    <FormSection
      title="Location & Business Details"
      description="Tell us about your business location and operations"
    >
      <FormField
        name="address"
        label="Address"
        placeholder="Enter street address"
        Icon={MarkerPinIcon2}
      />
      <div className="grid grid-cols-2 gap-4">
        <FormField name="city" label="City" placeholder="Enter city" />
        <FormField name="country" label="Country" placeholder="Enter country" />
      </div>
      <FormField
        name="industry"
        label="Industry"
        type="select"
        placeholder="Select industry"
        Icon={BuildingIcon}
        options={industryOptions}
      />
      <FormField
        name="description"
        label="Description"
        type="textarea"
        placeholder="Describe your company's products or services"
        rows={4}
      />
    </FormSection>
  );
};
