import { BiArrowBack, BiPlus } from "react-icons/bi";
import { useIntegrationContext } from "../../../context";
import { useState, useEffect, useMemo } from "react";
import { IIntegrationModel } from "../../../models/integration.model";
import { Link, useNavigate } from "@remix-run/react";
import { ListingPanel } from "../../../../../components/Layout/Screen";
import { IRecord } from "../../../../../components/Layout/Screen/View/ListingPanel";
import { Integration } from "../../../models/constants";
import { useConnectionContext } from "~/modules/integrations/context/connection";

function ConnectionListingPanel() {
  const {
    state: { selectedIntegration, selectedConnection },
    dispatch,
  } = useIntegrationContext();
  const {
    dispatch: connectionDispatch,
  } = useConnectionContext();

  if(!selectedIntegration || !selectedConnection) return null;

  const records = selectedIntegration.connections || [];

//   const navigate = useNavigate();
//   const [selectedId, setSelectedId] = useState<string | null>(
//     selectedIntegration?.id?.toString() || null
//   );

//   useEffect(() => {
//     if (selectedIntegration?.id) {
//       setSelectedId(selectedIntegration.id);
//     }
//   }, [selectedIntegration]);

  const handleIntegrationSelect = (id: string) => {
    // setSelectedId(record.id);
    dispatch({ type: "SET_SELECTED_CONNECTION", payload: id });
    // navigate(`/x/access-settings/integrations/${record.id}`);
  };

  const handleNewConnection = () => {
    connectionDispatch({ type: "SET_FLOW", payload: "create" });
  };

  const transformedRecords: IRecord[] = useMemo(() => {
    return records.map((record) => ({
      id: record.id,
      name: record?.connectionName,
      connectionType: record.connectionStatus,
      logo: selectedIntegration.logo || "",
      integrationCategory: selectedIntegration.integrationName,
      updatedAt: record.lastUpdated,
      lastUpdatedBy: record.lastUpdatedBy
    }));
  }, [records]);

  const ButtonComponent = () => {
    return (
      <>
        <BiPlus />
        <span onClick={handleNewConnection}>NEW CONNECTION</span>
      </>
    )
  }

  const BackButtonComponent = () => {
    return (
      <Link to={`/x/access-settings/integrations/${selectedIntegration.id}`}>
        <BiArrowBack />
        <span>Back to Integrations</span>
      </Link>
    )
  }

  return (
    <ListingPanel
      type="connection"
      selectedId={selectedConnection.id}
      records={transformedRecords}
      button={<ButtonComponent />}

      backUrl="/x/access-settings/integrations/"
      onItemClicked={handleIntegrationSelect}
      onCreateHandler={handleNewConnection}
    />
  );
}

export default ConnectionListingPanel;
