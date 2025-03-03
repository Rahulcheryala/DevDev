import { useIntegrationContext } from "../../../context";
import IntegrationActionOptions from "../../misc/IntegrationActionOptions";
import { ItemHeader } from "../../../../../components/Layout/Screen";
import { ISelectedItem } from "../../../../../components/Layout/Screen/View/ItemHeader";

export default function IntegrationHeader() {
  const {
    state: { selectedIntegration },
    dispatch,
  } = useIntegrationContext();

  // Ensure selectedIntegration is not null before destructuring
  if (!selectedIntegration) return null;

  const {
    id,
    integrationName,
    logo,
    status,
    integrationCategory,
    connectionType,
    type,
  } = selectedIntegration;

  const breadcrumbs = [
    {
      label: "Organization",
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
    dispatch({ type: "SET_FLOW", payload: "edit" });
  };

  return (
    <ItemHeader
      component="integration"
      breadcrumbs={breadcrumbs}
      backUrl="/x/access-settings/integrations/"
      onEdit={editIntegrationHandler}
      onClose={unsetIntegrationHandler}
      type={selectedIntegration.type}
      actionPopover={
        <IntegrationActionOptions
          type={selectedIntegration.type}
        />
      }
      selectedItem={
        {
          logo,
          name: integrationName,
          status,
          code: id,
          integrationCategory,
          connectionType,
          type,
        } as ISelectedItem
      }
    />
  );
}
