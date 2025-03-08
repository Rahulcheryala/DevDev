import { TbPlus } from "react-icons/tb";
import { DataTable } from "../../../../../components/DataTable";
import { ConnectionTableColumns } from "./ConnectionTableColumns";
import { useConnectionContext } from "../../../context/connection";
import { useIntegrationContext } from "../../../context";

type ConnectionDataTableProps = {
  component?: "listing" | "view";
};

export default function ConnectionDataTable({ component }: ConnectionDataTableProps) {
  const {
    state: { selectedIntegration, connectionsList },
  } = useIntegrationContext();

  const connections = component === "listing" ? connectionsList : connectionsList!.filter((connection) => connection.integrationId === selectedIntegration?.id);

  return (
    <div className="bg-[#F0F4FD] flex flex-col h-full">
      <DataTable
        type={component}
        columns={ConnectionTableColumns}
        data={connections!}
      >
        <InitiateConnectionScreen />
      </DataTable>
    </div>
  );
}

function InitiateConnectionScreen() {
  const { dispatch } = useConnectionContext();

  const onCreateHandler = () => {
    dispatch({ type: "SET_FLOW", payload: "create" });
  };

  return (
    <div
      className="w-full h-full rounded-[12px] bg-white flex-1 flex flex-col cursor-pointer"
      onClick={onCreateHandler}
    >
      <div className="h-[64px] w-full bg-[#66D4CF1A] rounded-t-zeak"></div>
      <div className="h-[64px] w-full bg-[#66D4CF2A]"></div>
      <div className="min-h-[250px] flex flex-col flex-1 items-start gap-2 bg-[#66D4CF3A] p-8">
        <div className="p-3 rounded-full bg-white">
          <TbPlus className="w-[32px] h-[32px] font-weight" />
        </div>
        <h1 className="text-2xl font-medium">Click to create</h1>
      </div>
    </div>
  );
}
