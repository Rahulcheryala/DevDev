import { useUnifiedContext } from "../../../context";
import { RiArrowDownSLine } from "react-icons/ri";
import { useConnectionForm } from "~/modules/integrations/hooks/form/useConnectionForm";
import { FilterTabs, LabelledInput, Label, Dropdown } from "@zeak/ui";
import { ExecutionFrequency } from "@prisma/client";

export const Schedule = () => {
  const {
    state: { connectionForm, connectionErrors },
  } = useUnifiedContext();
  const { handleChange, handleSelectChange, handleScheduleBlur } = useConnectionForm();

  const safeReplace = (value: any) => {
    if (!value) return "";
    return typeof value === "string" ? value.replace(/_/g, "-") : value;
  };

  const formValues = {
    executionFrequency:
      safeReplace(connectionForm.executionFrequency) || "On-Demand",
    maxRetries: connectionForm.connectionDetails.maxRetries || 0,
    retryDelay: connectionForm.connectionDetails.retryDelay || 0,
    timeout: connectionForm.connectionDetails.timeout || "",
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
            onChange={(value) => handleSelectChange("executionFrequency", value)}
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
                  handleChange(e.target.name, e.target.value)
                }
                onBlur={handleScheduleBlur}
                errorMessage={connectionErrors?.maxRetries!}
                placeholder="Enter Maximum Retries"
                min={0}
                showNoneForZero={true}
                className="bg-white border-none"
              />

              {/* Retry Delay */}
              <LabelledInput
                type="number"
                label="Retry Delay (in seconds)"
                id="retryDelay"
                name="retryDelay"
                value={formValues.retryDelay}
                onChange={(e: any) =>
                  handleChange(e.target.name, e.target.value)
                }
                onBlur={handleScheduleBlur}
                errorMessage={connectionErrors?.retryDelay!}
                placeholder="Enter Retry Delay"
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
                onChange={(value) => handleChange("timeout", value)}
                dropdownClasses="h-10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
