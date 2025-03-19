import { useUnifiedContext } from "../../../context";
import { ItemHeader } from "../../../../../components/Layout/Screen";
import { ISelectedItem } from "../../../../../components/Layout/Screen/View/ItemHeader";
import IntegrationActionOptions from "../../misc/IntegrationActionOptions";
import { IntegrationType } from "../../../models/constants";

export default function IntegrationHeader() {
  const {
    state: { selectedIntegration },
    dispatch,
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

  const unsetIntegrationHandler = () => {
    dispatch({ type: "SET_SELECTED_INTEGRATION", payload: null });
  };

  const editIntegrationHandler = () => {
    dispatch({ type: "SET_INTEGRATION_FLOW", payload: "edit" });
  };

  return (
    <ItemHeader
      component="integration"
      breadcrumbs={breadcrumbs}
      backUrl="/x/access-settings/integrations/"
      onEdit={editIntegrationHandler}
      onClose={unsetIntegrationHandler}
      type={integrationType.replace(/_/g, " ")}
      actionPopover={
        <IntegrationActionOptions
          component="details"
          integrationId={id}
          integrationType={
            integrationType.replace(/_/g, " ") as IntegrationType
          }
        />
      }
      selectedItem={
        {
          logo,
          name: integrationName,
          status,
          code: id,
          integrationCategory: integrationCategory.replace(/_/g, " "),
          connectionType,
          integrationType: integrationType.replace(/_/g, " "),
        } as ISelectedItem
      }
    />
  );
}
