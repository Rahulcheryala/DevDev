import { BiArrowBack, BiPlus } from "react-icons/bi";
import { FaChevronLeft } from "react-icons/fa6";
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

  const { dispatch: connectionDispatch } = useConnectionContext();

  if (!selectedIntegration || !selectedConnection) return null;

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
      lastUpdatedBy: record.lastUpdatedBy,
    }));
  }, [records]);

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
        onClick={() => {
          dispatch({ type: "SET_SELECTED_CONNECTION", payload: null });
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
      selectedId={selectedConnection.id}
      records={transformedRecords}
      button={<ButtonComponent />}
      backButton={<BackButtonComponent />}
      backUrl="/x/access-settings/integrations/"
      onItemClicked={handleIntegrationSelect}
      onCreateHandler={handleNewConnection}
    />
  );
}

export default ConnectionListingPanel;
