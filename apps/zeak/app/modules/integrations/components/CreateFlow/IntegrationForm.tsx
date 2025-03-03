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
} from "@zeak/react";
import { InfoTooltip } from "../../../../components/Layout/Screen";
import type { IntegrationForm } from '../../models/integration-form.model';
import { IntegrationFlow } from '../../context';
import { Integration } from '../../models/constants';

type IntegrationFormProps = {
  integrationForm?: IntegrationForm;
  errors?: { [key: string]: string | null };
  handleChange?: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  handleBlur?: (e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  currentFlow?: IntegrationFlow;
  selectedIntegration?: Integration;
}


const IntegrationForm = ({ integrationForm, errors, handleChange, handleBlur, currentFlow, selectedIntegration }: IntegrationFormProps) => {
  const convertCompaniesToString = (companies: string[]) => {
    return companies.join(", ");
  };
  const companies = convertCompaniesToString(integrationForm?.companies || []);
  

  const initialValues = {
    name: currentFlow === "edit" ? selectedIntegration?.integrationName : integrationForm?.name,
    purpose: currentFlow === "edit" ? selectedIntegration?.purpose : integrationForm?.purpose,
    application: currentFlow === "edit" ? selectedIntegration?.integrationName : integrationForm?.application,
    integrationCategory: currentFlow === "edit" ? selectedIntegration?.integrationCategory : integrationForm?.integrationCategory,
    connectionType: currentFlow === "edit" ? selectedIntegration?.connectionType : integrationForm?.connectionType,
    authentication: currentFlow === "edit" ? selectedIntegration?.authenticationType : integrationForm?.authentication,
    status: currentFlow === "edit" ? selectedIntegration?.status : integrationForm?.status,
    type: currentFlow === "edit" ? selectedIntegration?.type : integrationForm?.connectionType,
    companies: currentFlow === "edit" ? convertCompaniesToString(selectedIntegration?.companies.map((company) => company.companyName) || []) : companies,
  }

  console.log(initialValues);

  return (
    <>
        <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-[60px] md:gap-8">
            <div className="flex flex-col gap-3 relative">
              <Label
                htmlFor="name"
                className="flex gap-1 items-center text-textLink"
              >
                Integration Name{" "}
                <span className="text-lg text-accent-red">*</span>
                <InfoTooltip
                  title="Required"
                  subtext="Enter a unique name for the integration. The integration name must be distinct from other integrations."
                />
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter Integration Name"
                className="bg-inputBg border-0"
                value={initialValues.name}
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
                Purpose <span className="text-lg text-accent-red">*</span>
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
          </div>

          <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-[60px] md:gap-8">
            <div className="flex flex-col gap-3 relative">
              <Label htmlFor="application" className="text-textLink">
                Application <span className="text-lg text-accent-red">*</span>
              </Label>
              <Select
                name="application"
                value={initialValues.application}
                onValueChange={(value) =>
                  handleChange!({
                    target: { name: "application", value },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
              >
                <SelectTrigger className="bg-inputBg border-0">
                  <SelectValue placeholder="Select Application" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Salesforce">Salesforce</SelectItem>
                  <SelectItem value="SAP">SAP</SelectItem>
                  <SelectItem value="Workday">Workday</SelectItem>
                  <SelectItem value="Slack">Slack</SelectItem>
                  <SelectItem value="Microsoft Dynamics 365">Microsoft Dynamics 365</SelectItem>
                  <SelectItem value="Azure DevOps">Azure DevOps</SelectItem>
                  {/* Add more applications as needed */}
                </SelectContent>
              </Select>
              {errors?.application && (
                <p className="text-red-500 text-sm absolute top-full mt-0.5 ml-1">
                  {errors.application}
                </p>
              )}
            </div>

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
                  <SelectItem value="HRMS">HRMS</SelectItem>
                  <SelectItem value="CRM">CRM</SelectItem>
                  <SelectItem value="ERP">ERP</SelectItem>
                  <SelectItem value="Project Management">Project Management</SelectItem>
                  {/* Add more categories as needed */}
                </SelectContent>
              </Select>
              {errors?.integrationCategory && (
                <p className="text-red-500 text-sm absolute top-full mt-0.5 ml-1">
                  {errors.integrationCategory}
                </p>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-[60px] md:gap-8">
            <div className="flex flex-col gap-3 relative">
              <Label
                htmlFor="connectionType"
                className="text-textLink flex justify-between items-end"
              >
                <p>
                  Connection Type{" "}
                  <span className="text-lg text-accent-red">*</span>
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
                  <SelectItem value="API">API</SelectItem>
                  <SelectItem value="Webhook">Webhook</SelectItem>
                  <SelectItem value="Database">Database</SelectItem>
                  {/* Add more connection types as needed */}
                </SelectContent>
              </Select>
              {errors?.connectionType && (
                <p className="text-red-500 text-sm absolute top-full mt-0.5 ml-1">
                  {errors.connectionType}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3 relative">
              <Label htmlFor="authentication" className="text-textLink">
                Authentication{" "}
                <span className="text-lg text-accent-red">*</span>
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
                  <SelectItem value="OAuth 2.0">OAuth 2.0</SelectItem>
                  <SelectItem value="API Key">API Key</SelectItem>
                  <SelectItem value="Basic Auth">Basic Auth</SelectItem>
                  {/* Add more authentication types as needed */}
                </SelectContent>
              </Select>
              {errors?.authentication && (
                <p className="text-red-500 text-sm absolute top-full mt-0.5 ml-1">
                  {errors.authentication}
                </p>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-[60px] md:gap-8">
            {currentFlow === "edit" && (
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
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    {/* Add more authentication types as needed */}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="flex flex-col gap-3 relative">
              <Label htmlFor="companies" className="text-textLink">
                Company(s) <span className="text-lg text-accent-red">*</span>
              </Label>
              <Select
                name="companies"
                value={initialValues.companies}
                onValueChange={(value) =>
                  handleChange!({
                    target: { name: "companies", value },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
              >
                <SelectTrigger className="bg-inputBg border-0">
                  <SelectValue placeholder="Select Companies" />
                </SelectTrigger>
                <SelectContent>
                  {integrationForm?.companies.map(
                    (company: string, index: number) => (
                      <SelectItem key={index} value={company}>
                        {company}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              {errors?.companies && (
                <p className="text-red-500 text-sm absolute top-full mt-0.5 ml-1">
                  {errors.companies}
                </p>
              )}
            </div>
          </div>
    </>
  )
}

export default IntegrationForm