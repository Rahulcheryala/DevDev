import React, { useEffect } from "react";
import { IntegrationFlow, useUnifiedContext } from "../../context";
import { IntegrationForm } from "../../models/integration-form.model";
import { FiEdit3 } from "react-icons/fi";
import { RxCopy } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiExport } from "react-icons/ci";
import { TbLink } from "react-icons/tb";
import { LuUnlink } from "react-icons/lu";

type IntegrationActionOptionsProps = {
  integrationId: string;
  component: string;
  integrationType?: "System" | "User Defined";
  integrationStatus?: "Active" | "Inactive" | "Blocked";
};

function IntegrationActionOptions({
  integrationId,
  component,
  integrationType = "System",
  integrationStatus = "Active",
}: IntegrationActionOptionsProps) {
  const {
    dispatch,
    state: { selectedIntegration, records },
    openIntegrationDrawer
  } = useUnifiedContext();

  const onClickHandler = (flow: IntegrationFlow) => {
    // First ensure the correct integration is selected
    if (integrationId && !selectedIntegration) {
      const integration = records.find((int) => int.id.toString() === integrationId);
      if (integration) {
        dispatch({ type: "SET_SELECTED_INTEGRATION", payload: integration });
      }
    }
    
    // Then open the appropriate drawer/flow
    if (flow === "edit") {
      console.log("flow", flow);
      // openIntegrationDrawer(flow);
      
    } else if (flow === "duplicate"){
      console.log("flow", flow);
      dispatch({ type: "SET_INTEGRATION_FLOW", payload: flow });
    }else if (flow === "activation"){
      console.log("flow", flow);
      dispatch({ type: "SET_INTEGRATION_FLOW", payload: flow });
      // dispatch({ type: "SET_INTEGRATION_FLOW", payload: flow });
    }else if (flow === "deactivation"){
      console.log("flow", flow);
      dispatch({ type: "SET_INTEGRATION_FLOW", payload: flow });
    }
    else if (flow === "delete") {
      console.log("flow", flow);
      dispatch({ type: "SET_INTEGRATION_FLOW", payload: flow });
    }
  };

  useEffect(() => {
    if (integrationId) {
      const rec = records.find((int) => int.id.toString() === integrationId);
      if (rec) {
        dispatch({ type: "SET_SELECTED_INTEGRATION", payload: rec });
      }
    }
  }, [integrationId]);

  const buttons = [
    {
      icon: <FiEdit3 className="text-accent-dark" />,
      label: "Edit Info",
      onClick: () => onClickHandler("edit"),
      disabled: integrationType === "System",
    },
    {
      icon: <RxCopy className="text-accent-dark" />,
      label: "Duplicate Integration",
      onClick: () => onClickHandler("duplicate"),
    },
    {
      icon: <RiDeleteBin6Line className="text-accent-dark" />,
      label: "Delete Integration",
      onClick: () => onClickHandler("delete"),
      disabled: integrationType === "System",
    },
    {
      icon: <LuUnlink className="text-accent-dark" />,
      label: "Deactivate Integration",
      onClick: () => onClickHandler("deactivation"),
      disabled:  integrationStatus === "Inactive",
    },
    {
      icon: <TbLink className="text-accent-dark" />,
      label: "Activate Integration",
      onClick: () => onClickHandler("activation"),
      disabled: integrationStatus === "Active",
    },
    {
      icon: <CiExport className="text-accent-dark" />,
      label: "Export Data",
      onClick: () => {
        // Handle export data functionality
        console.log("Export data for integration:", integrationId);
        // Implement export functionality
      },
    },
  ];

  return (
    <div className="flex flex-col rounded-zeak overflow-hidden">
      {buttons.map((button, index) => (
        <button
          key={index}
          className="h-14 flex items-center gap-4 px-6 text-left text-sm font-semibold text-accent-dark hover:bg-accent-bgHoverNew disabled:opacity-50"
          onClick={button.onClick}
          disabled={button.disabled}
        >
          {button.icon}
          {button.label}
        </button>
      ))}
    </div>
  );
}

export default IntegrationActionOptions;
