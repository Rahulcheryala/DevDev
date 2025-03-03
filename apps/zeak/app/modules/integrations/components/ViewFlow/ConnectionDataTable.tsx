import { TbPlus } from "react-icons/tb";
import { DataTable } from "../../../../components/DataTable";
import { ConnectionTableColumns } from "./ConnectionTableColumns";
import { useConnectionContext } from "../../context/connection";
import { useIntegrationContext } from "../../context";

type ConnectionDataTableProps = {
  component?: "listing" | "view";
};

export default function ConnectionDataTable({ component }: ConnectionDataTableProps) {
  const {
    state: { selectedIntegration, connectionsList },
  } = useIntegrationContext();

  const connections = component === "listing" ? connectionsList : selectedIntegration?.connections;

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
      className="w-full h-full rounded-[12px] bg-white flex-1 flex flex-col"
      onClick={onCreateHandler}
    >
      <div className="h-[64px] w-full bg-[#66D4CF1A] rounded-t-zeak"></div>
      <div className="h-[64px] w-full bg-[#66D4CF2A]"></div>
      <div className="flex flex-col flex-1 items-start gap-2 bg-[#66D4CF3A] overflow-y-hidden p-6 cursor-pointer">
        <h1 className="text-[36px] font-medium">Click to create</h1>
        <div className="h-[56px] w-[56px] rounded-full bg-white flex justify-center items-center">
          <TbPlus className="w-[32px] h-[32px] font-weight" />
        </div>
      </div>
    </div>
  );
}
