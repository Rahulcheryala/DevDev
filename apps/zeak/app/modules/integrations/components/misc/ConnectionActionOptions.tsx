import React, { useEffect } from "react";
import { IntegrationComponents } from "../../models/constants";
import { ConnectionForm } from "../../models/connection-form.model";
import { useUnifiedContext } from "../../context";
import { ConnectionFlow } from "../../context";
import { IConnectionModel } from "../../models/connection.model";

function ConnectionActionOptions({
  connectionId,
  component,
  type,
}: {
  connectionId?: string;
  component?: IntegrationComponents;
  type?: string;
}) {
  const {
    dispatch,
    state: { selectedConnection, records },
  } = useUnifiedContext();

  const onClickHandler = (flow: ConnectionFlow) => {
    if (flow === "edit") {
      dispatch({
        type: "UPDATE_CONNECTION_FORM",
        payload: selectedConnection as unknown as ConnectionForm,
        // setFormDirty: false,
      });
    }
    dispatch({ type: "SET_CONNECTION_FLOW", payload: flow });
  };

  useEffect(() => {
    if (connectionId) {
      const rec = records.find((int) => int.id.toString() === connectionId);
      if (rec) {
        dispatch({ type: "SET_SELECTED_CONNECTION", payload: rec as unknown as IConnectionModel });
      }
    }
  }, [connectionId]);

  return (
    <div className="flex flex-col">
      {type !== "System" && (
        <button
          className="flex items-center gap-2 px-4 text-left py-2 text-sm hover:rounded-sm hover:bg-[#B7DCFF]"
          onClick={() => onClickHandler("edit")}
        >
          Edit Connection info
        </button>
      )}
      {/* <button className="flex items-center gap-2 px-4 text-left py-2 text-sm hover:rounded-sm hover:bg-[#B7DCFF]">
        <span onClick={() => onClickHandler("connection")}>
          Manage Connections
        </span>
      </button>
      <button className="flex items-center gap-2 px-4 text-left py-2 text-sm hover:rounded-sm hover:bg-[#B7DCFF]">
        <span onClick={() => onClickHandler("activation")}>
          {selectedConnection?.isFavorite ? "Remove from" : "Add to"} Favorites
        </span>
      </button>
      <button className="flex items-center gap-2 px-4 text-left py-2 text-sm hover:rounded-sm hover:bg-[#B7DCFF]">
        <span onClick={() => onClickHandler("duplicate")}>
          Duplicate {selectedIntegration?.integrationName}
        </span>
      </button>
      {type !== "System" && (
        <button className="flex items-center gap-2 px-4 text-left py-2 text-sm hover:rounded-sm hover:bg-[#B7DCFF]">
          <span onClick={() => onClickHandler("delete")}>
            Delete {selectedIntegration?.integrationName}
          </span>
        </button>
      )} */}
    </div>
  );
}

export default ConnectionActionOptions;
