import { IntegrationFlow, useUnifiedContext } from "../../context";
import { RxCopy } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiExport } from "react-icons/ci";
import { TbLink } from "react-icons/tb";
import { LuUnlink } from "react-icons/lu";
import { Status } from "@prisma/client";
import { ActionButtonProps } from "@zeak/ui";

export function useIntegrationActions(
  integrationId: string,
  integrationType: "System" | "User Defined" = "System",
  integrationStatus: Status = Status.Active
) {
  const {
    dispatch,
    state: { records },
  } = useUnifiedContext();

  const onClickHandler = (flow: IntegrationFlow) => {
    // First ensure the correct integration is selected
    const integration = records.find((int) => int.id.toString() === integrationId);
    if (integration) {
      dispatch({ type: "SET_SELECTED_INTEGRATION", payload: integration });
    }
    
    // Then set the flow
    dispatch({ type: "SET_INTEGRATION_FLOW", payload: flow });
  };

  const actionButtons: ActionButtonProps[] = [
    {
      icon: <LuUnlink className="text-accent-dark" />,
      label: "Deactivate Integration",
      onClick: () => onClickHandler("deactivation"),
      disabled: integrationStatus === "Inactive",
    },
    {
      icon: <TbLink className="text-accent-dark" />,
      label: "Activate Integration",
      onClick: () => onClickHandler("activation"),
      disabled: integrationStatus === "Active",
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
      icon: <CiExport className="text-accent-dark" />,
      label: "Export Data",
      onClick: () => onClickHandler("export"),
    },
  ];

  return actionButtons;
}

