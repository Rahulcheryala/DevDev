import { useMemo } from "react";
import { useIntegrationData } from "../../hooks/useIntegrationData";
import IntegrationDataTable from "./IntegrationDataTable";

type IntegrationListProps = {
  type?: "favorites" | "all";
};

export default function IntegrationList({
  type = "all",
}: IntegrationListProps) {
  const { integrations } = useIntegrationData();

  const filteredIntegrations = useMemo(() => {
    return type === "favorites"
      ? integrations.filter((integration) => integration.isFavorite)
      : integrations;
  }, [integrations, type]);

  return (
    <div className="bg-[#F0F4FD] flex flex-col h-full">
      <IntegrationDataTable records={filteredIntegrations} />
    </div>
  );
}
