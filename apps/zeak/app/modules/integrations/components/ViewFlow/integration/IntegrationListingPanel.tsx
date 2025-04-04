import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "@remix-run/react";
import { ListingPanelContainer } from "@zeak/ui";
import { SortOrder } from "@zeak/ui/src/core-components/ListingPanel/SortingHeader";
import { useUnifiedContext } from "../../../context";
import { safeReplace } from "../../../utils/utils";
import IntegrationListItem, { IIntegrationListItemRecord } from "./IntegrationListItem";
import { BiPlus } from "react-icons/bi";

interface IntegrationListingPanelProps {
  isEditing: boolean;
}

function IntegrationListingPanel({ isEditing }: IntegrationListingPanelProps) {
  const {
    state: { records, selectedIntegration },
    dispatch,
    openIntegrationDrawer,
    setIntegrationConfirmationOpen,
  } = useUnifiedContext();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string | null>(
    selectedIntegration?.id?.toString() || null
  );
  const [searchValue, setSearchValue] = useState<string>("");
  const [filterValue, setFilterValue] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<SortOrder>("none");

  useEffect(() => {
    if (selectedIntegration?.id) {
      setSelectedId(selectedIntegration.id);
    }
  }, [selectedIntegration]);

  const handleIntegrationSelect = (record: IIntegrationListItemRecord) => {
    if (isEditing) {
      setIntegrationConfirmationOpen({
        title: "Attention!",
        message: [
          "You're about to leave the record you are currently editing. Any unsaved changes will be lost",
          "Are you sure you want to continue?",
        ],
        flag: true,
        type: "warning",
      });
      return;
    }
    
    const integration = records.find((r) => r.id === record.id);
    if (integration) {
      setSelectedId(integration.id);
      dispatch({ type: "SET_SELECTED_INTEGRATION", payload: integration });
      navigate(`/x/access-settings/integrations/${integration.id}`);
    }
  };

  const handleNewIntegration = () => {
    if (isEditing) return;
    
    dispatch({ type: "RESET_INTEGRATION_FORM" });
    openIntegrationDrawer("create");
  };

  const transformedRecords: IIntegrationListItemRecord[] = useMemo(() => {
    // First, transform all records to the format we need
    const transformed = records.map((record) => ({
      id: record.id,
      logo: record.logo!,
      name: record.integrationName,
      integrationCategory: safeReplace(record.integrationCategory),
      integrationType: safeReplace(record.integrationType),
      updatedAt: record.updatedAt
        ? new Date(record.updatedAt).toISOString()
        : new Date(record.createdAt).toISOString(),
      lastUpdatedBy: record.lastUpdatedBy || "System",
    }));
    
    // Filter by search value (case-insensitive search in name and category)
    let filtered = transformed;
    if (searchValue.trim() !== "") {
      const search = searchValue.toLowerCase();
      filtered = filtered.filter(
        (record) =>
          record.name.toLowerCase().includes(search) ||
          record.integrationCategory.toLowerCase().includes(search)
      );
    }
    
    // Filter by integration type if not "All"
    if (filterValue !== "All") {
      filtered = filtered.filter(
        (record) => 
          (filterValue === "System" && record.integrationType === "System") ||
          (filterValue === "User Defined" && record.integrationType !== "System")
      );
    }
    
    // Sort the records
    if (sortOrder !== "none") {
      filtered.sort((a, b) => {
        if (sortOrder === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
    }
    
    return filtered;
  }, [records, searchValue, filterValue, sortOrder]);

  return (
    <ListingPanelContainer
      backButtonTo="/x/access-settings/integrations/"
      backButtonLabel="Integrations"
      onBackButtonClick={() => navigate("/x/access-settings/integrations")}
      searchValue={searchValue}
      onSearchChange={(value) => setSearchValue(value)}
      searchPlaceholder="Search"
      filterOptions={["All", "System", "User Defined"]}
      defaultFilterSelected={"All"}
      onFilterChange={(value) => setFilterValue(value)}
      totalRecords={transformedRecords.length}
      sortList={sortOrder}
      setSortList={(value) => setSortOrder(value)}
      onBottomBtnClick={handleNewIntegration}
      bottomButtonText="NEW INTEGRATION"
      bottomButtonIcon={<BiPlus className="h-5 w-5 font-medium text-white" />}
      children={
        <div className="overflow-y-auto h-[calc(100vh-485px)]">
          {transformedRecords.length > 0 ? (
            transformedRecords.map((record) => (
              <IntegrationListItem
                key={record.id}
                record={record}
                selectedId={selectedId!}
                onItemClicked={handleIntegrationSelect}
              />
            ))
          ) : (
            <div className="flex justify-center items-center h-[200px] text-gray-500">
              {searchValue || filterValue !== "All" ? 
                "No integrations match your filters" : 
                "No integrations found"}
            </div>
          )}
        </div>
      }
    />
  );
}

export default IntegrationListingPanel;
