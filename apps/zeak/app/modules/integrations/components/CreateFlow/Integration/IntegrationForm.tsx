import React from "react";
import type { IntegrationForm as IntegrationFormType } from "../../../models/integration-form.model";
import { useIntegrationForm } from "../../../hooks/form/useIntegrationForm";
import { IntegrationFlow, useUnifiedContext } from "../../../context";
import { safeReplace } from "../../../utils/utils";
import {
  ApplicationName,
  AuthType,
  ConnectionType,
  IntegrationCategory,
  Status,
} from "@prisma/client";
import {
  LabeledTextArea,
  LabelledInput,
  Dropdown,
  MultiSelect,
  Option,
} from "@zeak/ui";

type IntegrationFormProps = {
  currentFlow: IntegrationFlow;
  integrationForm: IntegrationFormType;
  errors: { [key: string]: string | null };
};

const IntegrationForm = ({
  currentFlow,
  integrationForm,
  errors,
}: IntegrationFormProps) => {
  const {
    state: { companies },
  } = useUnifiedContext();

  const {
    handleChange,
    handleSelectChange,
    handleMultiSelectChange,
    handleGeneralInfoBlur,
  } = useIntegrationForm();
  // Always use integrationForm values, which will be properly initialized with selectedIntegration data
  // when in edit mode through our useIntegrationForm hook
  const formValues = {
    integrationName: integrationForm.integrationName || "",
    integrationCode: integrationForm.integrationCode || "",
    description: integrationForm.description || "",
    applicationName: integrationForm.applicationName || "",
    integrationCategory: integrationForm.integrationCategory || "",
    connectionType: integrationForm.connectionType || "",
    authType: integrationForm.authType || "",
    connectionLimit: integrationForm.connectionLimit || 0,
    status: integrationForm.status || "",
    companyIds: integrationForm.companyIds || [],
  };

  // console.log(formValues)

  // Pre-compute selected companies
  const selectedCompanies = React.useMemo(() => {
    if (!companies || !formValues.companyIds.length) return [];
    // Ensure all IDs are strings for consistent comparison
    const companyIdsSet = new Set(
      formValues.companyIds.map((id) => String(id))
    );
    const filtered = companies.filter((company) =>
      companyIdsSet.has(String(company.id))
    );

    return filtered.map((company) => ({
      id: company.id,
      value: company.id,
      label: company.name,
    }));
  }, [companies, formValues.companyIds]);

  return (
    <>
      <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-[60px] md:gap-8">
        <LabelledInput
          label="Integration Name"
          id="integrationName"
          name="integrationName"
          value={formValues.integrationName}
          onChange={
            currentFlow === "create"
              ? (e: any) => handleChange(e.target.name, e.target.value)
              : undefined
          }
          onBlur={handleGeneralInfoBlur}
          placeholder="Enter Integration name"
          isRequired={true}
          isDisabled={currentFlow === "edit"}
          showTooltip={true}
          tooltipTitle="Required, unique"
          tooltipContent="Enter a unique name for the Integration. The Integration name must be distinct and cannot be duplicated within the company"
          errorMessage={errors?.integrationName!}
          isInvalid={!!errors?.integrationName}
        />

        <LabelledInput
          isCode={currentFlow === "create"}
          label="Integration Code"
          id="integrationCode"
          name="integrationCode"
          value={formValues.integrationCode}
          onChange={
            currentFlow === "create"
              ? (e: any) => handleChange(e.target.name, e.target.value)
              : undefined
          }
          onBlur={handleGeneralInfoBlur}
          placeholder="Enter integration code"
          isRequired={true}
          isDisabled={currentFlow === "edit"}
          errorMessage={errors?.integrationCode!}
          isInvalid={!!errors?.integrationCode}
        />
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-[60px] md:gap-8">
        <LabeledTextArea
          label="Purpose"
          id="description"
          name="description"
          value={formValues.description}
          onChange={(e: any) => handleChange(e.target.name, e.target.value)}
          onBlur={handleGeneralInfoBlur}
          placeholder="Enter Purpose"
          errorMessage={errors?.description!}
          isInvalid={!!errors?.description}
        />

        <Dropdown
          name="applicationName"
          label="Application"
          placeholder="Select Application"
          items={Object.values(ApplicationName).map((application) => ({
            label: safeReplace(application),
            value: application,
          }))}
          value={formValues.applicationName}
          onChange={(value) => handleSelectChange("applicationName", value)}
          dropdownClasses="h-10"
        />
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-[60px] md:gap-8">
        <Dropdown
          name="integrationCategory"
          label="Integration Category"
          placeholder="Select Category"
          items={Object.values(IntegrationCategory).map((category) => ({
            label: safeReplace(category),
            value: category,
          }))}
          value={formValues.integrationCategory}
          onChange={(value) => handleSelectChange("integrationCategory", value)}
          dropdownClasses="h-10"
        />

        <Dropdown
          name="connectionType"
          label="Connection Type"
          placeholder="Select Connection Type"
          items={Object.values(ConnectionType).map((connectionType) => ({
            label: safeReplace(connectionType),
            value: connectionType,
          }))}
          value={formValues.connectionType}
          onChange={(value) => handleSelectChange("connectionType", value)}
          dropdownClasses="h-10"
        />
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-[60px] md:gap-8">
        <Dropdown
          name="authType"
          label="Authentication Type"
          placeholder="Select Authentication Type"
          items={Object.values(AuthType).map((authType) => ({
            label: safeReplace(authType),
            value: authType,
          }))}
          value={formValues.authType}
          onChange={(value) => handleSelectChange("authType", value)}
          dropdownClasses="h-10"
        />

        <LabelledInput
          type="number"
          label="Connection Limit"
          id="connectionLimit"
          name="connectionLimit"
          value={formValues.connectionLimit}
          onChange={(e: any) => handleChange(e.target.name, e.target.value)}
          onBlur={handleGeneralInfoBlur}
          placeholder="Enter Connection Limit"
          min={0}
          // showNoneForZero={true}
          errorMessage={errors?.connectionLimit!}
          isInvalid={!!errors?.connectionLimit}
        />
      </div>

      <div
        className={`grid lg:grid-cols-2 grid-cols-1 lg:gap-[60px] md:gap-8 ${currentFlow === "edit" && "mb-10"}`}
      >
        {currentFlow === "edit" && (
          <Dropdown
            name="status"
            label="Connection Status"
            placeholder="Select Connection Status"
            items={Object.values(Status).map((status) => ({
              label: safeReplace(status),
              value: status,
            }))}
            value={formValues.status}
            onChange={(value) => handleSelectChange("status", value)}
            dropdownClasses="h-10"
          />
        )}

        <div className="flex flex-col gap-3 relative">
          <MultiSelect
            label="Company(s)"
            placeholder="Select Company(s)"
            options={companies?.map((company) => ({
              id: company.id,
              value: company.id,
              label: company.name,
            }))}
            defaultValue={selectedCompanies}
            onChange={(value: Option[]) =>
              handleMultiSelectChange("companyIds", value)
            }
          />
        </div>
      </div>
    </>
  );
};

export default IntegrationForm;
