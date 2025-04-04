import { TypePill, PageViewHeader2, toast, ISelectedItem } from "@zeak/ui";
import { useUnifiedContext } from "../../../context";
import { IntegrationType } from "../../../models/constants";
import { useIntegrationActions } from "../../misc/IntegrationActionOptions";
import { updateIntegrationFn } from "../../../utils/api.utils";
import { safeReplace } from "../../../utils/utils";
import { LuPlug2 } from "react-icons/lu";

interface IntegrationHeaderProps {
  isEditing: boolean;
}

export default function IntegrationHeader({
  isEditing,
}: IntegrationHeaderProps) {
  const {
    state: { selectedIntegration, isIntegrationFormDirty, integrationForm },
    dispatch,
    setIntegrationConfirmationOpen,
  } = useUnifiedContext();

  // Ensure selectedIntegration is not null before destructuring
  if (!selectedIntegration) return null;

  const {
    id,
    integrationName,
    logo,
    status,
    integrationCategory,
    connectionType,
    integrationType,
  } = selectedIntegration;

  const breadcrumbs = [
    {
      label: "Settings",
      to: "/",
    },
    {
      label: "Integrations",
      to: "/x/access-settings/integrations",
    },
  ];

  const closeIntegrationHandler = () => {
    if (isEditing) {
      setIntegrationConfirmationOpen({
        message: [
          "You're about to leave the record you are currently editing. Any unsaved changes will be lost",
          "Are you sure you want to continue?",
        ],
        title: "Attention!",
        flag: true,
        type: "warning",
      });
    } else {
      dispatch({ type: "SET_SELECTED_INTEGRATION", payload: null });
    }
  };

  const editIntegrationHandler = () => {
    if (isEditing) {
      dispatch({ type: "SET_INTEGRATION_FLOW", payload: null });
    } else {
      dispatch({ type: "SET_INTEGRATION_FLOW", payload: "edit" });
    }
  };

  const normalizePayloadResponse = (response: any) => {
    return {
      ...response,
      applicationName: response.applicationName.replace(/ /g, "_"),
      integrationCategory: response.integrationCategory.replace(/ /g, "_"),
      connectionType: response.connectionType.replace(/ /g, "_"),
      authType: response.authType.replace(/ /g, "_"),
    };
  };

  const saveIntegrationHandler = async () => {
    if (isIntegrationFormDirty) {
      const response = await updateIntegrationFn(
        selectedIntegration.id,
        integrationForm
      );
      const normalizedResponse = normalizePayloadResponse(response);
      if (normalizedResponse) {
        toast.success(
          "CHANGES SAVED SUCCESSFULLY",
          "Integration updated successfully"
        );
        dispatch({ type: "RESET_INTEGRATION_FORM" });
        dispatch({ type: "SET_SELECTED_INTEGRATION", payload: normalizedResponse });
        dispatch({ type: "SET_INTEGRATION_FLOW", payload: null });
      }
    } else {
      dispatch({ type: "SET_SELECTED_INTEGRATION", payload: null });
      dispatch({ type: "SET_INTEGRATION_FLOW", payload: null });
    }
  };

  const SubHeader = () => {
    return (
      <div className="flex items-center gap-8 text-sm">
        <p className="flex items-center gap-2 ">
          <span className="text-secondary-tertiary">CATEGORY</span>
          <span className="text-secondary uppercase font-semibold">
            {safeReplace(integrationCategory)}
          </span>
        </p>
        <p className="flex items-center gap-2">
          <LuPlug2 className="text-secondary-tertiary" size={18} />
          <span className="text-secondary uppercase font-semibold">
            {safeReplace(connectionType)}
          </span>
        </p>
        <p className="flex items-center gap-2">
          <TypePill
            variant={integrationType === "System" ? "system" : "user"}
            className="p-0"
            textClassName="uppercase text-sm font-medium text-secondary"
          />
        </p>
      </div>
    );
  };

  const actionButtons = useIntegrationActions(
    selectedIntegration.id.toString(),
    selectedIntegration.integrationType as IntegrationType,
    selectedIntegration.status
  );

  return (
    <PageViewHeader2
      breadcrumbs={breadcrumbs}
      backUrl="/x/access-settings/integrations/"
      isEditable={integrationType !== "System"}
      isEditing={isEditing}
      onEdit={editIntegrationHandler}
      onClose={closeIntegrationHandler}
      isSaveVisible={isIntegrationFormDirty}
      onSave={saveIntegrationHandler}
      actionButtons={actionButtons}
      showImage={true}
      subHeader={<SubHeader />}
      selectedItem={
        {
          logo,
          name: integrationName,
          status,
          code: id,
        } as ISelectedItem
      }
    />
  );
}
