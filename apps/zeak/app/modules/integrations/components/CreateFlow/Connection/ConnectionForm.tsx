import React from "react";
import {
  ConnectionFlow,
  useUnifiedContext,
} from "~/modules/integrations/context";
import { ConnectionForm as ConnectionFormType } from "~/modules/integrations/models/connection-form.model";
import { IIntegrationModel } from "~/modules/integrations/models/integration.model";
import {
  LabeledTextArea,
  LabelledInput,
  Dropdown,
  MultiSelect,
  Option,
  ToggleSwitch,
  Label,
  FilterTabs,
} from "@zeak/ui";
import { ConnectionEnvType, ConnectionStatus } from "@prisma/client";
import { safeReplace } from "~/modules/integrations/utils/utils";
import { useConnectionForm } from "~/modules/integrations/hooks/form/useConnectionForm";

type ConnectionFormProps = {
  currentFlow: ConnectionFlow;
  connectionForm: ConnectionFormType;
  selectedIntegration: IIntegrationModel;
  errors?: { [key: string]: string | null };
};

const ConnectionForm = ({
  currentFlow,
  connectionForm,
  selectedIntegration,
  errors,
}: ConnectionFormProps) => {
  const {
    state: { companies },
  } = useUnifiedContext();

  const {
    handleChange,
    handleSelectChange,
    handleMultiSelectChange,
    handleGeneralInfoBlur,
  } = useConnectionForm();

  const formValues = {
    connectionName: connectionForm.connectionName || "",
    connectionCode: connectionForm.connectionCode || "",
    connectionDescription: connectionForm.connectionDescription || "",
    isEnabled: connectionForm.isEnabled || false,
    integrationType: selectedIntegration.integrationType || "",
    integrationName: selectedIntegration.integrationName || "",
    environmentType: connectionForm.connectionDetails.environmentType || "",
    environmentURL: connectionForm.connectionDetails.environmentURL || "",
    companyIds: connectionForm.companyIds || [],
    connectionStatus: connectionForm.connectionStatus || "",
  };

  // console.log("formValues", formValues);

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
    <div className="flex flex-col gap-8">
      <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-[60px] md:gap-8">
        <LabelledInput
          label="Connection Name"
          id="connectionName"
          name="connectionName"
          value={formValues.connectionName}
          onChange={
            currentFlow === "create"
              ? (e: any) => handleChange(e.target.name, e.target.value)
              : undefined
          }
          onBlur={handleGeneralInfoBlur}
          placeholder="Enter Connection Name"
          isRequired={true}
          isDisabled={currentFlow === "edit"}
          showTooltip={true}
          tooltipTitle="Required"
          tooltipContent="Enter a unique name for the connection. The connection name must be distinct from other connections."
          errorMessage={errors?.connectionName!}
          isInvalid={!!errors?.connectionName}
        />

        <div className="flex flex-col gap-3 relative">
          <LabelledInput
            isCode={currentFlow === "create"}
            label="Connection Code"
            id="connectionCode"
            name="connectionCode"
            value={formValues.connectionCode}
            onChange={
              currentFlow === "create"
                ? (e: any) => handleChange(e.target.name, e.target.value)
                : undefined
            }
            onBlur={handleGeneralInfoBlur}
            placeholder="Enter Connection Code"
            isRequired={true}
            isDisabled={currentFlow === "edit"}
            errorMessage={errors?.connectionCode!}
            isInvalid={!!errors?.connectionCode}
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-[60px] md:gap-8">
        <LabeledTextArea
          label="Purpose"
          id="connectionDescription"
          name="connectionDescription"
          value={formValues.connectionDescription}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            handleChange(e.target.name, e.target.value)
          }
          onBlur={handleGeneralInfoBlur}
          placeholder="Enter Purpose"
          errorMessage={errors?.connectionDescription!}
          isInvalid={!!errors?.connectionDescription}
        />

        <ToggleSwitch
          label="Enabled"
          size="md"
          isOn={formValues.isEnabled}
          onChange={(value) => handleChange("isEnabled", value)}
        />
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-[60px] md:gap-8">
        <Dropdown
          name="integrationType"
          label="Integration Type"
          placeholder="Select Integration Type"
          items={[
            {
              label: safeReplace(selectedIntegration.integrationType),
              value: selectedIntegration.integrationType,
            },
          ]}
          value={selectedIntegration.integrationType}
          inputClasses="opacity-60 cursor-not-allowed pointer-events-none"
        />

        <Dropdown
          name="integrationName"
          label="Integration Name"
          placeholder="Select Integration"
          items={[
            {
              label: selectedIntegration.integrationName,
              value: selectedIntegration.integrationName,
            },
          ]}
          value={selectedIntegration.integrationName}
          inputClasses="opacity-60 cursor-not-allowed pointer-events-none"
        />
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-[60px] md:gap-8">
        <Dropdown
          label="Environment Type"
          name="environmentType"
          placeholder="Select Environment Type"
          // TODO(vamsi): Add all environment types
          // items={Object.keys(ConnectionEnvType).map((type) => ({
          //   label: type,
          //   value: type,
          // }))}
          items={[
            {
              icon: <div className="w-4 h-4 bg-accent-dark rounded-full"></div>,
              label: "SANDBOX",
              value: "SANDBOX",
            },
            {
              icon: (
                <div className="w-4 h-4 bg-accent-yellow rounded-full"></div>
              ),
              label: "PROD",
              value: "PROD",
            },
            {
              icon: (
                <div className="w-4 h-4 bg-accent-green rounded-full"></div>
              ),
              label: "DEV",
              value: "DEV",
            },
            {
              icon: <div className="w-4 h-4 bg-accent-blue rounded-full"></div>,
              label: "TEST",
              value: "TEST",
            },
          ]}
          value={formValues.environmentType}
          onChange={(value) => handleSelectChange("environmentType", value)}
          showIcon={true}
        />

        <LabelledInput
          label="Environment URL"
          id="environmentURL"
          name="environmentURL"
          value={formValues.environmentURL}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e.target.name, e.target.value)
          }
          onBlur={handleGeneralInfoBlur}
          placeholder="Enter Environment URL"
          isRequired={true}
          inputClassName="text-italic text-sm font-medium text-blue-500"
          errorMessage={errors?.environmentURL!}
          isInvalid={!!errors?.environmentURL}
        />
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-[60px] md:gap-8">
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

      {/* Connection Status */}
      <div className="space-y-2">
        <Label className="justify-start">
          Connection Status
          <span className="text-lg text-accent-orange">*</span>
        </Label>
        <FilterTabs
          options={Object.values(ConnectionStatus)
            .slice(0, 2)
            .map((status) => status)}
          defaultSelected={formValues.connectionStatus}
          onChange={(value) => handleSelectChange("connectionStatus", value)}
          className="px-0"
          activeClassName="bg-[#FFDF41] border-none rounded-zeak px-10 py-4"
          inactiveClassName="bg-[#F7F7F8] border-none rounded-zeak px-10 py-4"
        />
      </div>
    </div>
  );
};

export default ConnectionForm;
