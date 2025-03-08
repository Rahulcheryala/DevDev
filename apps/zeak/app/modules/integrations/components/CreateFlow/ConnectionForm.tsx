import React from 'react';
import {
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch
} from "@zeak/react";
import { InfoTooltip } from "../../../../components/Layout/Screen";
import type { ConnectionForm } from '../../models/connection-form.model';
import { IntegrationFlow } from '../../context';
import { Integration } from '../../models/constants';
import { ConnectionStatusTypes } from "~/modules/integrations/models/constants";
import { TbLink } from "react-icons/tb";
import { LuUnlink } from "react-icons/lu";

type ConnectionFormProps = {
  connectionForm?: ConnectionForm;
  errors?: { [key: string]: string | null };
  handleChange?: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  handleBlur?: (e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  currentFlow?: IntegrationFlow;
  selectedConnection?: Integration['connections'];
  selectedIntegration?: Integration;
}


const ConnectionForm = ({ connectionForm, errors, handleChange, handleBlur, currentFlow, selectedConnection, selectedIntegration }: ConnectionFormProps) => {
  

  const initialValues = {
    
    ConnectionName: currentFlow === "edit" ? selectedConnection?.connectionName : connectionForm?.connectionName,
    Enabled: currentFlow === "edit" ? selectedConnection?.enabled : connectionForm?.enabled,
    IntegrationType: currentFlow === "edit" ? selectedIntegration?.type : connectionForm?.integrationType,
    IntegrationName:  currentFlow === "edit" ? selectedIntegration?.integrationName : connectionForm?.integrationName,
    EnvironmentType: currentFlow === "edit" ? selectedConnection?.environmentType : connectionForm?.environmentType,
    EnvironmentURL: currentFlow === "edit" ? selectedConnection?.environmentURL : connectionForm?.environmentURL,
    ConnectionStatus: currentFlow === "edit" ? selectedConnection?.connectionStatus : connectionForm?.status,
  }

  console.log('in ConnectionForm',selectedConnection, selectedIntegration);

  return (
    <>
        <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-[60px] md:gap-8">
            <div className="flex flex-col gap-3 relative">
              <Label
                htmlFor="name"
                className="flex gap-1 items-center text-textLink"
              >
                Connection Name{" "}
                <span className="text-lg text-accent-red">*</span>
                <InfoTooltip
                  title="Required"
                  subtext="Enter a unique name for the Connection. The connection name must be distinct from other connection names."
                />
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter Connection Name"
                className="bg-inputBg border-0"
                value={initialValues.ConnectionName}
                onChange={(e) => handleChange!(e)}
                onBlur={(e) => handleBlur!(e)}
              />
              {errors?.name && (
                <p className="text-red-500 text-sm absolute top-full mt-0.5 ml-1">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3 relative">
              <Label htmlFor="purpose" className="text-textLink my-3">
                Enabled
              </Label>
              <div className="flex gap-3">
              <Switch
                className="data-[state=checked]:bg-green-500 !important"
                checked={initialValues.Enabled}
                onCheckedChange={() => {
            //   setValue(checked);
            //   onChange?.(checked);
            }}
            aria-label='Enabled'
          />{initialValues.Enabled === true? <span className="text-md font-sm text-green-500">Yes</span>:<span className="text-md font-sm text-grey-500">No</span>}
          </div>
              {errors?.Enabled && (
                <p className="text-red-500 text-sm absolute top-full mt-0.5 ml-1">
                  {errors.Enabled}
                </p>
              )}
            </div>
        </div>

        <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-[60px] md:gap-8 mt-4">
            <div className="flex flex-col gap-3 relative">
                <Label htmlFor="application" className="text-textLink mb-4">
                Integration Type
                </Label>
                <Select
                name="IntegrationType"
                value={initialValues.IntegrationType}
                onValueChange={(value) =>
                    handleChange!({
                    target: { name: "IntegrationType", value },
                    } as React.ChangeEvent<HTMLInputElement>)
                }
                >
                <SelectTrigger className="bg-inputBg border-0">
                    <SelectValue placeholder="Select Integration" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="User Defined">User Defined</SelectItem>
                    <SelectItem value="System">System</SelectItem>
                </SelectContent>
                </Select>
                {errors?.IntegrationType && (
                <p className="text-red-500 text-sm absolute top-full mt-0.5 ml-1">
                    {errors.IntegrationType}
                </p>
                )}
            </div>

            <div className="flex flex-col gap-3 relative">
              <Label
                htmlFor="Integration Name"
                className="flex gap-1 text-textLink"
              >
                Integration Name{" "}
                <span className="text-lg text-accent-red">*</span>
                {/* <InfoTooltip
                  title="Required"
                  subtext="Enter a unique name for the Integration Name. The connection name must be distinct from other connection names."
                /> */}
              </Label>
              <div className="flex w-full p-4 shadow-none text-foreground focus:border-primary-bright focus:ring focus:ring-[hsl(var(--accent-primary-bright),_0.09)] transition-colors placeholder:font-normal placeholder:text-tertiary rounded-md focus-visible:outline-none h-[56px] text-base bg-inputBg border-0 opacity-50 cursor-not-allowed">
                <img
                    src={selectedIntegration?.logo || '/images/dynamics365.png'}
                    alt="Integration Name"
                    className="w-4 h-w-4 mr-2 inline"
                    />
                    <span className="text-nowrap overflow-hidden text-ellipsis">{initialValues.IntegrationName}</span>
              </div>
              {errors?.IntegrationName && (
                <p className="text-red-500 text-sm absolute top-full mt-0.5 ml-1">
                  {errors.IntegrationName}
                </p>
              )}
            </div>
        </div>

        <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-[60px] md:gap-8 mt-4">
            <div className="flex flex-col gap-3 relative">
                <Label htmlFor="application" className="text-textLink mb-4">
                Environment Type
                </Label>
                <Select
                name="EnvironmentType"
                value={initialValues.EnvironmentType}
                onValueChange={(value) =>
                    handleChange!({
                    target: { name: "EnvironmentType", value },
                    } as React.ChangeEvent<HTMLInputElement>)
                }
                >
                <SelectTrigger className="bg-inputBg border-0">
                    <SelectValue placeholder="Select Integration" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="PROD">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 bg-yellow-500 rounded-full shadow-lg"></div>PROD
                    </div>
                    </SelectItem>
                    <SelectItem value="DEV">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 bg-gray-500 rounded-full shadow-lg"></div>DEV
                      </div>
                    </SelectItem>
                    <SelectItem value="UAT">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 bg-orange-500 rounded-full shadow-lg"></div>UAT
                      </div>
                    </SelectItem>
                </SelectContent>
                </Select>
                {errors?.EnvironmentType && (
                <p className="text-red-500 text-sm absolute top-full mt-0.5 ml-1">
                    {errors.EnvironmentType}
                </p>
                )}
            </div>

            <div className="flex flex-col gap-3 relative">
              <Label
                htmlFor="Integration Name"
                className="flex gap-1 text-textLink"
              >
                Environment URL{" "}
                <span className="text-lg text-accent-red">*</span>
                {/* <InfoTooltip
                  title="Required"
                  subtext="Enter a unique name for the Integration Name. The connection name must be distinct from other connection names."
                /> */}
              </Label>
              <Input
                id="EnvironmentURL"
                name="EnvironmentURL"
                placeholder="Enter Environment URL"
                className="bg-inputBg border-0"
                value={initialValues.EnvironmentURL}
                onChange={(e) => handleChange!(e)}
                onBlur={(e) => handleBlur!(e)}
              />
              {errors?.EnvironmentURL && (
                <p className="text-red-500 text-sm absolute top-full mt-0.5 ml-1">
                  {errors.EnvironmentURL}
                </p>
              )}
            </div>
        </div>

        <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-[60px] md:gap-8 mt-4">
            <div className="flex flex-col gap-3 relative">
                <Label className="text-sm text-textLink font-medium flex items-center gap-1">
                Connection Status
                <span className="text-lg text-accent-red">*</span>
              </Label>
              <div className="flex gap-4 items-center">
                <button
                  className={`flex items-center gap-1 px-8 py-3.5 rounded-md outline-none focus-visible:ring-2 ring-[#ffdf41]/50 ${initialValues.ConnectionStatus === ConnectionStatusTypes.ONLINE ? "bg-[#ffdf41] text-black" : "bg-gray-100 text-textLink"}`}
                //   onClick={() => setConnectionStatus("online")} TODO
                >
                  <TbLink size={18} className="text-green-500" /><span className="text-md">Online</span>
                </button>
                <button
                  className={`flex items-center gap-1 px-8 py-3.5 rounded-md outline-none focus-visible:ring-2 ring-[#ffdf41]/50 ${initialValues.ConnectionStatus === ConnectionStatusTypes.OFFLINE ? "bg-[#ffdf41] text-black" : "bg-gray-100 text-textLink"}`}
                //   onClick={() => setConnectionStatus("offline")} TODO
                >
                    <LuUnlink size={16} className="text-gray-500" /><span className="text-md">Offline</span>
                </button>
                {errors?.ConnectionStatus && (
                <p className="text-red-500 text-sm absolute top-full mt-0.5 ml-1">
                    {errors.ConnectionStatus}
                </p>
                )}
            </div>
             
              </div>
        </div>
    </>
  )
}

export default ConnectionForm