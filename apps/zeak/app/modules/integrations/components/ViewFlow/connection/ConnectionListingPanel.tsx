import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "@remix-run/react";
import { ListingPanelContainer } from "@zeak/ui";
import { SortOrder } from "@zeak/ui/src/core-components/ListingPanel/SortingHeader";
import { useUnifiedContext } from "../../../context";
import ConnectionListItem, {
  IConnectionListItemRecord,
} from "./ConnectionListItem";
import { BiPlus } from "react-icons/bi";

interface ConnectionListingPanelProps {
  isEditing: boolean;
}

function ConnectionListingPanel({ isEditing }: ConnectionListingPanelProps) {
  const {
    state: { selectedIntegration, selectedConnection, connectionsList },
    dispatch,
    openConnectionDrawer,
    setConnectionConfirmationOpen,
  } = useUnifiedContext();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string | null>(
    selectedConnection?.id || null
  );
  const [searchValue, setSearchValue] = useState<string>("");
  const [filterValue, setFilterValue] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<SortOrder>("none");

  useEffect(() => {
    if (selectedConnection?.id) {
      setSelectedId(selectedConnection.id);
    }
  }, [selectedConnection]);

  if (!selectedIntegration || !selectedConnection) return null;

  const filteredConnections = connectionsList.filter(
    (connection) =>
      connection.integrationId === selectedIntegration.id &&
      !connection.deletedAt
  );

  const handleConnectionSelect = (record: IConnectionListItemRecord) => {
    if (isEditing) {
      setConnectionConfirmationOpen({
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
    
    const connection = connectionsList.find((c) => c.id === record.id);
    if (connection) {
      setSelectedId(record.id);
      dispatch({ type: "SET_SELECTED_CONNECTION", payload: connection });
      navigate(`/x/access-settings/connections/${record.id}`);
    }
  };

  const handleNewConnection = () => {
    if (isEditing) return;
    
    dispatch({ type: "RESET_CONNECTION_FORM" });
    openConnectionDrawer("create");
  };

  const transformedRecords: IConnectionListItemRecord[] = useMemo(() => {
    // First, transform all records to the format we need
    const transformed = filteredConnections.map((connection) => ({
      id: connection.id,
      logo: selectedIntegration.logo || "",
      name: connection.connectionName,
      connectionStatus: connection.connectionStatus,
      integrationName: selectedIntegration.integrationName,
      lastUpdatedBy: connection.lastUpdatedBy || "System",
      updatedAt: connection.updatedAt
        ? new Date(connection.updatedAt).toISOString()
        : new Date(connection.createdAt).toISOString(),
    }));

    // Filter by search value (case-insensitive search in name and category)
    let filtered = transformed;
    if (searchValue.trim() !== "") {
      const search = searchValue.toLowerCase();
      filtered = filtered.filter(
        (record) =>
          record.name.toLowerCase().includes(search) ||
          record.connectionStatus.toLowerCase().includes(search)
      );
    }

    // Filter by integration type if not "All"
    if (filterValue !== "All") {
      filtered = filtered.filter(
        (record) =>
          (filterValue === "Online" && record.connectionStatus === "Online") ||
          (filterValue === "Offline" && record.connectionStatus === "Offline") ||
          (filterValue === "Error" && record.connectionStatus === "Error")
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
  }, [filteredConnections, selectedIntegration, searchValue, sortOrder, filterValue]);

  return (
    <ListingPanelContainer
      backButtonTo={`/x/access-settings/integrations/${selectedIntegration.id}`}
      backButtonLabel={selectedIntegration.integrationName}
      backButtonClassName="uppercase"
      onBackButtonClick={() =>
        navigate(`/x/access-settings/integrations/${selectedIntegration.id}`)
      }
      searchValue={searchValue}
      onSearchChange={(value) => setSearchValue(value)}
      searchPlaceholder="Search"
      filterOptions={["All", "Online", "Offline", "Error"]}
      defaultFilterSelected={"All"}
      onFilterChange={(value) => setFilterValue(value)}
      totalRecords={transformedRecords.length}
      sortList={sortOrder}
      setSortList={(value) => setSortOrder(value)}
      onBottomBtnClick={handleNewConnection}
      bottomButtonText="NEW CONNECTION"
      bottomButtonIcon={<BiPlus className="h-5 w-5 font-medium text-white" />}
      children={
        <div className="overflow-y-auto h-[calc(100vh-485px)]">
          {transformedRecords.length > 0 ? (
            transformedRecords.map((record) => (
              <ConnectionListItem
                key={record.id}
                record={record}
                selectedId={selectedId!}
                onItemClicked={handleConnectionSelect}
              />
            ))
          ) : (
            <div className="flex justify-center items-center h-[200px] text-gray-500">
              {searchValue
                ? "No connections match your search"
                : "No connections found"}
            </div>
          )}
        </div>
      }
    />
  );
}

export default ConnectionListingPanel;
