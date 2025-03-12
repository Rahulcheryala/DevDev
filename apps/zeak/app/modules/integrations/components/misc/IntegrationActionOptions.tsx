import React, { useEffect } from "react";
import { IntegrationFlow, useUnifiedContext } from "../../context";
import { IntegrationForm } from "../../models/integration-form.model";
import { IntegrationComponents } from "../../models/constants";

function IntegrationActionOptions({
  integrationId,
  component,
  type,
}: {
  integrationId?: string;
  component?: IntegrationComponents;
  type?: string;
}) {
  const {
    dispatch,
    state: { selectedIntegration, records },
  } = useUnifiedContext();

  const onClickHandler = (flow: IntegrationFlow) => {
    if (flow === "edit") {
      dispatch({
        type: "UPDATE_FORM",
        payload: selectedIntegration as unknown as IntegrationForm,
        setFormDirty: false,
      });
    }
    dispatch({ type: "SET_FLOW", payload: flow });
  };

  useEffect(() => {
    if (integrationId) {
      const rec = records.find((int) => int.id.toString() === integrationId);
      if (rec) {
        dispatch({ type: "SET_SELECTED_INTEGRATION", payload: rec });
      }
    }
  }, [integrationId]);

  return (
    <div className="flex flex-col">
      {type !== "System" && (
        <button
          className="flex items-center gap-2 px-4 text-left py-2 text-sm hover:rounded-sm hover:bg-[#B7DCFF]"
          onClick={() => onClickHandler("edit")}
        >
          Edit Integration info
        </button>
      )}
      <button className="flex items-center gap-2 px-4 text-left py-2 text-sm hover:rounded-sm hover:bg-[#B7DCFF]">
        <span onClick={() => onClickHandler("connection")}>
          Manage Connections
        </span>
      </button>
      <button className="flex items-center gap-2 px-4 text-left py-2 text-sm hover:rounded-sm hover:bg-[#B7DCFF]">
        <span onClick={() => onClickHandler("activation")}>
          {selectedIntegration?.isFavorite ? "Remove from" : "Add to"} Favorites
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
      )}
    </div>
  );
}

export default IntegrationActionOptions;
