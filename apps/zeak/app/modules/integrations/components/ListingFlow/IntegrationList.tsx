import { useIntegrationContext } from "../../context";
import { ConnectionProvider } from "../../context/connection";
import IntegrationDataTable from "./IntegrationDataTable";

type IntegrationListProps = {
  type?: "favorites" | "all";
};

export default function IntegrationList({ type = "all" }: IntegrationListProps) {
  const {
    state: { records },
  } = useIntegrationContext();

  const filteredRecords = type === "favorites" ? records.filter((record) => record.isFavorite) : records;

  return (
    <div className="bg-[#F0F4FD] flex flex-col h-full">
      <ConnectionProvider>
        <IntegrationDataTable records={filteredRecords} />
      </ConnectionProvider>
    </div>
  );
}
