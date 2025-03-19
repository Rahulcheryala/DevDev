import React, { useState } from "react";
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
import { InfoTooltip } from "../../../../../components/Layout/Screen";
import {
  IntegrationType,
  EnvironmentType,
} from "@prisma/client";
import { UnifiedAction, ConnectionFlow } from "~/modules/integrations/context";
import { IIntegrationModel } from "~/modules/integrations/models/integration.model";
import { CiEdit } from "react-icons/ci";
import { TbLink } from "react-icons/tb";
import { LuUnlink } from "react-icons/lu";
import { MultiSelect } from "~/components/Common";
import { IConnectionModel } from "~/modules/integrations/models/connection.model";

type ConnectionFormProps = {
  dispatch?: React.Dispatch<UnifiedAction>;
  connectionForm?: any;
  connectionErrors?: any;
  selectedIntegration: IIntegrationModel;
  selectedConnection?: IConnectionModel;
  handleChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  currentFlow: ConnectionFlow;
};

const ConnectionForm = ({
  dispatch,
  connectionForm,
  connectionErrors,
  selectedIntegration,
  selectedConnection,
  handleChange,
  handleBlur,
  currentFlow,
}: ConnectionFormProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(true);
  const [connectionStatus, setConnectionStatus] = useState<string>(
    connectionForm.connectionStatus || "Online"
  );

  console.log(EnvironmentType);

  // Helper function to get value based on edit mode
  const getValue = (editValue?: any, formValue?: any) => 
    currentFlow === "edit" ? editValue : formValue;

  const initialValues = {
    connectionName: getValue(selectedConnection?.connectionName, connectionForm.connectionName),
    connectionCode: getValue(selectedConnection?.connectionCode, connectionForm.connectionCode),
    connectionDescription: getValue(selectedConnection?.connectionDescription, connectionForm.connectionDescription),
    isEnabled: getValue(selectedConnection?.isEnabled, connectionForm.isEnabled),
    // Direct access for nested objects
    environmentType: getValue(selectedConnection?.connectionDetails?.environmentType, connectionForm.connectionDetails?.environmentType),
    environmentURL: getValue(selectedConnection?.connectionDetails?.environmentURL, connectionForm.connectionDetails?.environmentURL),
    maxRetries: getValue(selectedConnection?.connectionDetails?.maxRetries, connectionForm.connectionDetails?.maxRetries),
    timeout: getValue(selectedConnection?.connectionDetails?.timeout, connectionForm.connectionDetails?.timeout),
    retryDelay: getValue(selectedConnection?.connectionDetails?.retryDelay, connectionForm.connectionDetails?.retryDelay),
    executionFrequency: getValue(selectedConnection?.executionFrequency, connectionForm.executionFrequency),
    connectionStatus: getValue(selectedConnection?.connectionStatus, connectionForm.connectionStatus),
    companies: getValue(selectedConnection?.companyIds, connectionForm.companies),
  };

  // Handle toggle change for isEnabled
  const handleToggleChange = (enabled: boolean) => {
    dispatch?.({
      type: "UPDATE_CONNECTION_FORM",
      payload: { isEnabled: enabled },
      setFormDirty: true,
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-[60px] md:gap-8">
        <div className="flex flex-col gap-3 relative">
          <Label
            htmlFor="connectionName"
            className="flex gap-1 items-center text-textLink"
          >
            Connection Name <span className="text-lg text-accent-red">*</span>
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
            value={initialValues.connectionName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {connectionErrors.connectionName && (
            <p className="text-red-500 text-sm absolute top-full mt-0.5 ml-1">
              {connectionErrors.connectionName}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 relative">
          <Label
            htmlFor="connectionCode"
            className="flex gap-1 items-center text-textLink"
          >
            <div className="flex flex-1 gap-1 items-center">
              Connection Code{" "}
              <span className="text-lg text-accent-red">*</span>
              <InfoTooltip
                title="Required, unique"
                subtext="Enter a unique code for the connection."
              />
            </div>
            <CiEdit
              className="self-center cursor-pointer text-xl"
              onClick={() => setIsEditing(!isEditing)}
            />
          </Label>
          <Input
            id="connectionCode"
            name="connectionCode"
            placeholder="Enter Connection Code"
            className="bg-inputBg border-0"
            value={initialValues.connectionCode}
            onChange={(e) => handleChange!(e)}
            onBlur={(e) => handleBlur!(e)}
            isDisabled={isEditing}
          />
          {connectionErrors?.connectionCode && (
            <p className="text-red-500 text-sm absolute top-full mt-0.5 ml-1">
              {connectionErrors.connectionCode}
            </p>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-[60px] md:gap-8">
        <div className="flex flex-col gap-3 relative">
          <Label
            htmlFor="connectionDescription"
            className="text-textLink h-7 inline-flex items-center"
          >
            Purpose
          </Label>
          <ExpandableTextArea
            id="connectionDescription"
            name="connectionDescription"
            placeholder="Enter Purpose"
            className="bg-inputBg border-0 text-base"
            inputClassname="text-base bg-inputBg placeholder:text-tertiary"
            value={initialValues.connectionDescription}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {connectionErrors.connectionDescription && (
            <p className="text-red-500 text-sm absolute top-full mt-0.5 ml-1">
              {connectionErrors.connectionDescription}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 relative">
          {/* Toggle switch for isEnabled */}
          <Label
            htmlFor="isEnabled"
            className="text-textLink h-7 inline-flex items-center"
          >
            Enabled
          </Label>
          <div className="flex items-center gap-3 py-3.5">
            <div
              className={`relative w-11 h-[26px] p-2 rounded-full cursor-pointer transition-colors duration-300 ${initialValues.isEnabled ? "bg-accent-brightGreen" : "bg-gray-200"}`}
              onClick={() => handleToggleChange(!initialValues.isEnabled)}
            >
              <div
                className={`absolute top-0.5 w-[22px] h-[22px] bg-white rounded-full transform transition-transform duration-300 ${
                  initialValues.isEnabled ? "left-5" : "left-0.5"
                }`}
              />
            </div>
            <span className="text-sm">
              {initialValues.isEnabled ? "Yes" : "No"}
            </span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-[60px] md:gap-8">
        <div className="flex flex-col gap-3 relative">
          <Label
            htmlFor="integrationType"
            className="text-textLink h-7 inline-flex items-center"
          >
            Integration Type
          </Label>
          <Select
            name="integrationType"
            value={selectedIntegration?.integrationType}
            disabled
          >
            <SelectTrigger className="bg-inputBg border-0">
              <SelectValue placeholder="Select Integration Type" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(IntegrationType).map((integrationType) => (
                <SelectItem
                  key={integrationType}
                  value={integrationType?.replace(/_/g, " ")}
                >
                  {integrationType?.replace(/_/g, " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {connectionErrors.integrationType && (
            <p className="text-red-500 text-sm absolute top-full mt-0.5 ml-1">
              {connectionErrors.integrationType}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 relative">
          <Label
            htmlFor="integrationName"
            className="text-textLink h-7 inline-flex items-center"
          >
            Integration Name
          </Label>
          <Select
            name="integrationName"
            value={selectedIntegration?.integrationName}
            disabled
          >
            <SelectTrigger className="bg-inputBg border-0">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={selectedIntegration?.integrationName!}>
                {selectedIntegration?.integrationName!}
              </SelectItem>
            </SelectContent>
          </Select>
          {connectionErrors.integrationName && (
            <p className="text-red-500 text-sm absolute top-full mt-0.5 ml-1">
              {connectionErrors.integrationName}
            </p>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-[60px] md:gap-8">
        <div className="flex flex-col gap-3 relative">
          <Label htmlFor="environmentType" className="text-textLink">
            Environment Type <span className="text-lg text-accent-red">*</span>
          </Label>
          <Select
            name="environmentType"
            value={initialValues.environmentType}
            onValueChange={(value) =>
              handleChange!({
                target: { name: "environmentType", value },
              } as React.ChangeEvent<HTMLInputElement>)
            }
          >
            <SelectTrigger className="bg-inputBg border-0">
              <SelectValue placeholder="Select Environment Type" />
            </SelectTrigger>
            <SelectContent>
              {/* {Object.values(EnvironmentType).map((environmentType) => (
                <SelectItem key={environmentType} value={environmentType}>
                  {environmentType}
                </SelectItem>
              ))} */}
              <SelectItem value="Sandbox">Sandbox</SelectItem>
              <SelectItem value="Production">Production</SelectItem>
            </SelectContent>
          </Select>
          {connectionErrors.environmentType && (
            <p className="text-red-500 text-sm absolute top-full mt-0.5 ml-1">
              {connectionErrors.environmentType}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 relative">
          <Label htmlFor="environmentURL" className="text-textLink">
            Environment URL <span className="text-lg text-accent-red">*</span>
          </Label>
          <Input
            id="environmentURL"
            name="environmentURL"
            placeholder="Enter Environment URL"
            className="bg-inputBg border-0 text-italic text-sm font-medium text-blue-500"
            value={initialValues.environmentURL}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {connectionErrors.environmentURL && (
            <p className="text-red-500 text-sm absolute top-full mt-0.5 ml-1">
              {connectionErrors.environmentURL}
            </p>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-[60px] md:gap-8">
        <div className="flex flex-col gap-3 relative">
          <Label htmlFor="companies" className="text-textLink">
            Company(s) <span className="text-lg text-accent-red">*</span>
          </Label>
          <MultiSelect
            options={connectionForm.companies}
            selectedOptions={initialValues.companies}
            onSelect={(value) =>
              handleChange!({
                target: { name: "companies", value },
              } as unknown as React.ChangeEvent<HTMLInputElement>)
            }
            onDelete={(value) =>
              handleChange!({
                target: { name: "companies", value },
              } as unknown as React.ChangeEvent<HTMLInputElement>)
            }
          />
          {connectionErrors.companies && (
            <p className="text-red-500 text-sm absolute top-full mt-0.5 ml-1">
              {connectionErrors.companies}
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
            className={`px-8 py-3.5 rounded-md outline-none flex items-center gap-2.5 focus-visible:ring-2 ring-[#ffdf41]/50 ${connectionStatus === "Online" ? "bg-[#ffdf41] text-black" : "bg-gray-100 text-textLink"}`}
            onClick={() => setConnectionStatus("Online")}
            type="button"
          >
            <TbLink className="w-4 h-4" />
            Online
          </button>
          <button
            className={`px-8 py-3.5 rounded-md outline-none flex items-center gap-2.5 focus-visible:ring-2 ring-[#ffdf41]/50 ${connectionStatus === "Offline" ? "bg-[#ffdf41] text-black" : "bg-gray-100 text-textLink"}`}
            onClick={() => setConnectionStatus("Offline")}
            type="button"
          >
            <LuUnlink className="w-4 h-4" />
            Offline
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectionForm;
