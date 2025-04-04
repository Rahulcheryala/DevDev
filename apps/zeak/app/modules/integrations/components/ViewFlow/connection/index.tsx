import { useEffect, useState } from "react";
import { Tabs, TabsContent } from "@zeak/ui";
import { useParams } from "@remix-run/react";
import { useUnifiedContext } from "../../../context";
import { viewFlowTabs } from "../../../models/constants";
import ConnectionHeader from "./ConnectionHeader";
import ConnectionListingPanel from "./ConnectionListingPanel";
import ConnectionDetails from "./ConnectionDetails";
import CompaniesDataTable from "../integration/CompaniesDataTable";

const ConnectionView = () => {
  const { connectionId } = useParams();
  const {
    state: {
      records,
      selectedConnection,
      selectedIntegration,
      connectionsList,
      connectionFlow,
    },
    dispatch,
  } = useUnifiedContext();
  const [isEditing, setIsEditing] = useState(false);

  // TODO(vamsi): Remove this once the integration is set by nested routing
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

  // Set editing based on connectionFlow
  useEffect(() => {
    if(connectionFlow === "edit"){
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [connectionFlow]);
  
  // Handle editing state changes
  const handleEditingChange = (editing: boolean) => {
    if (editing) {
      dispatch({
        type: "SET_CONNECTION_FLOW",
        payload: "edit",
      });
    } else {
      dispatch({
        type: "SET_CONNECTION_FLOW",
        payload: null,
      });
    }
    setIsEditing(editing);
  };

  if (!selectedIntegration) {
    return <div>Loading integration...</div>;
  }

  if (!connectionsList || connectionsList.length === 0) {
    return <div>Loading connections...</div>;
  }

  return (
    <div className="flex gap-4 h-full pl-4">
      <div className="left-col w-[350px] mb-6 flex flex-col gap-[14px]">
        <ConnectionListingPanel isEditing={isEditing} />
      </div>
      <div className="right-col mr-4 mb-6 flex-1">
        {selectedIntegration?.id ? (
          <>
            <ConnectionHeader isEditing={isEditing} />
            <Tabs
              variant="underline"
              items={viewFlowTabs}
              defaultTab={viewFlowTabs[0].value}
              backgroundColor="#FFFFFF"
            >
              {/* General */}
              <TabsContent value={viewFlowTabs[0].value} className="max-h-[calc(100vh-370px)] overflow-y-auto">
                <ConnectionDetails isEditing={isEditing} handleEditingChange={handleEditingChange} />
              </TabsContent>
              {/* Setup */}
              <TabsContent value={viewFlowTabs[1].value} className="max-h-[calc(100vh-370px)] overflow-y-auto">
                <CompaniesDataTable />
              </TabsContent>
              {/* Audit */}
              <TabsContent value={viewFlowTabs[2].value} className="max-h-[calc(100vh-370px)] overflow-y-auto">
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
};

export default ConnectionView;
