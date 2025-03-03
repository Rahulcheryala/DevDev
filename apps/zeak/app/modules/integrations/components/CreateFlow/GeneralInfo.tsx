import { useRef, useState } from "react";
import { Label } from "@zeak/react";
import { UploadIcon1 } from "@zeak/icons";
import { useIntegrationContext } from "../../context";
import { z } from "zod";
import Image from "../../../../components/Image";
import IntegrationTypeComparison from "./IntegrationTypeComparision";
import IntegrationForm from "./IntegrationForm";

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

export const GeneralInfo = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { state, dispatch } = useIntegrationContext();
  const { integrationForm } = state;
  const [showComparisonTable, setShowComparisonTable] = useState(false);

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
    dispatch({ type: "UPDATE_FORM", payload: { [name]: value } });
  };

  const handleBlur = async (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    try {
      (integrationGeneralInfoSchema as any)
        .pick({ [name]: true })
        .parse({ [name]: value });
      dispatch({ type: "UPDATE_ERROR", payload: { [name]: null } });
    } catch (error) {
      if (error instanceof z.ZodError) {
        dispatch({
          type: "UPDATE_ERROR",
          payload: { [name]: error.errors[0].message },
        });
      }
    }
  };

  return (
    <div className="w-full px-10 py-8">
      {/* Modal overlay for Comparison Table */}
      {showComparisonTable && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowComparisonTable(false)}
          />
          <div className="relative z-10 w-full h-full flex justify-center items-center bg-white p-8">
            <IntegrationTypeComparison
              onClose={() => setShowComparisonTable(false)}
            />
          </div>
        </div>
      )}
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
            errors={state.errors}
            integrationForm={integrationForm}
            handleChange={(e) => handleChange(e)}
            handleBlur={(e) => handleBlur(e)}
          />
        </div>
      </div>
    </div>
  );
};
