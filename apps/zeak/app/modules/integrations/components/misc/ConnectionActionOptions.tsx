import React, { useEffect } from "react";
import { ConnectionFlow } from "../../context/connection";
import { IntegrationForm } from "../../models/integration-form.model";
import { IntegrationComponents } from "../../models/constants";
import { useConnectionContext } from "../../context/connection";
import { ConnectionForm } from "../../models/connection-form.model";

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
  } = useConnectionContext();

  const onClickHandler = (flow: ConnectionFlow) => {
    if (flow === "edit") {
      dispatch({
        type: "UPDATE_FORM",
        payload: selectedConnection as unknown as ConnectionForm,
        // setFormDirty: false,
      });
    }
    dispatch({ type: "SET_FLOW", payload: flow });
  };

  useEffect(() => {
    if (connectionId) {
      const rec = records.find((int) => int.id.toString() === connectionId);
      if (rec) {
        dispatch({ type: "SET_SELECTED_CONNECTION", payload: rec });
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
