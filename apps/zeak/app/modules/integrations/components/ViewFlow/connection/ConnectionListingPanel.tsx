import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@remix-run/react";
import { useUnifiedContext } from "../../../context";
import { ListingPanel } from "../../../../../components/Layout/Screen";
import { IRecord } from "../../../../../components/Layout/Screen/View/ListingPanel";
import { IConnectionModel } from "~/modules/integrations/models/connection.model";
import { FaChevronLeft } from "react-icons/fa6";
import { BiPlus } from "react-icons/bi";

function ConnectionListingPanel() {
  const {
    state: { selectedIntegration, selectedConnection, connectionsList },
    dispatch,
    openConnectionDrawer,
  } = useUnifiedContext();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string | null>(
    selectedConnection?.id?.toString() || null
  );

  useEffect(() => {
    if (selectedConnection?.id) {
      setSelectedId(selectedConnection.id);
    }
  }, [selectedConnection]);

  if (!selectedIntegration || !selectedConnection) return null;

  const connections = connectionsList?.filter(
    (connection) => connection.integrationId === selectedIntegration.id
  ) || [];

  const handleConnectionSelect = (connection: IConnectionModel) => {
    setSelectedId(connection.id);
    dispatch({ type: "SET_SELECTED_CONNECTION", payload: connection });
    navigate(`/x/access-settings/connections/${connection.id}`);
  };

  const handleNewConnection = () => {
    openConnectionDrawer("create");
  };

  const transformedRecords: IRecord[] = useMemo(() => {
    return connections.map((connection) => ({
      id: connection.id,
      name: connection?.connectionName,
      connectionType: connection.connectionStatus,
      logo: selectedIntegration.logo || "",
      integrationCategory: selectedIntegration.integrationName,
      updatedAt: connection.updatedAt ? connection.updatedAt.toString() : connection.createdAt.toString(),
      lastUpdatedBy: connection.lastUpdatedBy ? connection.lastUpdatedBy : connection.createdBy,
    }));
  }, [connections, selectedIntegration]);

  const ButtonComponent = () => {
    return (
      <>
        <BiPlus />
        <span onClick={handleNewConnection}>NEW CONNECTION</span>
      </>
    );
  };

  const BackButtonComponent = () => {
    return (
      <button
        title={`Back to ${selectedIntegration.integrationName} integration`}
        onClick={() => {
          // dispatch({ type: "SET_SELECTED_CONNECTION", payload: null });
          navigate(`/x/access-settings/integrations/${selectedIntegration.id}`);
        }}
        className="flex items-center gap-2 py-3 cursor-pointer"
      >
        <FaChevronLeft className="text-secondary" size={18} />
        <span className="font-medium bg-gradient-to-br bg-clip-text text-transparent from-[#475467] to-[#00FF7B] transition-all duration-500 px-2 rounded uppercase">
          {selectedIntegration.integrationName}
        </span>
      </button>
    );
  };

  return (
    <ListingPanel
      type="connection"
      selectedId={selectedId!}
      records={transformedRecords}
      button={<ButtonComponent />}
      backUrl={`/x/access-settings/integrations/${selectedIntegration.id}`}
      backButton={<BackButtonComponent />}
      onItemClicked={handleConnectionSelect}
      onCreateHandler={handleNewConnection}
    />
  );
}

export default ConnectionListingPanel;
