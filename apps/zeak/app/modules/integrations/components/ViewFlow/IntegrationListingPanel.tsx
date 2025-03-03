import { BiPlus } from "react-icons/bi";
import { useIntegrationContext } from "../../context";
import { useState, useEffect, useMemo } from "react";
import { IIntegrationModel } from "../../models/integration.model";
import { useNavigate } from "@remix-run/react";
import { ListingPanel } from "../../../../components/Layout/Screen";
import { IRecord } from "../../../../components/Layout/Screen/View/ListingPanel";
import { Integration } from "../../models/constants";

function IntegrationListingPanel() {
  const {
    state: { records, selectedIntegration },
    dispatch,
  } = useIntegrationContext();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string | null>(
    selectedIntegration?.id?.toString() || null
  );

  useEffect(() => {
    if (selectedIntegration?.id) {
      setSelectedId(selectedIntegration.id);
    }
  }, [selectedIntegration]);

  const handleIntegrationSelect = (record: Integration) => {
    setSelectedId(record.id);
    dispatch({ type: "SET_SELECTED_INTEGRATION", payload: record });
    navigate(`/x/access-settings/integrations/${record.id}`);
  };

  const handleNewIntegration = () => {
    dispatch({ type: "SET_FLOW", payload: "create" });
  };

  const transformedRecords: IRecord[] = useMemo(() => {
    return records.map((record) => ({
      id: record.id,
      name: record?.integrationName,
      integrationType: record.type,
      logo: record.logo || "",
      integrationCategory: record.integrationCategory,
      updatedAt: record.lastUpdated,
      lastUpdatedBy: record.lastUpdatedBy
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

  return (
    <ListingPanel
      type="integration"
      selectedId={selectedId!}
      records={transformedRecords}
      button={<ButtonComponent />}
      backUrl="/x/access-settings/integrations/"
      onItemClicked={handleIntegrationSelect}
      onCreateHandler={handleNewIntegration}
    />
  );
}

export default IntegrationListingPanel;
