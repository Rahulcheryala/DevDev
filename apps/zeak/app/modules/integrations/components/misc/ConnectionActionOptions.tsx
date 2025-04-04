import React, { useEffect } from "react";
import { ConnectionFlow, useUnifiedContext } from "../../context";
import { FiEdit3 } from "react-icons/fi";
import { RxCopy } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiExport } from "react-icons/ci";
import { TbLink } from "react-icons/tb";
import { LuUnlink } from "react-icons/lu";
import { ConnectionStatus } from "@prisma/client";
import { ActionButtonProps } from "@zeak/ui";

export function useConnectionActions(
  connectionId: string,
  connectionStatus: ConnectionStatus
) {
  const {
    dispatch,
    state: { connectionsList },
  } = useUnifiedContext();

  const onClickHandler = (flow: ConnectionFlow) => {
    // First ensure the correct connection is selected
    const connection = connectionsList.find((conn) => conn.id.toString() === connectionId);
    if (connection) {
      dispatch({ type: "SET_SELECTED_CONNECTION", payload: connection });
    }
    
    // Then set the flow
    dispatch({ type: "SET_CONNECTION_FLOW", payload: flow });
  };

  // Load selected connection when component mounts
  useEffect(() => {
    if (connectionId) {
      const connection = connectionsList.find((conn) => conn.id.toString() === connectionId);
      if (connection) {
        dispatch({ type: "SET_SELECTED_CONNECTION", payload: connection });
      }
    }
  }, [connectionId, connectionsList, dispatch]);

  const actionButtons: ActionButtonProps[] = [
    // {
    //   icon: <FiEdit3 className="text-accent-dark" />,
    //   label: "Edit Info",
    //   onClick: () => onClickHandler("edit"),
    // },
    {
      icon: <LuUnlink className="text-accent-dark" />,
      label: "Deactivate Connection",
      onClick: () => onClickHandler("deactivation"),
      disabled: connectionStatus === "Offline",
    },
    {
      icon: <TbLink className="text-accent-dark" />,
      label: "Activate Connection",
      onClick: () => onClickHandler("activation"),
      disabled: connectionStatus === "Online",
    },
    {
      icon: <RxCopy className="text-accent-dark" />,
      label: "Duplicate Connection",
      onClick: () => onClickHandler("duplicate"),
    },
    {
      icon: <RiDeleteBin6Line className="text-accent-dark" />,
      label: "Delete Connection",
      onClick: () => onClickHandler("delete"),
    },
    {
      icon: <CiExport className="text-accent-dark" />,
      label: "Export Data",
      onClick: () => onClickHandler("export"),
    },
  ];

  return actionButtons;
}

