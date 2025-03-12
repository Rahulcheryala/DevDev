import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "@remix-run/react";
import { ListingPanel } from "../../../../../components/Layout/Screen";
import { IIntegrationModel } from "../../../models/integration.model";
import { IRecord } from "../../../../../components/Layout/Screen/View/ListingPanel";
import { useUnifiedContext } from "../../../context";
import { BiPlus } from "react-icons/bi";
import { FaChevronLeft } from "react-icons/fa";

function IntegrationListingPanel() {
  const {
    state: { records, selectedIntegration },
    dispatch,
    openIntegrationDrawer,
  } = useUnifiedContext();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string | null>(
    selectedIntegration?.id?.toString() || null
  );

  useEffect(() => {
    if (selectedIntegration?.id) {
      setSelectedId(selectedIntegration.id);
    }
  }, [selectedIntegration]);

  const handleIntegrationSelect = (record: IIntegrationModel) => {
    setSelectedId(record.id);
    dispatch({ type: "SET_SELECTED_INTEGRATION", payload: record });
    navigate(`/x/access-settings/integrations/${record.id}`);
  };

  const handleNewIntegration = () => {
    openIntegrationDrawer("create");
  };

  const transformedRecords: IRecord[] = useMemo(() => {
    return records.map((record) => ({
      id: record.id,
      name: record?.integrationName,
      integrationType: record.integrationType,
      logo: record.logo || "",
      integrationCategory: record.integrationCategory.replace(/_/g, " "),
      updatedAt: record.updatedAt ? record.updatedAt.toString() : record.createdAt.toString(),
      lastUpdatedBy: record.lastUpdatedBy || "System"
    }));
  }, [records]);

  const ButtonComponent = () => {
    return (
      <>
        <BiPlus />
        <span onClick={handleNewIntegration}>NEW INTEGRATION</span>
      </>
    )
  }

  const BackButtonComponent = () => {
    return (
      <button
        onClick={() => navigate("/x/access-settings/integrations")}
        className="flex items-center gap-2 py-3 cursor-pointer"
      >
        <FaChevronLeft className="text-secondary" size={18} />
        <span className="font-medium bg-gradient-to-br bg-clip-text text-transparent from-[#475467] to-[#00FF7B] transition-all duration-500 px-2 rounded uppercase">
          Integrations
        </span>
      </button>
    );
  };

  return (
    <ListingPanel
      type="integration"
      selectedId={selectedId!}
      records={transformedRecords}
      button={<ButtonComponent />}
      backUrl="/x/access-settings/integrations/"
      backButton={<BackButtonComponent />}
      onItemClicked={handleIntegrationSelect}
      onCreateHandler={handleNewIntegration}
    />
  );
}

export default IntegrationListingPanel;
