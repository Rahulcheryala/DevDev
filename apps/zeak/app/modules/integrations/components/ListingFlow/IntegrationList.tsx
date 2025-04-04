import { useMemo } from "react";
import { useUnifiedContext } from "../../context";
import IntegrationDataTable from "./IntegrationDataTable";

type IntegrationListProps = {
  type?: "favorites" | "all";
};

export default function IntegrationList({
  type = "all",
}: IntegrationListProps) {
  const { state: {records: integrations} } = useUnifiedContext();

  const filteredIntegrations = useMemo(() => {
    return type === "favorites"
      ? integrations.filter((integration) => integration.isFavorite)
      : integrations;
  }, [integrations, type]);

  return (
    <div className="flex flex-col h-full">
      <IntegrationDataTable records={filteredIntegrations} />
    </div>
  );
}
