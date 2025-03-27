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
import { InfoTooltip } from "../../../../components/Layout/Screen";
import type { IntegrationForm } from "../../models/integration-form.model";
import { IntegrationFlow, UnifiedAction } from "../../context";
import { IIntegrationModel } from "../../models/integration.model";
import {
  ApplicationName,
  AuthType,
  ConnectionType,
  IntegrationCategory,
  Status,
} from "@prisma/client";
import { MultiSelect } from "~/components/Common";
import { fetchIntegrationsList } from "../../utils/api.utils";

type IntegrationFormProps = {
  dispatch?: React.Dispatch<UnifiedAction>;
  integrationForm?: IntegrationForm;
  errors?: { [key: string]: string | null };
  handleChange?: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  handleBlur?: (
    e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  currentFlow?: IntegrationFlow;
  selectedIntegration?: IIntegrationModel;
};

const IntegrationForm = ({
  dispatch,
  integrationForm,
  errors,
  handleChange,
  handleBlur,
  currentFlow,
  selectedIntegration,
}: IntegrationFormProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(true);

  const generateCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const length = 8;
    const timestamp = new Date().getTime().toString().slice(-4);
    let result = "";
    for (let i = 0; i < length / 2; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    result += timestamp;
    return result;
  };

  const checkDuplicacy = async (value: string) => {
    try {
      if (
        currentFlow === "edit" &&
        selectedIntegration?.integrationName === value
      ) {
        return false;
      }
      const response = await fetchIntegrationsList({ integrationName: value });
      if (response.data.length > 0) {
        dispatch!({
          type: "SET_INTEGRATION_ERROR",
          payload: {
            name: "integrationName Error",
            message: "Integration with this name already exists",
          },
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error checking duplicacy:", error);
      return false;
    }
  };

  const initialValues = {
    integrationName:
      currentFlow === "edit"
        ? selectedIntegration?.integrationName
        : integrationForm?.integrationName,
    integrationCode:
      currentFlow === "edit"
        ? selectedIntegration?.integrationCode
        : integrationForm?.integrationCode,
    purpose:
      currentFlow === "edit"
        ? selectedIntegration?.description
        : integrationForm?.description,
    applicationName:
      currentFlow === "edit"
        ? selectedIntegration?.applicationName
        : integrationForm?.applicationName,
    integrationCategory:
      currentFlow === "edit"
        ? selectedIntegration?.integrationCategory
        : integrationForm?.integrationCategory,
    connectionType:
      currentFlow === "edit"
        ? selectedIntegration?.connectionType
        : integrationForm?.connectionType,
    authentication:
      currentFlow === "edit"
        ? selectedIntegration?.authType
        : integrationForm?.authType,
    // status: currentFlow === "edit" ? selectedIntegration?.status : integrationForm?.status,
    connectionLimit:
      currentFlow === "edit"
        ? selectedIntegration?.connectionLimit
        : integrationForm?.connectionLimit,
    companyIds:
      currentFlow === "edit"
        ? selectedIntegration?.companyIds
        : integrationForm?.companyIds,
  };

  console.log(initialValues);

  return (
    <>
      <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-[60px] md:gap-8">
        <div className="flex flex-col gap-3 relative">
          <Label
            htmlFor="integrationName"
            className="flex gap-1 items-center text-textLink"
          >
            Integration Name <span className="text-lg text-accent-red">*</span>
            <InfoTooltip
              title="Required"
              subtext="Enter a unique name for the integration. The integration name must be distinct from other integrations."
            />
          </Label>
          <Input
            id="integrationName"
            name="integrationName"
            placeholder="Enter Integration Name"
            className="bg-inputBg border-0"
            value={initialValues.integrationName}
            onChange={(e) => handleChange!(e)}
            onBlur={(e) => handleBlur!(e)}
          />
          {errors?.integrationName && (
            <p className="text-red-500 text-sm absolute top-full mt-0.5 ml-1">
              {errors.integrationName}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 relative">
          <Label
            htmlFor="integrationCode"
            className="flex gap-1 items-center text-textLink"
          >
            Integration Code <span className="text-lg text-accent-red">*</span>
          </Label>
          <Input
            id="integrationCode"
            name="integrationCode"
            placeholder="Enter Integration Code"
            className="bg-inputBg border-0"
            value={initialValues.integrationCode}
            onChange={(e) => handleChange!(e)}
            onBlur={(e) => handleBlur!(e)}
          />
          {errors?.integrationCode && (
            <p className="text-red-500 text-sm absolute top-full mt-0.5 ml-1">
              {errors.integrationCode}
            </p>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-[60px] md:gap-8">
        <div className="flex flex-col gap-3 relative">
          <Label
            htmlFor="purpose"
            className="text-textLink h-7 inline-flex items-center"
          >
            Purpose
          </Label>
          <ExpandableTextArea
            id="purpose"
            name="purpose"
            placeholder="Enter Purpose"
            className="bg-inputBg border-0 text-base"
            inputClassname="text-base bg-inputBg placeholder:text-tertiary"
            value={initialValues.purpose}
            onChange={(e) => handleChange!(e)}
            onBlur={(e) => handleBlur!(e)}
          />
          {errors?.purpose && (
            <p className="text-red-500 text-sm absolute top-full mt-0.5 ml-1">
              {errors.purpose}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 relative">
          <Label htmlFor="applicationName" className="text-textLink">
            Application <span className="text-lg text-accent-red">*</span>
          </Label>
          <Select
            name="applicationName"
            value={initialValues.applicationName}
            onValueChange={(value) =>
              handleChange!({
                target: { name: "applicationName", value },
              } as React.ChangeEvent<HTMLInputElement>)
            }
          >
            <SelectTrigger className="bg-inputBg border-0">
              <SelectValue placeholder="Select Application" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(ApplicationName).map((application) => (
                <SelectItem key={application} value={application}>
                  {application}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors?.applicationName && (
            <p className="text-red-500 text-sm absolute top-full mt-0.5 ml-1">
              {errors.applicationName}
            </p>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-[60px] md:gap-8">
        <div className="flex flex-col gap-3 relative">
          <Label htmlFor="integrationCategory" className="text-textLink">
            Integration Category{" "}
            <span className="text-lg text-accent-red">*</span>
          </Label>
          <Select
            name="integrationCategory"
            value={initialValues.integrationCategory}
            onValueChange={(value) =>
              handleChange!({
                target: { name: "integrationCategory", value },
              } as React.ChangeEvent<HTMLInputElement>)
            }
          >
            <SelectTrigger className="bg-inputBg border-0">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(IntegrationCategory).map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors?.integrationCategory && (
            <p className="text-red-500 text-sm absolute top-full mt-0.5 ml-1">
              {errors.integrationCategory}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 relative">
          <Label
            htmlFor="connectionType"
            className="text-textLink flex justify-between items-end"
          >
            <p>
              Connection Type <span className="text-lg text-accent-red">*</span>
            </p>

            <button
              className="text-blue-500 text-xs mb-2"
              // onClick={() => setShowComparisonTable(true)}
            >
              Where to use each connection type?
            </button>
          </Label>
          <Select
            name="connectionType"
            value={initialValues.connectionType}
            onValueChange={(value) =>
              handleChange!({
                target: { name: "connectionType", value },
              } as React.ChangeEvent<HTMLInputElement>)
            }
          >
            <SelectTrigger className="bg-inputBg border-0">
              <SelectValue placeholder="Select Connection Type" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(ConnectionType).map((connectionType) => (
                <SelectItem key={connectionType} value={connectionType}>
                  {connectionType}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors?.connectionType && (
            <p className="text-red-500 text-sm absolute top-full mt-0.5 ml-1">
              {errors.connectionType}
            </p>
          )}
        </div>
      </div>

      {/* {currentFlow === "edit" && (
          <div className="flex flex-col gap-3 relative">
            <Label htmlFor="status" className="text-textLink">
              Connection Status{" "}
              <span className="text-lg text-accent-red">*</span>
            </Label>
            <Select
              name="status"
              value={initialValues.status}
              onValueChange={(value) =>
                handleChange!({
                  target: { name: "status", value },
                } as React.ChangeEvent<HTMLInputElement>)
              }
            >
              <SelectTrigger className="bg-inputBg border-0">
                <SelectValue placeholder="Select Authentication Type" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(Status).map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )} */}

      <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-[60px] md:gap-8">
        <div className="flex flex-col gap-3 relative">
          <Label htmlFor="authentication" className="text-textLink">
            Authentication <span className="text-lg text-accent-red">*</span>
          </Label>
          <Select
            name="authentication"
            value={initialValues.authentication}
            onValueChange={(value) =>
              handleChange!({
                target: { name: "authentication", value },
              } as React.ChangeEvent<HTMLInputElement>)
            }
          >
            <SelectTrigger className="bg-inputBg border-0">
              <SelectValue placeholder="Select Authentication Type" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(AuthType).map((authType) => (
                <SelectItem key={authType} value={authType}>
                  {authType}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors?.authentication && (
            <p className="text-red-500 text-sm absolute top-full mt-0.5 ml-1">
              {errors.authentication}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 relative">
          <Label htmlFor="connectionLimit" className="text-sm text-textLink">
            ConnectionLimit <span className="text-lg text-accent-red">*</span>
          </Label>
          <Input
            id="connectionLimit"
            name="connectionLimit"
            type="number"
            min={1}
            placeholder="Enter the connection limit"
            className="bg-inputBg border-0"
            value={initialValues.connectionLimit!}
            onChange={(e) => handleChange!(e)}
            onBlur={(e) => handleBlur!(e)}
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-[60px] md:gap-8">
        <div className="flex flex-col gap-3 relative">
          <Label htmlFor="companyIds" className="text-textLink">
            Company(s) <span className="text-lg text-accent-red">*</span>
          </Label>
          <MultiSelect
            options={integrationForm?.companyIds!}
            selectedOptions={initialValues.companyIds!}
            onSelect={(value) =>
              handleChange!({
                target: { name: "companyIds", value },
              } as React.ChangeEvent<HTMLInputElement>)
            }
            onDelete={(value) =>
              handleChange!({
                target: { name: "companyIds", value },
              } as React.ChangeEvent<HTMLInputElement>)
            }
          />
          {errors?.companyIds && (
            <p className="text-red-500 text-sm absolute top-full mt-0.5 ml-1">
              {errors.companyIds}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default IntegrationForm;
