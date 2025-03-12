import { useEffect } from "react";
import { useParams } from "@remix-run/react";
import { useUnifiedContext } from "../../../context";
import { ViewContainer } from "../../../../../components/Layout/Screen";
import { ITab } from "../../../../../components/Layout/Screen/Creation/CreationTabs";
import { IntegrationViewFlowTabs } from "../../../models/constants";
import ConnectionDetails from "./ConnectionDetails";
import ConnectionHeader from "./ConnectionHeader";
import CompaniesDataTable from "../integration/CompaniesDataTable";
import ConnectionListingPanel from "./ConnectionListingPanel";

const ConnectionView = () => {
  const { connectionId } = useParams();
  const {
    state: {
      records,
      selectedConnection,
      selectedIntegration,
      connectionsList,
    },
    dispatch,
  } = useUnifiedContext();

  // TODO: Remove this once the integration is set
  // Reason: the integration is set to null when the connection is selected
  if (!selectedIntegration) {
    const integration = records?.find(
      (record) => record.id === selectedConnection?.integrationId
    );
    if (integration) {
      dispatch({
        type: "SET_SELECTED_INTEGRATION",
        payload: integration,
      });
    }
  }

  useEffect(() => {
    if (connectionId && connectionsList && connectionsList.length > 0) {
      const connection = connectionsList.find(
        (connection) => connection.id === connectionId
      );
      if (connection) {
        dispatch({
          type: "SET_SELECTED_CONNECTION",
          payload: connection,
        });
      }
    }
  }, [connectionId, connectionsList, dispatch]);

  if (!selectedIntegration) {
    return <div>Loading integration...</div>;
  }

  if (!connectionsList || connectionsList.length === 0) {
    return <div>Loading connections...</div>;
  }

  const StepTabs = [
    {
      id: "1",
      title: "General",
      value: IntegrationViewFlowTabs.GENERAL,
      containerClassName: "max-h-[calc(100vh-370px)] overflow-y-auto",
      component: <ConnectionDetails />,
    },
    {
      id: "2",
      title: "Setup",
      value: IntegrationViewFlowTabs.SETUP,
      containerClassName: "max-h-[calc(100vh-370px)] overflow-auto",
      component: <CompaniesDataTable />,
    },
    {
      id: "3",
      title: "Audit",
      value: IntegrationViewFlowTabs.AUDIT,
      content: "Audit",
      component: <p>Currently Unavailable</p>,
    },
  ];

  return (
    <ViewContainer
      type="connections"
      selectedItemId={selectedConnection?.id}
      selectedItem={selectedConnection}
      headerComponent={<ConnectionHeader />}
      listingComponent={<ConnectionListingPanel />}
      tabs={StepTabs}
      onTabChange={() => {}}
    />
  );
};

export default ConnectionView;
