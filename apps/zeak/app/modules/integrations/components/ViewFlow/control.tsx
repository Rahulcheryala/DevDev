import React, { useEffect } from "react";
import { useIntegrationContext } from "../../context";
import IntegrationView from "./integration";
import ConnectionView from "./connection";
import { useParams } from "@remix-run/react";

const ViewController = () => {
  const { integrationId } = useParams();
  const {
    state: { records, currentFlow, selectedIntegration, selectedConnection },
    dispatch,
  } = useIntegrationContext();

  console.log(selectedIntegration, selectedConnection);

  useEffect(() => {
    if (integrationId && records.length > 0) {
      const selectedIntegration = records.find(
        (record) => record.id.toString() === integrationId
      );
      if (selectedIntegration && currentFlow !== "create") {
        dispatch({
          type: "SET_SELECTED_INTEGRATION",
          payload: selectedIntegration,
        });
      }
    }
  }, [integrationId, records, dispatch]);

  // console.log(selectedIntegration, selectedConnection);
  // console.log("in view controller");

  const DisplayComponent = () => {
    return selectedConnection ? <ConnectionView /> : <IntegrationView />;
  };
  return <DisplayComponent />;
};

export default ViewController;
