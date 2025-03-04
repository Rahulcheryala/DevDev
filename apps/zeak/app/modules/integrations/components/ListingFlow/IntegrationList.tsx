import { useIntegrationContext } from "../../context";
import { ConnectionProvider, useConnectionContext } from "../../context/connection";
import IntegrationCard from "../misc/IntegrationCard";
import IntegrationDataTable from "./IntegrationDataTable";

type IntegrationListProps = {
  type?: "favorites" | "all";
};

export default function IntegrationList({ type = "all" }: IntegrationListProps) {
  const {
    state: { records, viewType },
  } = useIntegrationContext();
  const { dispatch } = useConnectionContext();

  const addConnection = () => {
    dispatch({
      type: "SET_FLOW",
      payload: "create",
    });
  }

  const filteredRecords = type === "favorites" ? records.filter((record) => record.isFavorite) : records;

  return (
    <div className="bg-[#F0F4FD] flex flex-col h-full">
      <ConnectionProvider>
        {viewType === "list" ? (
          <IntegrationDataTable records={filteredRecords} />
        ) : (
          <IntegrationCard records={filteredRecords} onAddConnection={addConnection} onToggleFavorite={() => {}} />
        )}
      </ConnectionProvider>
    </div>
  );
}
