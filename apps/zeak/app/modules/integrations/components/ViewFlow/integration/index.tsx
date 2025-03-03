import { useEffect } from "react";
import { useParams } from "@remix-run/react";
import { useIntegrationContext } from "../../../context";
import { ViewContainer } from "../../../../../components/Layout/Screen";
import { ITab } from "../../../../../components/Layout/Screen/Creation/CreationTabs";
import { IntegrationViewFlowTabs } from "../../../models/constants";
import IntegrationHeader from "./IntegrationHeader";
import IntegrationListingPanel from "./IntegrationListingPanel";
import IntegrationDetails from "./IntegrationDetails";
import CompaniesDataTable from "./CompaniesDataTable";

function IntegrationView() {
  // const { integrationId } = useParams();
  const {
    state: { selectedIntegration },
  } = useIntegrationContext();

  // useEffect(() => {
  //   if (integrationId && records.length > 0) {
  //     const selectedIntegration = records.find(
  //       (record) => record.id.toString() === integrationId
  //     );
  //     if (selectedIntegration && currentFlow !== "create") {
  //       dispatch({
  //         type: "SET_SELECTED_INTEGRATION",
  //         payload: selectedIntegration,
  //       });
  //     }
  //   }
  // }, [integrationId, records, dispatch]);

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
    // <div className="w-[500px] bg-red-400 h-[500px]">IntegrationView</div>
  );
}

export default IntegrationView;
