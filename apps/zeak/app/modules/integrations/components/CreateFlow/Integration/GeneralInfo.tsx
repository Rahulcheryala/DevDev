import { AvatarUpload } from "@zeak/ui";
import { useUnifiedContext } from "../../../context";
import { useIntegrationForm } from "../../../hooks/form/useIntegrationForm";
import IntegrationForm from "./IntegrationForm";

export const GeneralInfo = () => {
  const {
    state: { integrationForm, integrationFlow, integrationErrors },
  } = useUnifiedContext();
  // console.log(integrationForm);
  const { handleFileChange } = useIntegrationForm();

  return (
    <div className="w-full px-10 py-8">
      <div className="form-container pb-14">
        <div className="flex flex-col gap-8">
          <div className="profile-container flex gap-x-8 items-center">
            <AvatarUpload
              imageUrl={integrationForm.logo}
              altText="Integration Logo"
              labelText="Integration Logo"
              descriptionText="PNG, JPEG, SVG"
              onFileSelect={handleFileChange}
            />
          </div>

          <IntegrationForm
            currentFlow={integrationFlow}
            integrationForm={integrationForm}
            errors={integrationErrors}
          />
        </div>
      </div>
    </div>
  );
};
