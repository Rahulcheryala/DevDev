import { useIntegrationContext } from "../../../context";
import IntegrationActionOptions from "../../misc/IntegrationActionOptions";
import { ItemHeader } from "../../../../../components/Layout/Screen";
import { ISelectedItem } from "../../../../../components/Layout/Screen/View/ItemHeader";
import ConnectionActionOptions from "../../misc/ConnectionActionOptions";
import { ConnectionProvider } from "~/modules/integrations/context/connection";

export default function ConnectionHeader() {
  const {
    state: { selectedConnection, selectedIntegration },
    dispatch,
  } = useIntegrationContext();

  // Ensure selectedIntegration is not null before destructuring
  if (!selectedIntegration) return null;
  if (!selectedConnection) return null;

  const { integrationName, application, logo } = selectedIntegration;

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

  const unsetConnectionHandler = () => {
    // dispatch({ type: "SET_SELECTED_INTEGRATION", payload: null });
  };

  const editConnectionHandler = () => {
    // dispatch({ type: "SET_FLOW", payload: "edit" });
  };

  return (
    <ItemHeader
      component="connection"
      breadcrumbs={breadcrumbs}
      backUrl={`/x/access-settings/integrations/${selectedIntegration.id}`}
      onEdit={editConnectionHandler}
      onClose={unsetConnectionHandler}
      type={selectedIntegration.type}
      actionPopover={
        <ConnectionProvider>
          <ConnectionActionOptions connectionId={id} />
        </ConnectionProvider>
      }
      selectedItem={
        {
          code: id,
          logo: logo,
          name: connectionName,
          status: connectionStatus,
          integrationName: integrationName,
          application: application,
        } as ISelectedItem
      }
    />
  );
}
