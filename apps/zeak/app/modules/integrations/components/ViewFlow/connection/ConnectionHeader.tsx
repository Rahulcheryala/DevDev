import { useUnifiedContext } from "../../../context";
import IntegrationActionOptions from "../../misc/IntegrationActionOptions";
import { ItemHeader } from "../../../../../components/Layout/Screen";
import { ISelectedItem } from "../../../../../components/Layout/Screen/View/ItemHeader";
import ConnectionActionOptions from "../../misc/ConnectionActionOptions";

export default function ConnectionHeader() {
  const {
    state: { selectedConnection, selectedIntegration },
    dispatch,
  } = useUnifiedContext();

  if (!selectedIntegration || !selectedConnection) return null;

  const { logo, integrationName, applicationName, integrationType } = selectedIntegration;
  const { id, connectionName, connectionStatus } = selectedConnection;

  const breadcrumbs = [
    {
      label: "Settings",
      to: "/",
    },
    {
      label: "Integrations",
      to: `/x/access-settings/integrations/${selectedIntegration.id}`,
    },
  ];

  const closeConnectionHandler = () => {
    dispatch({ type: "SET_SELECTED_CONNECTION", payload: null });
  };

  const editConnectionHandler = () => {
    dispatch({ type: "SET_CONNECTION_FLOW", payload: "edit" });
  };

  return (
    <ItemHeader
      component="connection"
      breadcrumbs={breadcrumbs}
      backUrl={`/x/access-settings/integrations/${selectedIntegration.id}`}
      onEdit={editConnectionHandler}
      onClose={closeConnectionHandler}
      actionPopover={
        <ConnectionActionOptions connectionId={id} />
      }
      selectedItem={
        {
          code: id,
          logo: logo,
          name: connectionName,
          status: connectionStatus,
          integrationName: integrationName,
          application: applicationName,
        } as ISelectedItem
      }
    />
  );
}
