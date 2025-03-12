import {
  ExpandableTextArea,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zeak/react";
import { useRef, useState } from "react";
import { z } from "zod";
import { InfoTooltip } from "../../../../../components/Layout/Screen";
import { RiArrowDownSLine } from "react-icons/ri";
import { useUnifiedContext } from "~/modules/integrations/context";
import { ApplicationName, EnvironmentType } from "@prisma/client";

// Define the Zod schema for validation
export const integrationGeneralInfoSchema = z.object({
  logo: z.string().optional(),
  name: z.string().min(1, "Integration name is required"),
  purpose: z.string().min(1, "Purpose is required"),
  application: z.string().min(1, "Application is required"),
  integrationCategory: z.string().min(1, "Integration category is required"),
  connectionType: z.string().min(1, "Connection type is required"),
  authentication: z.string().min(1, "Authentication is required"),
  companies: z.array(z.string()).min(1, "At least one company is required"),
});

export const General = () => {
  const { state, dispatch } = useUnifiedContext();
  const { connectionForm, selectedIntegration } = state;
  const { connectionDetails } = connectionForm;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showComparisonTable, setShowComparisonTable] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<string>(
    connectionForm.connectionStatus || "Online"
  );

  const convertCompaniesToString = (companies: string[]) => {
    return companies.join(", ");
  };
  const companies = convertCompaniesToString(connectionForm.companies);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_CONNECTION_FORM", payload: { [name]: value } });
  };

  const handleBlur = async (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    try {
      (integrationGeneralInfoSchema as any)
        .pick({ [name]: true })
        .parse({ [name]: value });
      dispatch({ type: "UPDATE_CONNECTION_ERROR", payload: { [name]: null } });
    } catch (error) {
      if (error instanceof z.ZodError) {
        dispatch({
          type: "UPDATE_CONNECTION_ERROR",
          payload: { [name]: error.errors[0].message },
        });
      }
    }
  };

  return (
    <div className="w-full px-10 py-8">
      <div className="form-container">
        <div className="flex flex-col gap-8">
          <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-[60px] md:gap-8">
            <div className="flex flex-col gap-3 relative">
              <Label
                htmlFor="connectionName"
                className="flex gap-1 items-center text-textLink"
              >
                Connection Name{" "}
                <span className="text-lg text-accent-red">*</span>
                <InfoTooltip
                  title="Required"
                  subtext="Enter a unique name for the connection. The connection name must be distinct from other connections."
                />
              </Label>
              <Input
                id="connectionName"
                name="connectionName"
                placeholder="Enter Connection Name"
                className="bg-inputBg border-0"
                value={connectionForm.connectionName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {state.connectionErrors.connectionName && (
                <p className="text-red-500 text-sm absolute top-full mt-0.5 ml-1">
                  {state.connectionErrors.connectionName}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3 relative">
              <Label htmlFor="purpose" className="text-textLink">
                Purpose <span className="text-lg text-accent-red">*</span>
              </Label>
              <ExpandableTextArea
                id="purpose"
                name="connectionDescription"
                placeholder="Enter Purpose"
                className="bg-inputBg border-0 text-base"
                inputClassname="text-base bg-inputBg placeholder:text-tertiary"
                value={connectionForm.connectionDescription}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {state.connectionErrors.status && (
                <p className="text-red-500 text-sm absolute top-full mt-0.5 ml-1">
                  {state.connectionErrors.status}
                </p>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-[60px] md:gap-8">
            <div className="flex flex-col gap-3 relative">
              <Label htmlFor="integrationType" className="text-textLink">
                Integration Type{" "}
                <span className="text-lg text-accent-red">*</span>
              </Label>
              <Select
                name="integrationType"
                value={selectedIntegration?.integrationType}
                // onValueChange={(value) =>
                //   handleChange({
                //     target: { name: "integrationType", value },
                //   } as React.ChangeEvent<HTMLInputElement>)
                // }
                disabled
              >
                <SelectTrigger className="bg-inputBg border-0">
                  <SelectValue placeholder="Select Integration Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="User_Defined">User Defined</SelectItem>
                  <SelectItem value="System">System</SelectItem>
                </SelectContent>
              </Select>
              {state.connectionErrors.integrationType && (
                <p className="text-red-500 text-sm absolute top-full mt-0.5 ml-1">
                  {state.connectionErrors.integrationType}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3 relative">
              <Label htmlFor="integrationName" className="text-textLink">
                Integration Name{" "}
                <span className="text-lg text-accent-red">*</span>
              </Label>
              <Select
                name="integrationName"
                value={selectedIntegration?.integrationName}
                // onValueChange={(value) =>
                //   handleChange({
                //     target: { name: "integrationName", value },
                //   } as React.ChangeEvent<HTMLInputElement>)
                // }
                disabled
              >
                <SelectTrigger className="bg-inputBg border-0">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(ApplicationName).map((application) => (
                    <SelectItem
                      key={application}
                      value={application.replace(/_/g, " ")}
                    >
                      {application.replace(/_/g, " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {state.connectionErrors.integrationName && (
                <p className="text-red-500 text-sm absolute top-full mt-0.5 ml-1">
                  {state.connectionErrors.integrationName}
                </p>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-[60px] md:gap-8">
            <div className="flex flex-col gap-3 relative">
              <Label
                htmlFor="environmentType"
                className="text-textLink flex justify-between items-end"
              >
                <p>
                  Environment Type{" "}
                  <span className="text-lg text-accent-red">*</span>
                </p>

                <button
                  className="text-blue-500 text-xs mb-2"
                  onClick={() => setShowComparisonTable(true)}
                >
                  Where to use each connection type?
                </button>
              </Label>
              <Select
                name="environmentType"
                value={connectionDetails.environmentType}
                onValueChange={(value) =>
                  handleChange({
                    target: { name: "environmentType", value },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
              >
                <SelectTrigger className="bg-inputBg border-0">
                  <SelectValue placeholder="Select Environment Type" />
                </SelectTrigger>
                <SelectContent>
                  {/* {Object.values(EnvironmentType).map((environment) => (
                    <SelectItem key={environment} value={environment}>
                      {environment}
                    </SelectItem>
                  ))} */}
                </SelectContent>
              </Select>
              {state.connectionErrors.environmentType && (
                <p className="text-red-500 text-sm absolute top-full mt-0.5 ml-1">
                  {state.connectionErrors.environmentType}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3 relative">
              <Label htmlFor="environmentUrl" className="text-textLink">
                Environment URL{" "}
                <span className="text-lg text-accent-red">*</span>
              </Label>
              <Input
                id="environmentUrl"
                name="environmentUrl"
                placeholder="Enter Environment URL"
                className="bg-inputBg border-0"
                value={connectionDetails.environmentURL}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {state.connectionErrors.environmentURL && (
                <p className="text-red-500 text-sm absolute top-full mt-0.5 ml-1">
                  {state.connectionErrors.environmentURL}
                </p>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-[60px] md:gap-8">
            <div className="flex flex-col gap-3 relative">
              <Label htmlFor="companies" className="text-textLink">
                Company(s) <span className="text-lg text-accent-red">*</span>
              </Label>
              <Select
                name="companies"
                value={companies}
                onValueChange={(value) =>
                  handleChange({
                    target: { name: "companies", value },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
              >
                <SelectTrigger className="bg-inputBg border-0">
                  <SelectValue placeholder="Select Companies" />
                </SelectTrigger>
                <SelectContent>
                  {connectionForm.companies.map(
                    (company: string, index: number) => (
                      <SelectItem key={index} value={company}>
                        {company}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              {state.connectionErrors.companies && (
                <p className="text-red-500 text-sm absolute top-full mt-0.5 ml-1">
                  {state.connectionErrors.companies}
                </p>
              )}
            </div>
          </div>

          {/* Connection Status */}
          <div className="space-y-2">
            <Label className="text-sm text-textLink font-medium flex items-center gap-1">
              Connection Status
              <span className="text-lg text-accent-red">*</span>
            </Label>
            <div className="flex gap-4 items-center">
              <button
                className={`px-8 py-3.5 rounded-md outline-none focus-visible:ring-2 ring-[#ffdf41]/50 ${connectionStatus === "Online" ? "bg-[#ffdf41] text-black" : "bg-gray-100 text-textLink"}`}
                onClick={() => setConnectionStatus("Online")}
              >
                Online
              </button>
              <button
                className={`px-8 py-3.5 rounded-md outline-none focus-visible:ring-2 ring-[#ffdf41]/50 ${connectionStatus === "Offline" ? "bg-[#ffdf41] text-black" : "bg-gray-100 text-textLink"}`}
                onClick={() => setConnectionStatus("Offline")}
              >
                Offline
              </button>
            </div>
          </div>

          {/* Integration Settings Section */}
          <div className="rounded-lg bg-[#F7F7F8]">
            <div className="bg-[#E5EAF2] flex justify-between items-center rounded-t-lg px-5 py-4">
              <Label className="text-base font-medium">
                Integration Settings
              </Label>
              <RiArrowDownSLine className="text-textLink" size={24} />
            </div>

            <div className="p-6 flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-12">
                <div className="flex flex-col gap-3">
                  <Label
                    htmlFor="connectionType"
                    className="text-sm text-textLink"
                  >
                    Connection Type
                  </Label>
                  <Input
                    id="connectionType"
                    name="connectionType"
                    type="text"
                    placeholder="Enter Connection Type"
                    className="border-0 bg-white"
                    value={selectedIntegration?.connectionType}
                    isDisabled
                    // onChange={(e) => handleChange("connectionType", e.target.value)}
                    // onBlur={(e) => handleBlur("connectionType", e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <Label
                    htmlFor="authentication"
                    className="text-sm text-textLink"
                  >
                    Authentication
                  </Label>
                  <Input
                    id="authentication"
                    name="authentication"
                    type="text"
                    placeholder="Enter Authentication Type"
                    className="border-0 bg-white"
                    value={selectedIntegration?.authType.replace(/_/g, ' ')}
                    isDisabled
                    // onChange={(e) => handleChange("authentication", e.target.value)}
                    // onBlur={(e) => handleBlur("authentication", e.target.value)}
                  />
                </div>
              </div>

              {/* Integration Category */}
              <div className="grid grid-cols-2 gap-12">
                <div className="flex flex-col gap-3">
                  <Label
                    htmlFor="integrationCategory"
                    className="text-sm text-textLink"
                  >
                    Integration Category
                  </Label>
                  <Input
                    id="integrationCategory"
                    name="integrationCategory"
                    type="text"
                    min={1}
                    placeholder="Enter integration category"
                    className="border-0 bg-white"
                    value={selectedIntegration?.integrationCategory.replace(/_/g, ' ')}
                    isDisabled
                    // onChange={(e) => handleChange("integrationCategory", e.target.value)}
                    // onBlur={(e) => handleBlur("integrationCategory", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
