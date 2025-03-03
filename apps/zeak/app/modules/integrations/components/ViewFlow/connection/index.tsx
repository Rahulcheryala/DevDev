import { useEffect } from "react";
import { useParams } from "@remix-run/react";
import { useIntegrationContext } from "../../../context";
import { ViewContainer } from "../../../../../components/Layout/Screen";
import { ITab } from "../../../../../components/Layout/Screen/Creation/CreationTabs";
import { IntegrationViewFlowTabs } from "../../../models/constants";
import ConnectionDetails from "./ConnectionDetails";
import ConnectionHeader from "./ConnectionHeader";
import CompaniesDataTable from "../CompaniesDataTable";
import ConnectionListingPanel from "./ConnectionListingPanel";

const ConnectionView = () => {
  // const { connectionId } = useParams();
  const {
    state: { selectedConnection },
  } = useIntegrationContext();

  // First useEffect to ensure we have the integration and its connections
  // useEffect(() => {
  //   if (!selectedIntegration) {
  //     console.log("No integration selected");
  //     return;
  //   }
  //   console.log("Integration selected:", selectedIntegration);
  // }, [selectedIntegration]);

  // // Second useEffect to handle connection selection
  // useEffect(() => {
  //   if (connectionId && connectionsList && connectionsList.length > 0 && !selectedConnection) {
  //     console.log("Setting selected connection:", connectionId);
  //     dispatch({
  //       type: "SET_SELECTED_CONNECTION",
  //       payload: connectionId,
  //     });
  //   }
  // }, [connectionId, connectionsList, dispatch]); // Remove selectedConnection from dependencies

  // if (!selectedIntegration) {
  //   return <div>Loading integration...</div>;
  // }

  // if (!connectionsList || connectionsList.length === 0) {
  //   return <div>Loading connections...</div>;
  // }

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
}

export default ConnectionView;
