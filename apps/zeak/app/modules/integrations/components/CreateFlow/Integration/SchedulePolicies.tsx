import { FilterTabs, Label, LabelledInput, Dropdown } from "@zeak/ui";
import { useUnifiedContext } from "../../../context";
import { useIntegrationForm } from "../../../hooks/form/useIntegrationForm";
import { ExecutionFrequency } from "@prisma/client";
import { RiArrowDownSLine } from "react-icons/ri";

export const SchedulePolicies = () => {
  const {
    state: { integrationForm, integrationErrors },
  } = useUnifiedContext();
  const { handleChange, handleSelectChange, handleSchedulePoliciesBlur } = useIntegrationForm();

  const safeReplace = (value: any) => {
    if (!value) return "";
    return typeof value === "string" ? value.replace(/_/g, "-") : value;
  };

  const formValues = {
    executionFrequency:
      safeReplace(integrationForm.executionFrequency) || "On-Demand",
    maxRetries: integrationForm.maxRetries || 0,
    retryDelay: integrationForm.retryDelay || 0,
    timeout: integrationForm.timeout || "",
  };

  // console.log(formValues);

  return (
    <div className="w-full px-10 pt-6 pb-32">
      <div className="form-container space-y-10">
        {/* Execution Frequency */}
        <div className="space-y-2">
          <Label className="justify-start">
            Execution Frequency
            <span className="text-lg text-accent-orange">*</span>
          </Label>
          <FilterTabs
            options={Object.values(ExecutionFrequency).map((frequency) =>
              safeReplace(frequency)
            )}
            defaultSelected={formValues.executionFrequency}
            onChange={(value) => handleChange("executionFrequency", value)}
            className="px-0"
            activeClassName="bg-[#FFDF41] border-none rounded-zeak px-10 py-4"
            inactiveClassName="bg-[#F7F7F8] border-none rounded-zeak px-10 py-4"
          />
        </div>

        {/* Retry Policy Section */}
        <div className="rounded-lg bg-[#F7F7F8]">
          <div className="bg-[#C6D2E7] flex justify-between items-center rounded-t-lg px-5 py-4">
            <Label className="text-base font-medium">Retry Policy</Label>
            <RiArrowDownSLine className="text-textLink" size={24} />
          </div>

          <div className="p-6 flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-12">
              {/* Maximum Retries */}
              <LabelledInput
                type="number"
                label="Maximum Retries"
                id="maxRetries"
                name="maxRetries"
                value={formValues.maxRetries}
                onChange={(e: any) =>
                  handleChange("maxRetries", e.target.value)
                }
                onBlur={handleSchedulePoliciesBlur}
                errorMessage={integrationErrors?.maxRetries!}
                placeholder="Enter Connection Limit"
                min={0}
                showNoneForZero={true}
                className="bg-white border-none"
              />

              {/* Retry Delay */}
              <LabelledInput
                type="number"
                label="Retry Delay"
                id="retryDelay"
                name="retryDelay"
                value={formValues.retryDelay}
                onChange={(e: any) =>
                  handleChange("retryDelay", e.target.value)
                }
                onBlur={handleSchedulePoliciesBlur}
                errorMessage={integrationErrors?.retryDelay!}
                placeholder="Enter retry delay"
                min={0}
                showNoneForZero={true}
                className="bg-white border-none"
              />
            </div>

            {/* Timeout */}
            <div className="grid grid-cols-2 gap-12">
              <Dropdown
                name="timeout"
                label="Timeout"
                placeholder="Select Timeout"
                inputClasses="bg-white"
                items={["10s", "30s", "45s", "90s", "120s"].map((timeout) => ({
                  label: timeout,
                  value: timeout,
                }))}
                value={formValues.timeout}
                onChange={(value) => handleSelectChange("timeout", value)}
                dropdownClasses="h-10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
