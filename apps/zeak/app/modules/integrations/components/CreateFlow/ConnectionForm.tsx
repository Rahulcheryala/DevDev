import React from 'react';
import {
  ExpandableTextArea,
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
import { itemsEqual } from '@dnd-kit/sortable/dist/utilities';

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
              <Label htmlFor="purpose" className="text-textLink">
                Enabled
              </Label>
              <Switch
                className="bg-green"
                checked={initialValues.Enabled}
                onCheckedChange={() => {
            //   setValue(checked);
            //   onChange?.(checked);
            }}
            aria-label='Enabled'
            // {...props}
          />
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
                    <SelectItem value="userDefined">User Defined</SelectItem>
                    <SelectItem value="system">System</SelectItem>
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
              <Input
                id="IntegrationName"
                name="IntegrationName"
                placeholder="Enter Integration Name"
                className="bg-inputBg border-0"
                value={initialValues.IntegrationName}
                onChange={(e) => handleChange!(e)}
                onBlur={(e) => handleBlur!(e)}
              />
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
                    <SelectItem value="PROD">PROD</SelectItem>
                    <SelectItem value="DEV">DEV</SelectItem>
                    <SelectItem value="UAT">UAT</SelectItem>
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
                <Label htmlFor="application" className="text-textLink">
                Connection Status
                </Label>
                <Select
                name="ConnectionStatus"
                value={initialValues.ConnectionStatus}
                onValueChange={(value) =>
                    handleChange!({
                    target: { name: "ConnectionStatus", value },
                    } as React.ChangeEvent<HTMLInputElement>)
                }
                >
                <SelectTrigger className="bg-inputBg border-0">
                    <SelectValue placeholder="Select Integration" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Online">Online</SelectItem>
                    <SelectItem value="Offline">Offline</SelectItem>
                </SelectContent>
                </Select>
                {errors?.ConnectionStatus && (
                <p className="text-red-500 text-sm absolute top-full mt-0.5 ml-1">
                    {errors.ConnectionStatus}
                </p>
                )}
            </div>
        </div>
    </>
  )
}

export default ConnectionForm