import { useEffect } from "react";
import { useParams } from "@remix-run/react";
import { useUnifiedContext } from "../../../context";
import { ViewContainer } from "../../../../../components/Layout/Screen";
import { ITab } from "../../../../../components/Layout/Screen/Creation/CreationTabs";
import { IntegrationViewFlowTabs } from "../../../models/constants";
import IntegrationHeader from "./IntegrationHeader";
import IntegrationListingPanel from "./IntegrationListingPanel";
import IntegrationDetails from "./IntegrationDetails";
import CompaniesDataTable from "./CompaniesDataTable";

export default function IntegrationView() {
  const { integrationId } = useParams();
  const {
    state: { records, selectedIntegration, integrationFlow },
    dispatch
  } = useUnifiedContext();

  useEffect(() => {
    if (integrationId && records.length > 0) {
      const integration = records.find(
        (record) => record.id.toString() === integrationId
      );
      if (integration && integrationFlow !== "create") {
        dispatch({
          type: "SET_SELECTED_INTEGRATION",
          payload: integration,
        });
      }
    }
  }, [integrationId, records, dispatch]);

  const onTabChangeHandler = (tab: ITab) => {};

  const StepTabs = [
    {
      id: "1",
      title: "General",
      value: IntegrationViewFlowTabs.GENERAL,
      containerClassName: "max-h-[calc(100vh-370px)] overflow-y-auto",
      component: <IntegrationDetails />,
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
      type="integrations"
      selectedItemId={selectedIntegration?.id}
      selectedItem={selectedIntegration}
      headerComponent={<IntegrationHeader />}
      listingComponent={<IntegrationListingPanel />}
      tabs={StepTabs}
      onTabChange={onTabChangeHandler}
    />
  );
}
