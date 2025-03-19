import { useState } from "react";
import {
  Label,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zeak/react";
import { useUnifiedContext } from "../../../context";
import { z } from "zod";
import { RiArrowDownSLine } from "react-icons/ri";

export const schedulePoliciesSchema = z.object({
  maxRetries: z.number().min(1, "Maximum number of retries is required"),
  retryDelay: z.number().min(1, "Retry delay is required"),
  timeout: z.string().min(1, "Timeout is required"),
});

export const SchedulePolicies = () => {
  const { state, dispatch } = useUnifiedContext();
  const { integrationForm } = state;
  const [executionType, setExecutionType] = useState<string>(
    integrationForm.executionFrequency || "on-demand"
  );

  const handleChange = (name: string, value: string) => {
    dispatch({
      type: "UPDATE_INTEGRATION_FORM",
      payload: { [name]: value },
    });
  };

  const handleBlur = async (name: string, value: string) => {
    try {
      (schedulePoliciesSchema as any).pick({ [name]: true }).parse({ [name]: value });
      dispatch({ type: "UPDATE_INTEGRATION_ERROR", payload: { [name]: null } });
    } catch (error) {
      if (error instanceof z.ZodError) {
        dispatch({
          type: "UPDATE_INTEGRATION_ERROR",
          payload: { [name]: error.errors[0].message },
        });
      }
    }
  };

  return (
    <div className="w-full px-10 py-6">
      <div className="form-container space-y-10">
        {/* Execution Frequency */}
        <div className="space-y-2">
          <Label className="text-sm text-textLink font-medium flex items-center gap-1">
            Execution Frequency
            <span className="text-lg text-accent-red">*</span>
          </Label>
          <div className="flex gap-4 items-center">
            <button
              className={`px-8 py-3.5 rounded-md outline-none focus-visible:ring-2 ring-[#ffdf41]/50 ${executionType === "on-demand" ? "bg-[#ffdf41] text-black" : "bg-gray-100 text-textLink"}`}
              onClick={() => setExecutionType("on-demand")}
            >
              On-Demand
            </button>
            <button
              className={`px-8 py-3.5 rounded-md outline-none focus-visible:ring-2 ring-[#ffdf41]/50 ${executionType === "scheduled" ? "bg-[#ffdf41] text-black" : "bg-gray-100 text-textLink"}`}
              onClick={() => setExecutionType("scheduled")}
            >
              Scheduled
            </button>
          </div>
        </div>

        {/* Retry Policy Section */}
        <div className="rounded-lg bg-[#F7F7F8]">
          <div className="bg-[#C6D2E7] flex justify-between items-center rounded-t-lg px-5 py-4">
            <Label className="text-base font-medium">
              Retry Policy
            </Label>
            <RiArrowDownSLine className="text-textLink" size={24} />
          </div>

          <div className="p-6 flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-12">
              {/* Maximum Retries */}
              <div className="flex flex-col gap-3">
                <Label htmlFor="maxRetries" className="text-sm text-textLink">
                  Maximum number of retries allowed
                </Label>
                <Input
                  id="maxRetries"
                  name="maxRetries"
                  type="number"
                  min={1}
                  placeholder="Enter max no.of retries"
                  className="border-0"
                  value={integrationForm.maxRetries!}
                  onChange={(e) => handleChange("maxRetries", e.target.value)}
                  onBlur={(e) => handleBlur("maxRetries", e.target.value)}
                />
              </div>

              {/* Retry Delay */}
              <div className="flex flex-col gap-3">
                <Label htmlFor="retryDelay" className="text-sm text-textLink">
                  Retry Delay (in Seconds)
                </Label>
                <Input
                  id="retryDelay"
                  name="retryDelay"
                  type="number"
                  min={1}
                  placeholder="Enter retry delay"
                  className="border-0"
                  value={integrationForm.retryDelay!}
                  onChange={(e) => handleChange("retryDelay", e.target.value)}
                  onBlur={(e) => handleBlur("retryDelay", e.target.value)}
                />
              </div>
            </div>

            {/* Timeout */}
            <div className="grid grid-cols-2 gap-12">
              <div className="flex flex-col gap-3">
                <Label htmlFor="timeout" className="text-sm text-textLink">
                  Timeout
                </Label>
                <Select
                  name="timeout"
                  value={integrationForm.timeout?.toString()}
                  onValueChange={(value) => handleChange("timeout", value)}
                >
                  <SelectTrigger className="border-0 bg-white">
                    <SelectValue placeholder="None" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="30">30 seconds</SelectItem>
                    <SelectItem value="60">1 minute</SelectItem>
                    <SelectItem value="300">5 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
