import { useEffect, useState } from "react";
import { useParams } from "@remix-run/react";
import { Tabs, TabsContent } from "@zeak/ui";
import { useUnifiedContext } from "../../../context";
import { viewFlowTabs } from "../../../models/constants";
import IntegrationHeader from "./IntegrationHeader";
import IntegrationListingPanel from "./IntegrationListingPanel";
import IntegrationDetails from "./IntegrationDetails";
import CompaniesDataTable from "./CompaniesDataTable";

export default function IntegrationView() {
  const { integrationId } = useParams();
  const {
    state: { records, selectedIntegration, integrationFlow },
    dispatch,
  } = useUnifiedContext();
  const [isEditing, setIsEditing] = useState(false);

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

  // Set editing based on integrationFlow
  useEffect(() => {
    if (integrationFlow === "edit") {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [integrationFlow]);
  
  // Handle editing state changes
  const handleEditingChange = (editing: boolean) => {
    if (editing) {
      dispatch({
        type: "SET_INTEGRATION_FLOW",
        payload: "edit",
      });
    } else {
      dispatch({
        type: "SET_INTEGRATION_FLOW",
        payload: null,
      });
    }
    setIsEditing(editing);
  };

  return (
    <div className="flex gap-4 h-full pl-4">
      <div className="left-col w-[350px] mb-6 flex flex-col gap-[14px]">
        <IntegrationListingPanel isEditing={isEditing} />
      </div>
      <div className="mr-4 mb-6 flex-1">
        {selectedIntegration?.id ? (
          <>
            <IntegrationHeader isEditing={isEditing} />
            <Tabs
              variant="underline"
              items={viewFlowTabs}
              defaultTab={viewFlowTabs[0].value}
              backgroundColor="#FFFFFF"
            >
              {/* General */}
              <TabsContent
                value={viewFlowTabs[0].value}
                className="max-h-[calc(100vh-370px)] overflow-y-auto"
              >
                <IntegrationDetails 
                  isEditing={isEditing} 
                  handleEditingChange={handleEditingChange} 
                />
              </TabsContent>
              {/* Setup */}
              <TabsContent
                value={viewFlowTabs[1].value}
                className="max-h-[calc(100vh-370px)] overflow-y-auto"
              >
                <CompaniesDataTable />
              </TabsContent>
              {/* Audit */}
              <TabsContent
                value={viewFlowTabs[2].value}
                className="max-h-[calc(100vh-370px)] overflow-y-auto"
              >
                <div className="bg-white flex flex-col items-center justify-center rounded-zeak">
                  <div className="text-2xl font-bold py-10">Not Available</div>
                </div>
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-lg">
              No integration selected. Please select an integration to view
              details.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
