import { useRef, useState } from "react";
import { Label } from "@zeak/react";
import { UploadIcon1 } from "@zeak/icons";
import { useUnifiedContext } from "../../../context";
import { z } from "zod";
import Image from "../../../../../components/Image";
import IntegrationForm from "./IntegrationForm";
import { fetchIntegrationsList } from "~/modules/integrations/utils/api.utils";

// Define the Zod schema for validation
export const integrationGeneralInfoSchema = z.object({
  // logo: z.string().optional(),
  integrationName: z.string().min(1, "Integration name is required"),
  integrationCode: z.string().min(1, "Integration code is required"),
  description: z.string().min(1, "Purpose is required"),
  applicationName: z.string().min(1, "Application is required"),
  integrationCategory: z.string().min(1, "Integration category is required"),
  connectionType: z.string().min(1, "Connection type is required"),
  authType: z.string().min(1, "Authentication type is required"),
  connectionLimit: z.number().min(1, "Connection limit is required"),
  // companies: z.array(z.string()).min(1, "At least one company is required"),
});

export const GeneralInfo = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { state: {selectedIntegration, integrationForm, integrationFlow, integrationErrors}, dispatch } = useUnifiedContext();

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
        integrationFlow === "edit" &&
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

  const imagePickerHandler = () => {
    if (fileInputRef.current)
      (fileInputRef.current as HTMLInputElement).click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      handleChange({
        target: { name: "logo", value: imageUrl },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_INTEGRATION_FORM", payload: { [name]: value }, setFormDirty: true });
  };

  const handleBlur = async (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    try {
      (integrationGeneralInfoSchema as any)
        .pick({ [name]: true })
        .parse({ [name]: value });
        if (name === 'integrationName') {
          const isDuplicate = await checkDuplicacy(value);
          if (isDuplicate) return;
          
          if (integrationFlow === 'create') {
              const code = generateCode();
              dispatch({ type: 'UPDATE_INTEGRATION_FORM', payload: { integrationCode: code } });
          }
      }
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
    <div className="w-full px-10 py-8">
      <div className="form-container">
        <div className="flex flex-col gap-8">
          <div className="profile-container flex gap-x-8 items-center">
            <Image
              className="h-[100px] w-[100px] object-cover rounded-full text-2xl drop-shadow-lg"
              src={integrationForm.logo}
              alt="Integration Logo"
            />
            <div className="img-selector flex flex-col">
              <Label htmlFor="logo" className="text-textLink text-sm">
                Image
              </Label>
              <span className="text-sm text-textLink">
                PNG, JPEG, SVG{" "}
                <span className="text-text-tertiary"> (Max 2MB)</span>
              </span>
              <button
                className="flex gap-2 items-center mt-2 rounded outline-none focus-visible:ring ring-[hsl(var(--accent-primary-bright),_0.09)]"
                onClick={imagePickerHandler}
              >
                <UploadIcon1 color="#9BA2AC" />
                <span className="text-text-tertiary">Upload</span>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/png, image/jpg, image/jpeg, image/svg"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <IntegrationForm
            dispatch={dispatch}
            errors={integrationErrors}
            integrationForm={integrationForm}
            handleChange={(e) => handleChange(e)}
            handleBlur={(e) => handleBlur(e)}
          />
        </div>
      </div>
    </div>
  );
};
