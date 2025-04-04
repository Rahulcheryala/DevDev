import { useIntegrationData } from "~/modules/integrations/hooks/useIntegrationData";
import ConnectionDataTable from "./ConnectionDataTable";
import { ConnectionTableColumns } from "./ConnectionTableColumns";
import { ConnectionListTableColumns } from "../../ListingFlow/ConnectionListTableColumns";
import { IConnectionModel } from "~/modules/integrations/models/connection.model";

type ConnectionListProps = {
  integrationId?: string;
  component: "listing" | "view";
};

export default function ConnectionList({
  integrationId,
  component,
}: ConnectionListProps) {
  const { connectionsList, getConnectionsForIntegration } =
    useIntegrationData();
  const connections =
    component === "view"
      ? getConnectionsForIntegration(integrationId!)
      : connectionsList;
  const columns =
    component === "view" ? ConnectionTableColumns : ConnectionListTableColumns;
  // console.log(connections);

  return (
    <div className="flex flex-col h-full">
      <ConnectionDataTable
        type={component}
        columns={columns}
        data={connections as IConnectionModel[]}
      />
    </div>
  );
}
